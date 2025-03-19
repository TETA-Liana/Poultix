import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Animated,
    Easing,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function BluetoothResultScreen() {
    const router = useRouter();
    const { deviceId } = useLocalSearchParams();

    // Animation states (for page entry and button)
    const [fadeAnim] = React.useState(new Animated.Value(0));
    const [scaleAnim] = React.useState(new Animated.Value(0.9));
    const [buttonScale] = React.useState(new Animated.Value(1));

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 60,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleBack = () => {
        Animated.spring(buttonScale, {
            toValue: 0.95,
            friction: 4,
            useNativeDriver: true,
        }).start(() => {
            buttonScale.setValue(1);
            router.back();
        });
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <StatusBar style="dark" translucent />
            <Animated.View
                style={[
                    tw`flex-1 px-6 pt-10 pb-10 relative overflow-hidden`, // Adjusted padding for full height
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                ]}
            >
                {/* Enhanced Dynamic Background */}
                <View style={tw`absolute inset-0 bg-gradient-to-br from-orange-300/70 via-white to-red-300/70 opacity-95`} />
                <View
                    style={tw`absolute top-[-100px] left-[-100px] w-96 h-96 bg-orange-500/50 rounded-full opacity-80 blur-3xl`}
                />
                <View
                    style={tw`absolute bottom-[-120px] right-[-120px] w-112 h-112 bg-red-500/50 rounded-full opacity-70 blur-3xl`}
                />

                {/* Back Button (Top-Left, Small) */}
                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                    <TouchableOpacity
                        onPress={handleBack}
                        style={tw`absolute top-4 left-4 bg-white rounded-full p-2 shadow-xl border-2 border-orange-600`}
                    >
                        <Ionicons name="arrow-back" size={20} color="#FF6200" />
                    </TouchableOpacity>
                </Animated.View>

                {/* Confirmation Section (Expanded) */}
                <View style={tw`flex-1 justify-center bg-white rounded-3xl mt-16 mb-6 p-6 shadow-2xl border-2 border-orange-400/90 overflow-hidden`}>
                    <View style={tw`absolute inset-0 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-3xl opacity-95`} />
                    <View style={tw`items-center`}>
                        <View style={tw`relative w-28 h-28 mb-4`}>
                            <View
                                style={tw`absolute inset-0 w-28 h-28 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-2xl border-2 border-orange-300/70`}
                            />
                            <View style={tw`absolute inset-2 bg-white rounded-full shadow-lg flex items-center justify-center`}>
                                <Ionicons name="bluetooth" size={40} color="#FF6200" />
                            </View>
                            <View
                                style={tw`absolute top-[-12px] left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/70`}
                            >
                                <Ionicons name="sparkles" size={20} color="#FFFFFF" />
                            </View>
                        </View>
                        <Text style={tw`text-gray-900 text-3xl font-extrabold tracking-tight mb-2`}>
                            {deviceId || 'Device12'}
                        </Text>
                        <Text style={tw`text-orange-600 text-lg font-medium italic mb-4 tracking-wide`}>
                            Paired Successfully
                        </Text>
                        <View style={tw`bg-white rounded-full px-6 py-2 shadow-xl flex-row items-center border-2 border-orange-500/70`}>
                            <Ionicons name="checkmark-circle" size={20} color="#FF6200" style={tw`mr-2`} />
                            <Text style={tw`text-orange-600 text-base font-bold tracking-wider`}>Connected</Text>
                        </View>
                    </View>
                </View>

                {/* Device Status Section (Expanded) */}
                <View style={tw`flex-1 justify-center bg-white rounded-3xl p-6 shadow-2xl border-2 border-red-400/90 overflow-hidden`}>
                    <View style={tw`absolute inset-0 bg-gradient-to-t from-orange-200/50 to-white rounded-3xl opacity-95`} />
                    <Text style={tw`text-gray-900 text-xl font-bold tracking-tight mb-4 text-center`}>
                        Device Status
                    </Text>
                    <View style={tw`items-center mb-4`}>
                        <View style={tw`relative w-32 h-32 rounded-full bg-gradient-to-br from-orange-500/40 to-red-500/40 p-2`}>
                            <View style={tw`w-full h-full rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-orange-400/80`}>
                                <Text style={tw`text-orange-600 text-3xl font-extrabold tracking-wide`}>100%</Text>
                            </View>
                            <View
                                style={tw`absolute top-0 left-0 w-32 h-32 rounded-full border-6 border-orange-600`}
                            />
                        </View>
                    </View>

                    {/* Distance and Signal Display */}
                    <View style={tw`flex-row justify-between`}>
                        <View style={tw`bg-gradient-to-br from-white to-orange-200/60 rounded-2xl p-4 flex-1 mr-2 shadow-lg border-2 border-orange-300/70`}>
                            <View style={tw`flex-row items-center justify-center mb-2`}>
                                <Ionicons name="location" size={22} color="#FF6200" style={tw`mr-2`} />
                                <Text style={tw`text-gray-800 text-sm font-semibold`}>Distance</Text>
                            </View>
                            <View style={tw`bg-orange-300/80 h-3 rounded-full overflow-hidden mt-2 shadow-sm`}>
                                <View style={tw`bg-gradient-to-r from-orange-500 to-red-600 h-full w-1/2 rounded-full`} />
                            </View>
                            <Text style={tw`text-gray-900 text-lg font-bold text-center mt-2`}>50cm</Text>
                        </View>
                        <View style={tw`bg-gradient-to-br from-white to-orange-200/60 rounded-2xl p-4 flex-1 ml-2 shadow-lg border-2 border-orange-300/70`}>
                            <View style={tw`flex-row items-center justify-center mb-2`}>
                                <Ionicons name="wifi" size={22} color="#FF6200" style={tw`mr-2`} />
                                <Text style={tw`text-gray-800 text-sm font-semibold`}>Signal</Text>
                            </View>
                            <View style={tw`bg-orange-300/80 h-3 rounded-full overflow-hidden mt-2 shadow-sm`}>
                                <View style={tw`bg-gradient-to-r from-orange-500 to-red-600 h-full w-3/4 rounded-full`} />
                            </View>
                            <Text style={tw`text-gray-900 text-lg font-bold text-center mt-2`}>75%</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}
