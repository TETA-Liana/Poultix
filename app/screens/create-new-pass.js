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

export default function CreateNewPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleCreatePassword = () => {
    // Add logic to validate and save the new password
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('New password created:', newPassword);
    router.push('/screens/create-new-pass'); // Navigate back to sign-in or another screen
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
            Create New Password
          </Text>
          <Text style={tw`text-gray-500 text-base text-center mb-6`}>
            Please enter a new password below different from the previous password
          </Text>

          {/* New Password Input */}
          <View style={tw`relative mb-6`}>
            <TextInput
              style={tw`h-14 px-4 bg-gray-100 rounded-lg pr-12 text-base`}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={tw`absolute right-4 top-4`}
            >
              <Ionicons
                name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={tw`relative mb-6`}>
            <TextInput
              style={tw`h-14 px-4 bg-gray-100 rounded-lg pr-12 text-base`}
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={tw`absolute right-4 top-4`}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Create New Password Button */}
          <TouchableOpacity
            onPress={handleCreatePassword}
            style={tw`w-full h-12 bg-yellow-600 rounded-lg items-center justify-center mt-auto mb-6`}
          >
            <Text style={tw`text-white text-lg font-semibold`}>Create new password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}