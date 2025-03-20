import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Animated,
    ImageBackground,
    Dimensions,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import * as Haptics from 'expo-haptics';
import tw from 'twrnc';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/interfaces/Navigation';
import BleManager from 'react-native-ble-manager';

// Initialize BleManager
BleManager.start({ showAlert: false }).then(() => {
    console.log('BleManager initialized');
});

export default function ConnectToDeviceScreen() {
    const router = useNavigation<NavigationProps>();
    const [isBluetoothOn, setIsBluetoothOn] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [devices, setDevices] = useState<any>([]);
    const [connectedDevice, setConnectedDevice] = useState<any>(null);
    const [deviceData, setDeviceData] = useState<string>('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const iconAnim = useRef(new Animated.Value(0)).current;
    const buttonAnim = useRef(new Animated.Value(0)).current;
    const menuItemsAnim = useRef([...Array(4)].map(() => new Animated.Value(0))).current;
    const [activeTab, setActiveTab] = useState('devices');
    const { width } = Dimensions.get('window');

    // Hypothetical BLE service and characteristic UUIDs (replace with your device's UUIDs)
    const SERVICE_UUID = '0000180f-0000-1000-8000-00805f9b34fb'; // Example: Battery Service
    const CHARACTERISTIC_UUID = '00002a19-0000-1000-8000-00805f9b34fb'; // Example: Battery Level

    useEffect(() => {
        // Request permissions on Android
        const requestPermissions = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                ]);
                if (
                    granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('Bluetooth permissions granted');
                } else {
                    console.log('Bluetooth permissions denied');
                }
            }
        };

        requestPermissions();

        // Animate main content
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.spring(iconAnim, { toValue: 1, tension: 80, friction: 10, useNativeDriver: true }),
            Animated.timing(buttonAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ]).start();

        menuItemsAnim.forEach((anim, index) => {
            Animated.spring(anim, {
                toValue: 1,
                tension: 80,
                friction: 10,
                delay: 300 + index * 100,
                useNativeDriver: true,
            }).start();
        });

        // BLE event listeners
        const discoverListener = BleManager.onDiscoverPeripheral(handleDiscoverPeripheral);
        const disconnectListener = BleManager.onDisconnectPeripheral((data: any) => {
            console.log('Disconnected:', data.peripheral);
            setConnectedDevice(null);
            setDeviceData(null);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
        });
        const updateListener = BleManager.onDidUpdateValueForCharacteristic((data: any) => {
            console.log('Characteristic update:', data);
            setDeviceData(new Uint8Array(data.value).toString());
        });

        return () => {
            BleManager.stopScan();
            discoverListener.remove();
            disconnectListener.remove();
            updateListener.remove();
        };
    }, []);

    const handleDiscoverPeripheral = (peripheral: any) => {
        if (peripheral.name) {
            setDevices((prev: any) => {
                if (!prev.some((d) => d.id === peripheral.id)) {
                    return [...prev, peripheral];
                }
                return prev;
            });
        }
    };

    const handleToggleBluetooth = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        if (!isBluetoothOn) {
            try {
                await BleManager.enableBluetooth();
                setIsBluetoothOn(true);
                startScan();
            } catch (error) {
                console.log('Bluetooth enable error:', error);
                setIsBluetoothOn(false);
            }
        } else {
            setIsBluetoothOn(false);
            setScanning(false);
            setConnectedDevice(null);
            setDeviceData(null);
            BleManager.stopScan();
            setDevices([]);
            if (connectedDevice) {
                BleManager.disconnect(connectedDevice.id).catch(() => {});
            }
        }
    };

    const startScan = () => {
        setScanning(true);
        setDevices([]);
        BleManager.scan([SERVICE_UUID], 10, true)
            .then(() => {
                console.log('Scanning started');
            })
            .catch((err) => {
                console.log('Scan error:', err);
                setScanning(false);
            });

        setTimeout(() => {
            BleManager.stopScan();
            setScanning(false);
        }, 10000); // Scan for 10 seconds
    };

    const connectToDevice = async (peripheralId) => {
        try {
            await BleManager.connect(peripheralId);
            console.log('Connected to', peripheralId);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
            const peripheralInfo = await BleManager.retrieveServices(peripheralId, [SERVICE_UUID]);
            setConnectedDevice(peripheralInfo);

            // Start notification for characteristic
            await BleManager.startNotification(peripheralId, SERVICE_UUID, CHARACTERISTIC_UUID);

            // Read initial value
            const data = await BleManager.read(peripheralId, SERVICE_UUID, CHARACTERISTIC_UUID);
            setDeviceData(new Uint8Array(data).toString());
        } catch (error) {
            console.log('Connection error:', error);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
        }
    };

    const handleBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => router.navigate('PhReader'));
    };

    const handleNavigation = (path: string, tabName: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        setActiveTab(tabName);
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => router.navigate(path as never));
    };

    const renderMenuButton = (icon: any, label: string, path: string, tabName: string, index: number, special = false) => {
        const isActive = activeTab === tabName;
        const buttonStyle = special ? tw`items-center -mt-8` : tw`items-center px-4`;
        const textColor = isActive ? 'text-red-500' : 'text-gray-700';
        const iconColor = isActive ? '#EF4444' : '#6B7280';

        return (
            <Animated.View
                style={{
                    opacity: menuItemsAnim[index],
                    transform: [
                        {
                            translateY: menuItemsAnim[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [20, 0],
                            }),
                        },
                    ],
                }}
            >
                <TouchableOpacity
                    onPress={() => handleNavigation(path, tabName)}
                    style={buttonStyle}
                    activeOpacity={0.7}
                >
                    {special ? (
                        <View style={tw`w-16 h-16 rounded-full shadow-2xl overflow-hidden`}>
                            <LinearGradient
                                colors={['#EF4444', '#FF6B6B']}
                                style={tw`flex-1 items-center justify-center`}
                            >
                                <BlurView
                                    intensity={15}
                                    tint="light"
                                    style={tw`flex-1 items-center justify-center w-full h-full`}
                                />
                                <View style={tw`absolute inset-0 flex items-center justify-center`}>
                                    <Ionicons name={icon} size={28} color="#FFFFFF" />
                                </View>
                            </LinearGradient>
                        </View>
                    ) : (
                        <>
                            <View style={tw`relative w-12 h-12 items-center justify-center`}>
                                {isActive && <View style={tw`absolute w-10 h-10 bg-red-100 rounded-full opacity-30`} />}
                                <Ionicons name={icon} size={24} color={iconColor} />
                            </View>
                            <Text style={tw`text-xs font-semibold mt-1 ${textColor}`}>{label}</Text>
                            {isActive && <View style={tw`h-1 w-6 bg-red-500 rounded-full mt-1`} />}
                        </>
                    )}
                    {special && <Text style={tw`text-xs font-semibold mt-2 text-gray-700`}>{label}</Text>}
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <ImageBackground
            source={require('../../assets/images/chicken-farmer.webp')}
            style={tw`flex-1`}
            imageStyle={tw`opacity-5`}
        >
            <LinearGradient colors={['#FFFFFF', '#FFF7ED']} style={tw`flex-1`}>
                <SafeAreaView style={tw`flex-1`}>
                    <StatusBar style="dark" />
                    <View style={tw`flex-1 px-5 pt-5 relative`}>
                        {/* Enhanced Background Elements */}
                        <View style={tw`absolute top-0 left-0 right-0 h-full overflow-hidden`}>
                            <View style={tw`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-yellow-100 opacity-30`} />
                            <View style={tw`absolute top-40 -left-20 w-40 h-40 rounded-full bg-red-100 opacity-20`} />
                            <View style={tw`absolute -bottom-10 right-10 w-60 h-60 rounded-full bg-yellow-50 opacity-30`} />
                            <LinearGradient
                                colors={['#FEF3C7', '#FFFFFF']}
                                style={tw`w-full h-1/2 rounded-b-full transform translate-y-1/4 opacity-10`}
                            />
                        </View>

                        {/* Back Button */}
                        <TouchableOpacity
                            onPress={handleBack}
                            style={tw`absolute top-5 left-5 z-10 rounded-full overflow-hidden shadow-xl`}
                            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                        >
                            <LinearGradient
                                colors={['#EF4444', '#FF6B6B']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={tw`p-3 flex-row items-center justify-center`}
                            >
                                <BlurView intensity={15} tint="light" style={tw`absolute inset-0`} />
                                <Ionicons name="arrow-back" size={24} color="white" style={tw`z-10`} />
                                <Text style={tw`text-white font-semibold text-sm ml-2 z-10`}>Back</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Main Content */}
                        <Animated.View style={[tw`flex-1 items-center justify-center`, { opacity: fadeAnim }]}>
                            {/* Title */}
                            <View style={tw`mb-10`}>
                                <MaskedView
                                    maskElement={
                                        <Text style={tw`text-4xl font-extrabold tracking-tight text-center leading-tight`}>
                                            {connectedDevice ? 'Connected Device' : 'Turn on Bluetooth'}
                                        </Text>
                                    }
                                >
                                    <LinearGradient
                                        colors={['#EF4444', '#FF6B6B']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Text
                                            style={tw`text-4xl font-extrabold tracking-tight text-center leading-tight opacity-0`}
                                        >
                                            {connectedDevice ? 'Connected Device' : 'Turn on Bluetooth'}
                                        </Text>
                                    </LinearGradient>
                                </MaskedView>
                                <View style={tw`absolute -bottom-2 inset-x-0`}>
                                    <Text
                                        style={tw`text-4xl font-extrabold tracking-tight text-center leading-tight text-gray-200 opacity-30 blur-sm`}
                                    >
                                        {connectedDevice ? 'Connected Device' : 'Turn on Bluetooth'}
                                    </Text>
                                </View>
                            </View>

                            {/* Bluetooth Icon */}
                            <Animated.View
                                style={[
                                    tw`w-44 h-44 rounded-full relative mb-10`,
                                    {
                                        transform: [
                                            {
                                                scale: iconAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0.8, 1],
                                                }),
                                            },
                                        ],
                                    },
                                ]}
                            >
                                <View style={tw`absolute inset-0 bg-yellow-200 rounded-full opacity-30`} />
                                <LinearGradient
                                    colors={['#FEF3C7', '#FDE68A']}
                                    style={tw`absolute inset-2 rounded-full shadow-lg`}
                                >
                                    <BlurView intensity={20} tint="light" style={tw`flex-1 rounded-full`} />
                                </LinearGradient>
                                <View
                                    style={tw`w-32 h-32 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 shadow-lg overflow-hidden`}
                                >
                                    <LinearGradient
                                        colors={['#FFFFFF', '#FFF7ED']}
                                        style={tw`absolute inset-0 rounded-full`}
                                    />
                                    <View style={tw`flex-1 w-full h-full items-center justify-center`}>
                                        <Ionicons
                                            name="bluetooth"
                                            size={44}
                                            color={isBluetoothOn ? '#EF4444' : '#6B7280'}
                                            style={tw`${isBluetoothOn ? 'opacity-100' : 'opacity-70'}`}
                                        />
                                    </View>
                                </View>
                                {isBluetoothOn && (
                                    <View style={tw`absolute inset-0 rounded-full border-2 border-red-400 opacity-20`} />
                                )}
                            </Animated.View>

                            {/* Status Text */}
                            <Text style={tw`text-gray-700 text-lg mb-8 text-center font-medium px-10 leading-relaxed`}>
                                {connectedDevice
                                    ? `Connected to ${connectedDevice.name || 'Unknown Device'}${deviceData ? `: ${deviceData}` : ''}`
                                    : isBluetoothOn
                                    ? scanning
                                        ? 'Scanning for nearby devices...'
                                        : devices.length > 0
                                        ? 'Select a device to connect'
                                        : 'No devices found'
                                    : 'Enable Bluetooth to connect with your device'}
                            </Text>

                            {/* Toggle Button */}
                            <Animated.View
                                style={[
                                    tw`flex-row items-center`,
                                    {
                                        opacity: buttonAnim,
                                        transform: [
                                            {
                                                translateY: buttonAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [20, 0],
                                                }),
                                            },
                                        ],
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={handleToggleBluetooth}
                                    style={tw`flex-row items-center rounded-full px-7 py-4 shadow-xl overflow-hidden relative`}
                                    activeOpacity={0.9}
                                >
                                    <LinearGradient
                                        colors={['#EF4444', '#FF6B6B']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={tw`absolute inset-0`}
                                    >
                                        <BlurView intensity={15} tint="light" style={tw`flex-1`} />
                                    </LinearGradient>
                                    <Text style={tw`text-white text-base font-semibold mr-4 z-10`}>Bluetooth</Text>
                                    <View
                                        style={tw`w-20 h-8 bg-white/90 rounded-full flex-row items-center px-1 z-10 shadow-inner`}
                                    >
                                        <Animated.View
                                            style={tw`w-6 h-6 bg-red-600 rounded-full transform ${
                                                isBluetoothOn ? 'translate-x-12' : 'translate-x-0'
                                            } transition-transform duration-300 shadow-md`}
                                        />
                                    </View>
                                    <Text style={tw`text-white text-base font-semibold ml-3 z-10`}>
                                        {isBluetoothOn ? 'ON' : 'OFF'}
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>

                            {/* Devices List */}
                            {isBluetoothOn && !connectedDevice && (
                                <View style={tw`mt-5 w-full max-h-40`}>
                                    {devices.map((device) => (
                                        <TouchableOpacity
                                            key={device.id}
                                            onPress={() => connectToDevice(device.id)}
                                            style={tw`bg-white p-3 rounded-lg mb-2 shadow-md flex-row justify-between items-center`}
                                        >
                                            <View>
                                                <Text style={tw`text-gray-700 font-medium`}>
                                                    {device.name || 'Unknown Device'}
                                                </Text>
                                                <Text style={tw`text-gray-500 text-sm`}>{device.id}</Text>
                                            </View>
                                            <Ionicons name="link" size={20} color="#EF4444" />
                                        </TouchableOpacity>
                                    ))}
                                    {scanning && (
                                        <Text style={tw`text-gray-500 text-center mt-2`}>Scanning...</Text>
                                    )}
                                </View>
                            )}
                        </Animated.View>

                        {/* Bottom Navigation */}
                        <View style={tw`absolute bottom-0 left-0 right-0 z-20`}>
                            <View style={tw`h-4 bg-transparent overflow-hidden`}>
                                <View style={tw`w-full h-8 bg-white rounded-t-full shadow-lg transform translate-y-4`} />
                            </View>
                            <View style={tw`bg-white py-4 pb-8 shadow-2xl`}>
                                <LinearGradient
                                    colors={['#FFFFFF', '#FFFBF5']}
                                    style={tw`absolute inset-0`}
                                >
                                    <BlurView intensity={10} tint="light" style={tw`flex-1`} />
                                </LinearGradient>
                                <View style={tw`absolute inset-0 opacity-5`}>
                                    <View style={tw`w-full h-full flex-row`}>
                                        {[...Array(10)].map((_, i) => (
                                            <View key={i} style={tw`flex-1 border-r border-gray-400`} />
                                        ))}
                                    </View>
                                </View>
                                <View style={tw`flex-row justify-around items-center relative z-10 px-2`}>
                                    {renderMenuButton('home-outline', 'Home', 'Home', 'home', 0)}
                                    {renderMenuButton('hardware-chip-outline', 'Devices', 'Pairing', 'devices', 1)}
                                    {renderMenuButton('add-circle', 'Add', 'News', 'news', 2, true)}
                                    {renderMenuButton('settings-outline', 'Settings', 'Settings', 'settings', 3)}
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </ImageBackground>
    );
}