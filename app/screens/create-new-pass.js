import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
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
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in animation

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleCreatePassword = () => {
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('New password created:', newPassword);
    router.push('/screens/create-new-pass'); // Adjust navigation as needed
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" translucent />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <Animated.View style={[tw`flex-1 px-6 pt-12 pb-6`, { opacity: fadeAnim }]}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={handleBack}
            style={tw`h-12 w-12 items-center justify-center rounded-full bg-gray-100 shadow-md mb-8`}
          >
            <Ionicons name="chevron-back" size={26} color="#6B7280" />
          </TouchableOpacity>

          {/* Icon in Red Circle */}
          <View style={tw`items-center mb-6`}>
            <View
              style={tw`w-20 h-20 rounded-full bg-red-600 items-center justify-center shadow-lg border-4 border-red-700`}
            >
              <Ionicons name="lock-closed-outline" size={36} color="#fff" />
            </View>
          </View>

          {/* Title and Description */}
          <Text style={tw`text-3xl font-extrabold text-red-600 text-center tracking-tight mb-2`}>
            Create New Password
          </Text>
          <Text style={tw`text-gray-600 text-base text-center leading-6 mb-10`}>
            Set a strong, unique password different{'\n'}from your previous one
          </Text>

          {/* New Password Input */}
          <View style={tw`relative mb-6`}>
            <TextInput
              style={tw`h-14 px-5 bg-gray-50 rounded-xl border border-gray-200 text-lg text-gray-800 shadow-sm pr-12`}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={tw`absolute right-4 top-1/2 transform -translate-y-1/2`}
            >
              <Ionicons
                name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={tw`relative mb-10`}>
            <TextInput
              style={tw`h-14 px-5 bg-gray-50 rounded-xl border border-gray-200 text-lg text-gray-800 shadow-sm pr-12`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={tw`absolute right-4 top-1/2 transform -translate-y-1/2`}
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
            style={tw`w-full h-14 bg-yellow-600 rounded-xl items-center justify-center mt-4 shadow-lg`}
            activeOpacity={0.85}
          >
            <Text style={tw`text-white text-lg font-bold tracking-wide`}>
              Create New Password
            </Text>
          </TouchableOpacity>

          {/* Subtle Footer Link */}
          <TouchableOpacity
            onPress={handleBack}
            style={tw`mt-4 items-center`}
          >
            <Text style={tw`text-gray-500 text-sm`}>
              Back to <Text style={tw`text-red-600 font-semibold`}>Login</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
