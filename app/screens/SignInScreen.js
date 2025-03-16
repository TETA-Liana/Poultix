import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTailwind } from 'tailwind-rn';

export default function SignInScreen({ navigation }) {
  const tw = useTailwind();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <TouchableOpacity 
        style={tw('p-4')}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View style={tw('flex-1 px-6')}>
        <Text style={tw('text-2xl font-bold text-red-600 mb-2')}>Sign in to Your Account</Text>
        <Text style={tw('text-base text-gray-500 mb-8')}>Welcome back, Sign in to your account</Text>

        <View style={tw('space-y-4')}>
          <View>
            <TextInput
              style={tw('h-12 rounded-lg bg-gray-50 px-4 text-base')}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={tw('relative')}>
            <TextInput
              style={tw('h-12 rounded-lg bg-gray-50 px-4 pr-12 text-base')}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={tw('absolute right-3 top-3')}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={tw('text-right text-red-600 text-sm')}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw('h-12 bg-yellow-700 rounded-lg justify-center items-center mt-2')}>
            <Text style={tw('text-white text-base font-semibold')}>Sign In</Text>
          </TouchableOpacity>

          <Text style={tw('text-center text-gray-500 my-4')}>OR</Text>

          <View style={tw('flex-row justify-center space-x-4')}>
            <TouchableOpacity style={tw('w-36 h-12 rounded-lg border border-gray-200 justify-center items-center')}>
              <Ionicons name="logo-google" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={tw('w-36 h-12 rounded-lg border border-gray-200 justify-center items-center')}>
              <Ionicons name="logo-apple" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={tw('flex-row justify-center mt-4')}>
            <Text style={tw('text-gray-500')}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={tw('text-red-600 font-semibold')}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}