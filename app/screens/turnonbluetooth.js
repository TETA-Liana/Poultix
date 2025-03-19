import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

export default function ConnectToDeviceScreen() {
  const router = useRouter();
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);

  // Toggle Bluetooth state (mocked for now)
  const handleToggleBluetooth = () => {
    setIsBluetoothOn(!isBluetoothOn);
    // In a real app, integrate with a Bluetooth module here
    // e.g., BleManager.enable() or similar
  };

  // Handle back navigation
  const handleBack = () => {
    router.back(); // Navigate back to the previous screen (e.g., DevicesScreen)
    // Alternatively, you can navigate to a specific screen like:
    // router.push('/devices');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />
      <View style={tw`flex-1 px-5 pt-5 relative`}>
        {/* Background Wave Lines (simulated with a simple View) */}
        <View style={tw`absolute top-0 left-0 right-0 h-full opacity-10`}>
          <View style={tw`w-full h-1/2 bg-gray-200 rounded-b-full transform translate-y-1/4`} />
          <View style={tw`w-full h-1/2 bg-gray-300 rounded-t-full transform -translate-y-1/4`} />
        </View>

        {/* Back Button */}
        <TouchableOpacity
          onPress={handleBack}
          style={tw`absolute top-5 left-5 z-10`} // Position at top-left
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Main Content */}
        <Text style={tw`text-2xl font-bold text-gray-900 mb-6 text-center`}>
          Turn on Bluetooth
        </Text>
        <View style={tw`flex-1 items-center justify-center`}>
          <View style={tw`w-40 h-40 bg-yellow-200 rounded-full relative mb-6`}>
            <View style={tw`w-28 h-28 bg-yellow-100 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}>
              <Ionicons name="bluetooth" size={40} color="#6B7280" />
            </View>
          </View>
          <Text style={tw`text-gray-500 text-base mb-6 text-center`}>
            Searching for devices...
          </Text>
          <TouchableOpacity
            onPress={handleToggleBluetooth}
            style={tw`flex-row items-center bg-red-600 rounded-full px-6 py-2`}
          >
            <Text style={tw`text-white text-base font-medium mr-4`}>
              Turn Bluetooth
            </Text>
            <View style={tw`w-20 h-8 bg-white rounded-full flex-row items-center px-1`}>
              <View
                style={tw`w-6 h-6 bg-red-600 rounded-full transform ${
                  isBluetoothOn ? 'translate-x-5' : 'translate-x-0'
                } transition-transform duration-300`}
              />
            </View>
            <Text style={tw`text-white text-base font-medium ml-2`}>
              {isBluetoothOn ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation Bar */}
        <View
          style={tw`absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white py-3 border-t border-gray-200 shadow-md`}
        >
          <TouchableOpacity
            onPress={() => router.push('/')} // Navigate to Home
            style={tw`items-center`}
          >
            <Ionicons name="home-outline" size={24} color="#000" />
            <Text style={tw`text-xs text-gray-900`}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/devices')} // Navigate to Devices
            style={tw`items-center`}
          >
            <Ionicons name="hardware-chip-outline" size={24} color="#000" />
            <Text style={tw`text-xs text-gray-900`}>Devices</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/news')} // Navigate to News
            style={tw`items-center`}
          >
            <View style={tw`w-12 h-12 bg-red-600 rounded-full items-center justify-center`}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
            <Text style={tw`text-xs text-gray-900`}>News</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/settings')} // Navigate to Settings
            style={tw`items-center`}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#000" />
            <Text style={tw`text-xs text-gray-900`}>Setting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}