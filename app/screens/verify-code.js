import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';

export default function VerifyIdentityScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  // Animations
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  
  useEffect(() => {
    // Entrance animation
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

  const handleContinue = () => {
    try {
      // Button press animation before navigation
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        router.push('/screens/verifyitsyou');
      });
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <LinearGradient
          colors={['#ffffff', '#f7f7f9']}
          style={tw`flex-1`}
        >
          <Animated.View 
            style={[
              tw`flex-1 justify-center items-center px-8 pt-10 pb-6`,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
            ]}
          >
            {/* Modern Logo */}
            <View style={tw`mb-10`}>
              <LinearGradient
                colors={['#ff4b2b', '#ff416c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={tw`w-20 h-20 rounded-2xl shadow-lg items-center justify-center`}
              >
                <Ionicons name="shield-checkmark" size={36} color="white" />
              </LinearGradient>
            </View>

            {/* Title and Description */}
            <Text style={tw`text-3xl font-bold text-gray-800 mb-3 text-center tracking-tight`}>
              Verify your identity
            </Text>
            <Text style={tw`text-gray-500 text-base text-center mb-10 max-w-xs`}>
              Where would you like Poultix to send your security code?
            </Text>

            {/* Email Input with Animation */}
            <View
              style={tw`w-full mb-8 relative`}
              accessibilityLabel="Email input option"
            >
              <View 
                style={[
                  tw`w-full bg-white rounded-xl p-4 flex-row items-center shadow-sm border`,
                  isInputFocused ? tw`border-blue-400` : tw`border-gray-200`,
                ]}
              >
                {/* Animated checkmark badge */}
                <View style={tw`w-9 h-9 bg-emerald-500 rounded-full mr-3 items-center justify-center shadow-sm`}>
                  <Ionicons name="checkmark" size={20} color="white" />
                </View>

                {/* Improved email input */}
                <TextInput
                  style={tw`flex-1 text-gray-700 text-base font-medium`}
                  placeholder="Enter your email address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  placeholderTextColor="#9CA3AF"
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />

                {/* Email icon */}
                <Ionicons name="mail" size={22} color={isInputFocused ? "#3B82F6" : "#6B7280"} />
              </View>
            </View>

            {/* Stylish Continue Button */}
            <TouchableOpacity
              onPress={handleContinue}
              style={tw`w-full shadow-md`}
              accessibilityLabel="Continue button"
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#f59e0b', '#d97706']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={tw`w-full h-14 rounded-xl items-center justify-center`}
              >
                <Text style={tw`text-white text-lg font-bold tracking-wide`}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            {/* Security note */}
            <View style={tw`flex-row items-center mt-8`}>
              <Ionicons name="lock-closed" size={14} color="#9CA3AF" style={tw`mr-2`} />
              <Text style={tw`text-gray-400 text-xs`}>
                Your information is encrypted and secure
              </Text>
            </View>
          </Animated.View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
