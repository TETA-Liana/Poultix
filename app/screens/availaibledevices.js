import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

export default function AvailableDevicesScreen() {
  const router = useRouter();

  // Sample data for available devices
  const deviceData = [
    { id: '1', name: 'Device12' },
    { id: '2', name: 'Device2345' },
    { id: '3', name: 'Bluetooth23' },
    { id: '4', name: 'Bluetoothpro' },
  ];

  // Handle navigation to connect to a device
  const handleConnect = (deviceId) => {
    router.push({
      pathname: 'screens/device-connection',
      params: { deviceId }, // Pass device ID to the connection screen
    });
  };

  // Handle navigation to advanced settings
  const handleAdvancedSettings = () => {
    router.push('screens/advanced-settings'); // Navigate to a hypothetical advanced settings screen
  };

  // Render each device item
  const renderDeviceItem = ({ item, index }) => (
    <View style={tw`flex-row items-center justify-between mb-4`}>
      <View style={tw`flex-row items-center`}>
        <View
          style={tw`w-6 h-6 bg-red-600 rounded-full items-center justify-center mr-3`}
        >
          <Text style={tw`text-white text-sm font-bold`}>{index + 1}</Text>
        </View>
        <Text style={tw`text-gray-900 text-base`}>{item.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleConnect(item.id)}
        style={tw`bg-yellow-600 rounded-lg px-4 py-2`}
      >
        <Text style={tw`text-white text-sm font-medium`}>Connect</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />
      <View style={tw`flex-1 px-5 pt-5 relative`}>
        {/* Background Wave Lines (simulated with a simple View) */}
        <View style={tw`absolute top-0 left-0 right-0 h-full opacity-10`}>
          <View style={tw`w-full h-1/2 bg-gray-200 rounded-b-full transform translate-y-1/4`} />
          <View style={tw`w-full h-1/2 bg-gray-300 rounded-t-full transform -translate-y-1/4`} />
        </View>

        {/* Main Content */}
        <Text style={tw`text-2xl font-bold text-gray-900 mb-6`}>Available Devices</Text>
        <FlatList
          data={deviceData}
          renderItem={renderDeviceItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`mb-6`}
        />
        <TouchableOpacity
          onPress={handleAdvancedSettings}
          style={tw`w-1/2 mx-auto bg-yellow-600 rounded-lg px-3 py-1 items-center mb-6`} // Smaller size
        >
          <Text style={tw`text-white text-sm font-medium`}>Advanced settings</Text>
        </TouchableOpacity>

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
            onPress={() => router.push('/devices')}
            style={tw`items-center`}
          >
            <Ionicons name="hardware-chip-outline" size={24} color="#fff" />
            <Text style={tw`text-xs text-gray-900`}>Devices</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/news')}
            style={tw`items-center`}
          >
            <View style={tw`w-12 h-12 bg-red-600 rounded-full items-center justify-center`}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
            <Text style={tw`text-xs text-gray-900`}>News</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/settings')}
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