import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const handleBack = () => router?.back?.();
  const handleSignUp = () => router?.push?.('/signup');

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="light" translucent />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 px-6 pt-4`}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={handleBack}
            style={tw`w-10 h-10 items-center justify-center rounded-full bg-gray-50`}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>

          {/* Header */}
          <View style={tw`mt-8 mb-6`}>
            <Text style={tw`text-2xl font-bold text-red-600`}>
              Sign in to Your Account
            </Text>
            <Text style={tw`text-gray-500 mt-2`}>
              Welcome back, Sign in to your account
            </Text>
          </View>

          {/* Form */}
          <View style={tw`space-y-6`}>
            {/* Email Input */}
            <TextInput
              style={tw`h-14 px-4 mb-8 bg-gray-100 rounded-lg text-base`}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />

            {/* Password Input */}
            <View style={tw`relative`}>
              <TextInput
                style={tw`h-14 px-4 mb-8 bg-gray-100 rounded-lg pr-12 text-base`}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={tw`absolute right-4 top-4`}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity>
              <Text style={tw`text-red-600 mb-8 text-center font-medium`}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              style={tw`h-14 bg-yellow-500 rounded-lg items-center justify-center`}
            >
              <Text style={tw`text-white font-semibold text-lg`}>Sign In</Text>
            </TouchableOpacity>

            {/* OR Divider */}
            <View style={tw`flex-row items-center my-6`}>
              <View style={tw`flex-1 h-[1px] bg-gray-200`} />
              <Text style={tw`mx-4 text-gray-400`}>OR</Text>
              <View style={tw`flex-1 h-[1px] bg-gray-200`} />
            </View>

            {/* Social Sign In */}
            <View style={tw`flex-row justify-center space-x-4`}>
              <TouchableOpacity
                style={tw`w-[45%] h-14 border border-gray-200 rounded-lg items-center justify-center`}
              >
                <Ionicons name="logo-google" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-[45%] h-14 border border-gray-200 rounded-lg items-center justify-center`}
              >
                <Ionicons name="logo-apple" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Link */}
          <View style={tw`flex-row justify-center mt-auto mb-6`}>
            <Text style={tw`text-gray-500`}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={tw`text-red-600 font-semibold`}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
