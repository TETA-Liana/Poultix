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
import { Link } from 'expo-router';
import tw from 'twrnc'; // Import Tailwind for React Native

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    console.log('Signing up with:', { name, email, password });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 p-6`}>
          {/* Header */}
          <View style={tw`mb-10`}>
            <Text style={tw`text-2xl text-black font-semibold`}>
              Create a <Text style={tw`text-red-600`}>Poultix</Text>{'\n'}
              account
            </Text>
          </View>

          {/* Form */}
          <View style={tw`flex-1`}>
            <TextInput
              style={tw`bg-gray-100 rounded-lg p-4 text-lg mb-5`}
              placeholder="Full name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />

            <TextInput
              style={tw`bg-gray-100 rounded-lg p-4 text-lg mb-5`}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />

            {/* Password Input */}
            <View style={tw`flex-row bg-gray-100 rounded-lg mb-5`}>
              <TextInput
                style={tw`flex-1 p-4 text-lg`}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={tw`p-4`}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
           
            {/* Forgot Password - Centered */}
            <View style={tw`items-center mb-6`}>
              <Link href="/screens/ForgotPassword">
                <Text style={tw`text-red-600 text-sm font-semibold`}>
                  Forgot password?
                </Text>
              </Link>
            </View>


            {/* Sign Up Button */}
            <TouchableOpacity style={tw`bg-yellow-600 rounded-lg p-4 mb-5`} onPress={handleSignUp}>
              <Text style={tw`text-white text-lg text-center font-semibold`}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={tw`text-center text-gray-500 mb-5`}>OR</Text>

            {/* Social Sign Up Buttons */}
            <View style={tw`flex-row justify-between mb-5`}>
              <TouchableOpacity style={tw`flex-1 h-12 border border-gray-300 rounded-lg flex items-center justify-center mx-2`}>
                <Ionicons name="logo-google" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={tw`flex-1 h-12 border border-gray-300 rounded-lg flex items-center justify-center mx-2`}>
                <Ionicons name="logo-apple" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Footer: Sign In */}
            <View style={tw`flex-row justify-center py-5`}>
              <Text style={tw`text-gray-500 text-sm`}>Already have an account? </Text>
              <Link href="/sign-in">
                <Text style={tw`text-red-600 text-sm font-semibold`}>Sign In</Text>
              </Link>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
