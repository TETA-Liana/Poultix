import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Animated,
    ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import tw from 'twrnc';
import hostConfig from '../../config/hostConfig';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/interfaces/Navigation';

export default function SignUpScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const navigation = useNavigation<NavigationProps>();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        const checkUserSignIn = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    navigation.navigate('Home');
                }
            } catch (error) {
                console.error('Error checking token:', error);
            }
        };
        checkUserSignIn();

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 80,
                friction: 10,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleSignUp = async () => {
        try {
            const response = await axios.post(`${hostConfig.host}/registerUser`, {
                names: name,
                email,
                password,
                role: 'user',
            });
            console.log('Sign up successful:', response.data);
            // Add navigation to next screen or success message here
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Sign up error:', error.response?.data);
            } else {
                console.log('Unexpected error:', error);
            }
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/chicken.webp')}
            style={tw`flex-1`}
            imageStyle={tw`opacity-10`}
        >
            <LinearGradient
                colors={['rgba(255,245,235,0.95)', 'rgba(240,248,255,0.95)']}
                style={tw`flex-1`}
            >
                <SafeAreaView style={tw`flex-1`}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={tw`flex-1`}
                    >
                        <Animated.View 
                            style={[
                                tw`flex-1 p-6`,
                                { 
                                    opacity: fadeAnim,
                                    transform: [{ translateY: slideAnim }]
                                }
                            ]}
                        >
                            {/* Back Icon */}
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={tw`w-10 h-10 rounded-full bg-white/70 items-center justify-center shadow-md border border-gray-100`}
                            >
                                <Ionicons name="arrow-back" size={24} color="#64748B" />
                            </TouchableOpacity>

                            {/* Header */}
                            <View style={tw`mb-12 mt-8`}>
                                <Text style={tw`text-4xl font-extrabold tracking-tight text-gray-900`}>
                                    Join <Text style={tw`text-amber-600`}>Poultix</Text>
                                </Text>
                                <Text style={tw`text-gray-600 mt-2 text-lg`}>
                                    Create your account
                                </Text>
                            </View>

                            {/* Form */}
                            <View style={tw`flex-1`}>
                                {/* Full Name Input with Icon */}
                                <View style={tw`bg-white/70 rounded-xl p-4 mb-5 shadow-md border  bg-gray-50 border-gray-100 flex-row items-center`}>
                                    <Ionicons name="person-outline" size={24} color="#64748B" style={tw`mr-3`} />
                                    <TextInput
                                        style={tw`flex-1 text-lg text-gray-900 `}
                                        placeholder="Full Name"
                                        value={name}
                                        onChangeText={setName}
                                        placeholderTextColor="#94A3B8"
                                    />
                                </View>
                                {/* Email Input with Icon */}
                                <View style={tw`bg-white/70 rounded-xl p-4 mb-5 bg-gray-50  shadow-md border border-gray-100 flex-row items-center`}>
                                    <Ionicons name="mail-outline" size={24} color="#64748B" style={tw`mr-3`} />
                                    <TextInput
                                        style={tw`flex-1 text-lg text-gray-900 `}
                                        placeholder="Enter your email"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        placeholderTextColor="#94A3B8"
                                    />
                                </View>

                                {/* Password Input with Icon */}
                                <View style={tw`bg-white/70 rounded-xl mb-6 shadow-md border  bg-gray-50 border-gray-100 flex-row items-center`}>
                                    <Ionicons name="lock-closed-outline" size={24} color="#64748B" style={tw`mr-2`} />
                                    <TextInput
                                        style={tw`flex-1 p-4 text-lg text-gray-900`}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        placeholderTextColor="#94A3B8"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={tw`p-4`}
                                    >
                                        <Ionicons
                                            name={showPassword ? 'eye-off' : 'eye'}
                                            size={24}
                                            color="#64748B"
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* Forgot Password */}
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('ForgotPassword')}
                                    style={tw`self-end mb-6`}
                                >
                                    <Text style={tw`text-amber-600 text-sm font-medium`}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>

                                {/* Sign Up Button */}
                                <TouchableOpacity 
                                    style={tw`rounded-xl overflow-hidden shadow-lg`}
                                    onPress={handleSignUp}
                                >
                                    <LinearGradient
                                        colors={['#F59E0B', '#D97706']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={tw`p-4`}
                                    >
                                        <BlurView
                                            intensity={20}
                                            tint="light"
                                            style={tw`absolute inset-0`}
                                        />
                                        <Text style={tw`text-white text-lg text-center font-bold relative z-10`}>
                                            Sign Up
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={tw`flex-row items-center my-6`}>
                                    <View style={tw`flex-1 h-px bg-gray-300`} />
                                    <Text style={tw`text-gray-500 mx-4 text-sm font-medium`}>OR</Text>
                                    <View style={tw`flex-1 h-px bg-gray-300`} />
                                </View>

                                {/* Social Sign Up Buttons */}
                                <View style={tw`flex-row justify-between mb-6`}>
                                    <TouchableOpacity
                                        style={tw`flex-1 bg-white/80 mr-2 rounded-xl p-3 items-center shadow-md border border-gray-100 flex-row justify-center`}
                                        onPress={() => console.log('Sign up with Google')}
                                    >
                                        <Ionicons name="logo-google" size={26} color="#DB4437" style={tw`mr-2`} />
                                        <Text style={tw`text-gray-900 text-lg font-medium`}>Google</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={tw`flex-1 bg-white/80 ml-2 rounded-xl p-3 items-center shadow-md border border-gray-100 flex-row justify-center`}
                                        onPress={() => console.log('Sign up with Apple')}
                                    >
                                        <Ionicons name="logo-apple" size={26} color="#000000" style={tw`mr-2`} />
                                        <Text style={tw`text-gray-900 text-lg font-medium`}>Apple</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Sign In Link */}
                                <View style={tw`flex-row justify-center py-4`}>
                                    <Text style={tw`text-gray-600 text-sm font-medium`}>
                                        Already have an account?{' '}
                                    </Text>
                                    <TouchableOpacity 
                                        onPress={() => navigation.navigate('SignIn')}
                                    >
                                        <Text style={tw`text-amber-600 text-sm font-semibold`}>
                                            Sign In
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </ImageBackground>
    );
}