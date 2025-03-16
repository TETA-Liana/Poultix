import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Fixed import
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

export default function BluetoothSettingsScreen() {
  const router = useRouter();
  const { deviceId } = useLocalSearchParams(); // Access the deviceId parameter

  // Handle navigation to connect to a new device
  const handleAddDevice = () => {
    router.push('/screens/connect-device'); // Updated to a proper screen
  };

  // Handle navigation to exit (back or a specific screen)
  const handleExit = () => {
    router.back();
  };

  // Placeholder handlers for other actions
  const handleRenameDevice = () => {
    console.log('Rename device');
  };

  const handleRemoveDevice = () => {
    console.log('Remove device');
  };

  const handleDisconnect = () => {
    console.log('Disconnect device');
    router.back();
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />
      <View style={tw`flex-1 px-5 pt-5 relative`}>
        {/* Background Wave Lines */}
        <View style={[tw`absolute top-0 left-0 right-0 h-full opacity-10`]}>
          <View style={[tw`w-full h-1/2 bg-gray-200 rounded-b-full`, { transform: [{ translateY: 50 }] }]} />
          <View style={[tw`w-full h-1/2 bg-gray-300 rounded-t-full`, { transform: [{ translateY: -50 }] }]} />
        </View>

        {/* Main Content */}
        <Text style={tw`text-2xl font-bold text-gray-900 mb-6`}>Bluetooth settings</Text>

        {/* Device Header */}
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`w-6 h-6 bg-red-600 rounded-full mr-3`} />
            <Text style={tw`text-gray-900 text-base font-semibold`}>
              {deviceId || 'Device12'}
            </Text>
          </View>
          <TouchableOpacity onPress={handleDisconnect} style={tw`bg-yellow-600 rounded-lg px-4 py-2`}>
            <Text style={tw`text-white text-sm font-medium`}>Disconnect</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Options */}
        <View style={tw`bg-yellow-600 rounded-2xl p-4 mb-6 shadow-sm`}>
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Text style={tw`text-white text-base`}>Connect to a new device</Text>
            <TouchableOpacity onPress={handleAddDevice}>
              <Ionicons name="add-circle-outline" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Text style={tw`text-white text-base`}>Rename the device</Text>
            <TouchableOpacity onPress={handleRenameDevice}>
              <Ionicons name="create-outline" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Text style={tw`text-white text-base`}>Remove the device</Text>
            <TouchableOpacity onPress={handleRemoveDevice}>
              <Ionicons name="trash-outline" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Text style={tw`text-white text-base`}>Signal strength</Text>
            <Ionicons name="wifi" size={24} color="#ffffff" />
          </View>

          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-white text-base`}>Battery level</Text>
            <Ionicons name="battery-half" size={24} color="#ffffff" />
          </View>
        </View>

        {/* Exit Button */}
        <TouchableOpacity
          onPress={handleExit}
          style={tw`w-40 bg-red-700 rounded-full px-4 py-2 items-center shadow-md mb-4 self-center`}
        >
          <Text style={tw`text-white text-base font-semibold`}>Exit</Text>
        </TouchableOpacity>

        {/* Bottom Navigation Bar */}
        <View style={tw`absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white py-3 border-t border-gray-200 shadow-md`}>
          <TouchableOpacity onPress={() => router.push('/')} style={tw`items-center`}>
            <Ionicons name="home-outline" size={24} color="#000" />
            <Text style={tw`text-xs text-gray-900`}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/devices')} style={tw`items-center`}>
            <Ionicons name="hardware-chip-outline" size={24} color="#000" />
            <Text style={tw`text-xs text-gray-900`}>Devices</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/news')} style={tw`items-center`}>
            <View style={tw`w-12 h-12 bg-red-600 rounded-full items-center justify-center`}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
            <Text style={tw`text-xs text-gray-900`}>News</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/settings')} style={tw`items-center`}>
            <Ionicons name="chatbubble-outline" size={24} color="#000" />
            <Text style={tw`text-xs text-gray-900`}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
