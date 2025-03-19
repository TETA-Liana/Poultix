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
import hostConfig from '@/config/hostConfig';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from 'twrnc'; // Ensure Tailwind works
import axios from 'axios';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(hostConfig.host + '/forgotPassword', {
        email,
      });
      console.log(response)
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 px-6 pt-10`}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`h-10 w-10 items-center justify-center rounded-full bg-gray-50`}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          {/* Icon */}
          <View style={tw`items-center mt-8`}>
            <View style={tw`w-16 h-16 rounded-full bg-red-600 items-center justify-center mb-6`}>
              <Ionicons name="key-outline" size={32} color="#fff" />
            </View>
          </View>

          {/* Title and Description */}
          <View>
            <Text style={tw`text-2xl text-red-600 font-bold text-center`}>
              Password Recovery
            </Text>
            <Text style={tw`text-gray-500 mt-2 text-center`}>
              Enter your registered email below to receive{'\n'}password instructions
            </Text>
          </View>

          {/* Email Input */}
          <View style={tw`mt-8`}>
            <TextInput
              style={tw`h-12 px-4 bg-gray-100 rounded-lg border border-gray-300 text-lg`}
              placeholder="johndoe"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />

            {/* Send Email Button */}
            <TouchableOpacity
              style={tw`h-12 bg-yellow-600 rounded-lg items-center justify-center mt-5`}
              onPress={handleSendEmail}
            >
              <Text style={tw`text-white font-semibold text-lg`}>
                Send me email
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
