import React, { useState } from 'react'; // Add useState for managing email input
import {
  View,
  Text,
  TextInput, // Add TextInput for editable email
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

export default function VerifyIdentityScreen() {
  const router = useRouter();
  const [email, setEmail] = useState(''); // State to manage the email input

  const handleContinue = () => {
    try {
      router.push('/screens/verify-code');
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="light" translucent />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 justify-center items-center px-6 pt-10 pb-6`}>
          {/* Logo Placeholder */}
          <View style={tw`w-16 h-16 bg-red-600 rounded-full mb-6 flex items-center justify-center`}>
            <Ionicons name="person" size={32} color="white" />
          </View>

          {/* Title and Description */}
          <Text style={tw`text-2xl font-semibold text-red-600 mb-2 text-center`}>
            Verify your identity
          </Text>
          <Text style={tw`text-gray-500 text-base text-center mb-6`}>
            Where would you like Poultix to send your security code?
          </Text>

          {/* Email Selection - Updated to be editable */}
          <View
            style={tw`w-full bg-gray-100 rounded-lg p-4 mb-6 flex-row items-center justify-between`}
            accessibilityLabel="Email input option"
          >
            {/* Circular brown background for the checkmark */}
            <View style={tw`w-8 h-8 bg-brown-600 rounded-full mr-3 flex items-center justify-center`}>
              <Text style={tw`text-white text-sm`}>✔</Text>
            </View>

            {/* Editable email input */}
            <TextInput
              style={tw`flex-1 text-gray-700 text-lg`}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />

            {/* Email icon */}
            <Ionicons name="mail-outline" size={24} color="#4B5563" />
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            style={tw`w-full h-12 bg-yellow-600 rounded-lg items-center justify-center mb-6`}
            accessibilityLabel="Continue button"
          >
            <Text style={tw`text-white text-lg font-semibold`}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}