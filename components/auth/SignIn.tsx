import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Animated,
    Dimensions,
    ScrollView,
    Vibration,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import hostConfig from '../../config/hostConfig';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProps } from '@/interfaces/Navigation';

export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;


    const navigation = useNavigation<NavigationProps>()
    const { width } = Dimensions.get('window');
    const inputRefs = {
        email: useRef(null),
        password: useRef(null),
    };


    useEffect(() => {
        // Animate elements when component mounts
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleBack = () => {
        Vibration.vibrate(20);
        navigation.goBack();
    };

    const handleSignUp = () => {
        Vibration.vibrate(20);
        navigation.navigate('SignUp');
    };

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        try {
            Vibration.vibrate(20);
            animateButton();
            setIsLoading(true);

            const response = await axios.post(hostConfig.host + '/signInUser', {
                email,
                password,
            });

            // Handle success (save token, navigate)
            console.log('Login Successful:', response.data);
            await AsyncStorage.setItem('token', response.data.token);
            setIsLoading(false);

            // Navigate to home or dashboard
            navigation.navigate('Home');

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Login Failed:', error.response?.data || error.message);
                Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');

            }
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        Vibration.vibrate(20);
        // Navigate to forgot password screen
        navigation.navigate('ForgotPassword');
    };

    const handleSocialSignIn = (provider: string) => {
        Vibration.vibrate(20);
        animateButton();
        console.log(`Sign in with ${provider}`);
        // Implement social sign-in logic
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={tw`flex-1`}
            >
                <ScrollView
                    contentContainerStyle={tw`flex-grow`}
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View
                        style={[
                            tw`flex-1 px-6 pt-4`,
                            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
                        ]}
                    >
                        {/* Back Button */}
                        <TouchableOpacity
                            onPress={handleBack}
                            style={tw`w-12 h-12 items-center justify-center rounded-full bg-gray-50 shadow-sm mt-2`}
                        >
                            <Ionicons name="chevron-back" size={24} color="#E11D48" />
                        </TouchableOpacity>

                        {/* Header */}
                        <View style={tw`mt-8 mb-8`}>
                            <Text style={tw`text-3xl font-bold text-red-600`}>
                                Welcome Back
                            </Text>
                            <Text style={tw`text-gray-500 mt-2 text-base`}>
                                Sign in to your account to continue
                            </Text>
                        </View>

                        {/* Form */}
                        <View style={tw`space-y-6`}>
                            {/* Email Input */}
                            <View style={tw`mb-6`}>
                                <Text style={tw`text-gray-700 font-medium mb-2 ml-1`}>Email</Text>
                                <View style={[
                                    tw`flex-row items-center bg-gray-50 rounded-xl overflow-hidden border`,
                                    isEmailFocused ? tw`border-red-300` : tw`border-gray-200`,
                                    tw`shadow-sm`
                                ]}>
                                    <View style={tw`pl-4 pr-2`}>
                                        <Ionicons name="mail-outline" size={22} color={isEmailFocused ? "#E11D48" : "#9CA3AF"} />
                                    </View>
                                    <TextInput
                                        ref={inputRefs.email}
                                        style={tw`flex-1 h-14 text-base text-gray-800`}
                                        placeholder="Enter your email"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        placeholderTextColor="#9CA3AF"
                                        onFocus={() => setIsEmailFocused(true)}
                                        onBlur={() => setIsEmailFocused(false)}
                                    />
                                </View>
                            </View>

                            {/* Password Input */}
                            <View style={tw`mb-6`}>
                                <Text style={tw`text-gray-700 font-medium mb-2 ml-1`}>Password</Text>
                                <View style={[
                                    tw`flex-row items-center bg-gray-50 rounded-xl overflow-hidden border`,
                                    isPasswordFocused ? tw`border-red-300` : tw`border-gray-200`,
                                    tw`shadow-sm`
                                ]}>
                                    <View style={tw`pl-4 pr-2`}>
                                        <Ionicons name="lock-closed-outline" size={22} color={isPasswordFocused ? "#E11D48" : "#9CA3AF"} />
                                    </View>
                                    <TextInput
                                        ref={inputRefs.password}
                                        style={tw`flex-1 h-14 text-base text-gray-800`}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        placeholderTextColor="#9CA3AF"
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={tw`px-4`}
                                    >
                                        <Ionicons
                                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                            size={22}
                                            color={isPasswordFocused ? "#E11D48" : "#9CA3AF"}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Forgot Password */}
                            <TouchableOpacity
                                onPress={handleForgotPassword}
                                style={tw`items-end mb-6`}
                            >
                                <Text style={tw`text-red-600 font-medium`}>
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>

                            {/* Sign In Button */}
                            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                                <TouchableOpacity
                                    onPress={handleSignIn}
                                    style={tw`h-14 rounded-xl overflow-hidden shadow-md`}
                                    activeOpacity={0.9}
                                    disabled={isLoading}
                                >
                                    <LinearGradient
                                        colors={['#F59E0B', '#D97706']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={tw`w-full h-full items-center justify-center`}
                                    >
                                        {isLoading ? (
                                            <View style={tw`flex-row items-center`}>
                                                <Ionicons name="sync" size={20} color="white" style={{ transform: [{ rotate: '45deg' }] }} />
                                                <Text style={tw`text-white font-semibold text-lg ml-2`}>Signing In...</Text>
                                            </View>
                                        ) : (
                                            <Text style={tw`text-white font-semibold text-lg`}>Sign In</Text>
                                        )}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Animated.View>

                            {/* OR Divider */}
                            <View style={tw`flex-row items-center my-8`}>
                                <View style={tw`flex-1 h-[1px] bg-gray-200`} />
                                <Text style={tw`mx-4 text-gray-400 font-medium`}>OR CONTINUE WITH</Text>
                                <View style={tw`flex-1 h-[1px] bg-gray-200`} />
                            </View>

                            {/* Social Sign In */}
                            <View style={tw`flex-row justify-center space-x-4`}>
                                <TouchableOpacity
                                    onPress={() => handleSocialSignIn('Google')}
                                    style={tw`w-[45%] h-14 border border-gray-200 rounded-xl items-center justify-center shadow-sm bg-white`}
                                    activeOpacity={0.8}
                                >
                                    <View style={tw`flex-row items-center`}>
                                        <FontAwesome name="google" size={20} color="#DB4437" />
                                        <Text style={tw`ml-2 font-medium text-gray-700`}>Google</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleSocialSignIn('Apple')}
                                    style={tw`w-[45%] h-14 border border-gray-200 rounded-xl items-center justify-center shadow-sm bg-white`}
                                    activeOpacity={0.8}
                                >
                                    <View style={tw`flex-row items-center`}>
                                        <FontAwesome name="apple" size={22} color="#000" />
                                        <Text style={tw`ml-2 font-medium text-gray-700`}>Apple</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Sign Up Link */}
                        <View style={tw`flex-row justify-center mt-auto mb-6 pt-8`}>
                            <Text style={tw`text-gray-500 text-base`}>Don't have an account? </Text>
                            <TouchableOpacity onPress={handleSignUp}>
                                <Text style={tw`text-red-600 font-semibold text-base`}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
