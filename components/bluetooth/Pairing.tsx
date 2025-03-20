import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Animated,
    ImageBackground,
    Dimensions,
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

export default function ConnectToDeviceScreen() {
    const router = useNavigation<NavigationProps>()
    const [isBluetoothOn, setIsBluetoothOn] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const iconAnim = useRef(new Animated.Value(0)).current;
    const buttonAnim = useRef(new Animated.Value(0)).current;
    const menuItemsAnim = useRef([...Array(4)].map(() => new Animated.Value(0))).current;
    const [activeTab, setActiveTab] = useState('devices');
    const { width } = Dimensions.get('window');

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
    }, []);

    const handleToggleBluetooth = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => { });
        setIsBluetoothOn(!isBluetoothOn);
    

    };

    const handleBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => router.navigate('PhReader'));
    };

    const handleNavigation = (path: string, tabName: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
        setActiveTab(tabName);
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => router.navigate(path));
    };

    const renderMenuButton = (icon: any, label: string, path: string, tabName: string, index: number, special = false) => {
        const isActive = activeTab === tabName;
        const buttonStyle = special
            ? tw`items-center -mt-8`
            : tw`items-center px-4`;

        const textColor = isActive ? 'text-red-500' : 'text-gray-700';
        const iconColor = isActive ? '#EF4444' : '#6B7280';

        return (
            <Animated.View style={{
                opacity: menuItemsAnim[index],
                transform: [
                    {
                        translateY: menuItemsAnim[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [20, 0]
                        })
                    }
                ]
            }}>
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
                                {isActive && (
                                    <View style={tw`absolute w-10 h-10 bg-red-100 rounded-full opacity-30`} />
                                )}
                                <Ionicons name={icon} size={24} color={iconColor} />
                            </View>
                            <Text style={tw`text-xs font-semibold mt-1 ${textColor}`}>{label}</Text>
                            {isActive && (
                                <View style={tw`h-1 w-6 bg-red-500 rounded-full mt-1`} />
                            )}
                        </>
                    )}
                    {special && (
                        <Text style={tw`text-xs font-semibold mt-2 text-gray-700`}>{label}</Text>
                    )}
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <ImageBackground
            source={require('../../assets/images/chicken-farmer.webp')} // Replace with your image
            style={tw`flex-1`}
            imageStyle={tw`opacity-5`}
        >
            <LinearGradient
                colors={['#FFFFFF', '#FFF7ED']} // White to light orange-cream gradient
                style={tw`flex-1`}
            >
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
                                <BlurView
                                    intensity={15}
                                    tint="light"
                                    style={tw`absolute inset-0`}
                                />
                                <Ionicons name="arrow-back" size={24} color="white" style={tw`z-10`} />
                                <Text style={tw`text-white font-semibold text-sm ml-2 z-10`}>Back</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Main Content */}
                        <Animated.View style={[tw`flex-1 items-center justify-center`, { opacity: fadeAnim }]}>
                            {/* Title with 3D effect */}
                            <View style={tw`mb-10`}>
                                <MaskedView
                                    maskElement={
                                        <Text style={tw`text-4xl font-extrabold tracking-tight text-center leading-tight`}>
                                            Turn on Bluetooth
                                        </Text>
                                    }
                                >
                                    <LinearGradient
                                        colors={['#EF4444', '#FF6B6B']} // Red-orange gradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Text style={tw`text-4xl font-extrabold tracking-tight text-center leading-tight opacity-0`}>
                                            Turn on Bluetooth
                                        </Text>
                                    </LinearGradient>
                                </MaskedView>
                                <View style={tw`absolute -bottom-2 inset-x-0`}>
                                    <Text style={tw`text-4xl font-extrabold tracking-tight text-center leading-tight text-gray-200 opacity-30 blur-sm`}>
                                        Turn on Bluetooth    router.navigate('PhReader')
                                    </Text>
                                </View>
                            </View>

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
                                <View style={tw`absolute inset-0 bg-yellow-200 rounded-full opacity-30`} />

                                {/* Main circle */}
                                <LinearGradient
                                    colors={['#FEF3C7', '#FDE68A']}
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
                                        colors={['#EF4444', '#FF6B6B']}
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
                                            style={tw`w-6 h-6 bg-red-600 rounded-full transform ${isBluetoothOn ? 'translate-x-12' : 'translate-x-0'
                                                } transition-transform duration-300 shadow-md`}
                                        />
                                    </View>
                                    <Text style={tw`text-white text-base font-semibold ml-3 z-10`}>
                                        {isBluetoothOn ? 'ON' : 'OFF'}
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </Animated.View>

                        {/* Enhanced Bottom Navigation Bar */}
                        <View
                            style={tw`absolute bottom-0 left-0 right-0 z-20`}
                        >
                            {/* Upper curved edge */}
                            <View style={tw`h-4 bg-transparent overflow-hidden`}>
                                <View style={tw`w-full h-8 bg-white rounded-t-full shadow-lg transform translate-y-4`} />
                            </View>

                            {/* Main menu container */}
                            <View style={tw`bg-white py-4 pb-8 shadow-2xl`}>
                                <LinearGradient
                                    colors={['#FFFFFF', '#FFFBF5']}
                                    style={tw`absolute inset-0`}
                                >
                                    <BlurView
                                        intensity={10}
                                        tint="light"
                                        style={tw`flex-1`}
                                    />
                                </LinearGradient>

                                {/* Subtle pattern overlay */}
                                <View style={tw`absolute inset-0 opacity-5`}>
                                    <View style={tw`w-full h-full flex-row`}>
                                        {[...Array(10)].map((_, i) => (
                                            <View key={i} style={tw`flex-1 border-r border-gray-400`} />
                                        ))}
                                    </View>
                                </View>

                                {/* Menu Items */}
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
