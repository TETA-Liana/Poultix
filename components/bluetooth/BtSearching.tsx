import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Animated,
    ImageBackground,
    Dimensions,
    Alert,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import tw from 'twrnc';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/interfaces/Navigation';
import BottomNavigation from '../navigation/BottomNavigator';
import TopNavigation from '../navigation/TopNavigation';
import { BleManager, State } from 'react-native-ble-plx';
import DeviceInfo from 'react-native-device-info';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';

const bleManager = new BleManager();

interface Device {
    id: string;
    name: string | null;
}

export default function ConnectToDeviceScreen() {
    const router = useNavigation<NavigationProps>()
    const [isBluetoothOn, setIsBluetoothOn] = useState(false);
    const [devices, setDevices] = useState<Device[]>([]);
    const [scanning, setScanning] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const iconAnim = useRef(new Animated.Value(0)).current;
    const buttonAnim = useRef(new Animated.Value(0)).current;
    const menuItemsAnim = useRef([...Array(4)].map(() => new Animated.Value(0))).current;

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const apiLevel = await DeviceInfo.getApiLevel();
            if (apiLevel < 31) {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
            } else {
                await requestMultiple([
                    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
                    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ]);
            }
        }
    };
    const startScan = async () => {
        await requestPermissions();

        setDevices([]);
        setScanning(true);

        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.warn('Scan error:', error);
                setScanning(false);
                return;
            }
            console.log('Scanned device:', device);
            // Avoid duplicates
            setDevices((prev) => {
                if (device && !prev.find((d) => d.id === device.id)) {
                    return [...prev, device];
                }
                return prev;
            });
        });

        // Stop scanning after 10 seconds
        setTimeout(() => {
            bleManager.stopDeviceScan();
            setScanning(false);
            router.navigate('Bluetooth_Result', { devices });
        }, 10000);
    };

    useEffect(() => {
        // Animate main content
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(iconAnim, {
                toValue: 1,
                tension: 80,
                friction: 10,
                useNativeDriver: true,
            }),
            Animated.timing(buttonAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        // Animate menu items with cascading effect
        menuItemsAnim.forEach((anim, index) => {
            Animated.spring(anim, {
                toValue: 1,
                tension: 80,
                friction: 10,
                delay: 300 + (index * 100),
                useNativeDriver: true,
            }).start();
        });
        const subscription = bleManager.onStateChange((state) => {
            if (state === State.PoweredOn) {
                subscription.remove();
                setIsBluetoothOn(true);
            } else if (state === State.PoweredOff && Platform.OS === 'android') {
                Alert.alert("Bluetooth Required", "Please enable Bluetooth manually from settings.");
            }
        }, true);
        startScan()
    }, []);

    const handleToggleBluetooth = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => { });
        // setIsBluetoothO/n(!isBluetoothOn);
    };



    return (
        <ImageBackground
            source={require('@/assets/images/chicken-farmer.webp')}
            style={tw`flex-1`}
            imageStyle={tw``}
        >
            <LinearGradient
                colors={['#FFFFFF', '#FFF7ED']} // White to light orange-cream gradient
                style={tw`flex-1`}
            >
                <SafeAreaView style={tw`flex-1`}>
                    <TopNavigation />
                    <View style={tw`flex-1 px-5 relative`}>
                        {/* Main Content */}
                        <Animated.View style={[tw`flex-1 items-center justify-center`, { opacity: fadeAnim }]}>
                            {/* Bluetooth Icon with Glow Effect */}
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
                                {/* Outer glow */}
                                <View style={tw`absolute inset-0 bg-red-200 rounded-full opacity-30`} />

                                {/* Main circle */}
                                <LinearGradient
                                    colors={['#FEA3C7', '#FDA68A']}
                                    style={tw`absolute inset-2 rounded-full shadow-lg`}
                                >
                                    <BlurView
                                        intensity={20}
                                        tint="light"
                                        style={tw`flex-1 rounded-full`}
                                    />
                                </LinearGradient>

                                {/* Inner circle */}
                                <View style={tw`w-32 h-32 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 shadow-lg overflow-hidden`}>
                                    <LinearGradient
                                        colors={['#FFFFFF', '#FFF7ED']}
                                        style={tw`absolute inset-0 rounded-full`}
                                    />
                                    <View style={tw`flex-1 w-full h-full items-center justify-center`}>
                                        <Ionicons
                                            name="bluetooth"
                                            size={44}
                                            color={isBluetoothOn ? "#EF4444" : "#6B7280"}
                                            style={tw`${isBluetoothOn ? 'opacity-100' : 'opacity-70'}`}
                                        />
                                    </View>
                                </View>

                                {/* Pulsing animation for active state */}
                                {isBluetoothOn && (
                                    <View style={tw`absolute inset-0 rounded-full border-2 border-red-400 opacity-20`} />
                                )}
                            </Animated.View>

                            <Text style={tw`text-gray-700 text-lg mb-8 text-center font-medium px-10 leading-relaxed`}>
                                {isBluetoothOn
                                    ? 'Scanning for nearby devices...'
                                    : 'Enable Bluetooth to connect with your device'}
                            </Text>

                            {/* Enhanced Toggle Button */}
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
                                        colors={['#FF7111', '#FF9111']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={tw`absolute inset-0`}
                                    >
                                        <BlurView
                                            intensity={15}
                                            tint="light"
                                            style={tw`flex-1`}
                                        />
                                    </LinearGradient>
                                    <Text style={tw`text-white text-base font-semibold mr-4 z-10`}>
                                        Bluetooth
                                    </Text>
                                    <View style={tw`w-20 h-8 bg-white/90 rounded-full flex-row items-center px-1 z-10 shadow-inner`}>
                                        <Animated.View
                                            style={tw`w-6 h-6 bg-orange-400 rounded-full transform ${isBluetoothOn ? 'translate-x-12' : 'translate-x-0'
                                                } transition-transform duration-300 shadow-md`}
                                        />
                                    </View>
                                    <Text style={tw`text-white text-base font-semibold ml-3 z-10`}>
                                        {isBluetoothOn ? 'ON' : 'OFF'}
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </Animated.View>

                        {/* Bottom Navigation Bar */}
                        <BottomNavigation />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </ImageBackground>
    );
}
