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

export default function VerifyItsYouScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']); // Array to manage 4-digit code

  const handleBack = () => {
    router.back();
  };

  const handleResendCode = () => {
    // Add logic to resend the code (e.g., API call)
    console.log('Resend code requested');
  };

  const handleConfirm = () => {
    // Add logic to verify the code
    const enteredCode = code.join('');
    if (enteredCode.length === 4) {
      console.log('Code entered:', enteredCode);
      router.push('/screens/verifyitsyou'); // Adjust the route as needed
    } else {
      alert('Please enter a 4-digit code');
    }
  };

  const handleKeyPress = (value) => {
    let newCode = [...code];
    for (let i = 0; i < newCode.length; i++) {
      if (!newCode[i]) {
        newCode[i] = value;
        break;
      }
    }
    setCode(newCode);
  };

  const handleDelete = () => {
    let newCode = [...code];
    for (let i = newCode.length - 1; i >= 0; i--) {
      if (newCode[i]) {
        newCode[i] = '';
        break;
      }
    }
    setCode(newCode);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="light" translucent />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 px-6 pt-10 pb-6`}>
          {/* Back Button */}
          <TouchableOpacity onPress={handleBack} style={tw`mb-6`}>
            <Ionicons name="chevron-back" size={24} color="#6B7280" />
          </TouchableOpacity>

          {/* Title and Description */}
          <Text style={tw`text-2xl font-semibold text-red-600 mb-2 text-center`}>
            Verify it's you
          </Text>
          <Text style={tw`text-gray-500 text-base text-center mb-6`}>
            We send a code to (T****@gmail.com). Enter it here to verify your
            identity
          </Text>

          {/* Code Input Boxes */}
          <View style={tw`flex-row justify-center mb-6`}>
            {code.map((digit, index) => (
              <View
                key={index}
                style={tw`w-12 h-12 border border-gray-300 rounded-lg mx-2 flex items-center justify-center`}
              >
                <Text style={tw`text-xl`}>{digit}</Text>
              </View>
            ))}
          </View>

          {/* Resend Code */}
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={tw`text-red-600 text-center mb-6`}>Resend Code</Text>
          </TouchableOpacity>

          {/* Confirm Button */}
          <TouchableOpacity
            onPress={handleConfirm}
            style={tw`w-full h-12 bg-yellow-600 rounded-lg items-center justify-center mb-6`}
          >
            <Text style={tw`text-white text-lg font-semibold`}>Confirm</Text>
          </TouchableOpacity>

          {/* Numeric Keypad */}
          <View style={tw`flex-row flex-wrap justify-center`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => handleKeyPress(num.toString())}
                style={tw`w-1/3 h-16 items-center justify-center`}
              >
                <Text style={tw`text-blue-600 text-2xl`}>{num}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => handleKeyPress('*')}
              style={tw`w-1/3 h-16 items-center justify-center`}
            >
              <Text style={tw`text-blue-600 text-2xl`}> *</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleKeyPress('0')}
              style={tw`w-1/3 h-16 items-center justify-center`}
            >
              <Text style={tw`text-blue-600 text-2xl`}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={tw`w-1/3 h-16 items-center justify-center`}
            >
              <Ionicons name="backspace-outline" size={24} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}