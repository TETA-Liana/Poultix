import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

export default function BluetoothResultScreen() {
  const router = useRouter();
  const { deviceId } = useLocalSearchParams(); // Access the deviceId parameter

  // Handle back navigation
  const handleBack = () => {
    router.back(); // Navigate back to the previous screen (e.g., DeviceConnectionScreen)
  };

  // Handle navigation to device details
  const handleViewDetails = () => {
    router.push({
      pathname: '/screens/device-details',
      params: { deviceId }, // Pass deviceId to the details screen
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-blue-50`}>
      <StatusBar style="dark" />
      <View style={tw`flex-1 px-5 pt-5`}>
        {/* Confirmation Section */}
        <View style={tw`bg-yellow-600 rounded-2xl p-6 mb-6 items-center shadow-sm`}>
          <Text style={tw`text-white text-xl font-bold mb-2`}>
            {deviceId || 'Device12'} {/* Fallback to Device12 if no deviceId */}
          </Text>
          <Text style={tw`text-white text-base mb-4`}>Devices paired successfully!</Text>
          <View style={tw`bg-red-800 rounded-lg px-4 py-2`}>
            <Text style={tw`text-white text-sm font-medium`}>Device connected</Text>
          </View>
        </View>

        {/* Device Status Section */}
        <View style={tw`bg-yellow-600 rounded-2xl p-6 mb-6 shadow-sm`}>
          <Text style={tw`text-white text-base font-semibold mb-4 items-center` }>Device Status</Text>
          <View style={tw`flex-row items-center justify-center mb-4`}>
            <View style={tw`relative w-20 h-20 rounded-full border-8 border-transparent`}>
              {/* Circular progress part (red) */}
              <View
                style={tw`absolute top-0 left-0 w-20 h-20 rounded-full border-t-8 border-l-8 border-r-8 border-b-8 border-red-700 transform rotate-45`}
              />
              {/* 100% text */}
              <Text style={tw`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center font-bold`}>
                100%
              </Text>
            </View>
          </View>

          {/* Device Distance and Signal Strength */}
          <View style={tw`items-center`}>
            <View style={tw`flex-row items-center mb-3`}>
              <View style={tw`w-4 h-4 bg-white mr-2`} />
              <Text style={tw`text-white text-sm`}>Device Distance</Text>
            </View>
            <Text style={tw`text-white text-base font-semibold mb-3`}>50cm</Text>
            <View style={tw`flex-row items-center mb-3`}>
              <View style={tw`w-4 h-4 bg-red-600 mr-2`} />
              <Text style={tw`text-white text-sm`}>Signal Strength</Text>
            </View>
            <Text style={tw`text-white text-base font-semibold`}>75%</Text>
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity
  onPress={handleBack}
  style={tw`w-40 bg-red-700 rounded-full px-4 py-2 items-center shadow-md mb-4 self-center`}
>
  <Text style={tw`text-white text-base font-semibold`}>Back</Text>
</TouchableOpacity>


        {/* View Details Button (navigate to device details page) */}
       
      </View>
    </SafeAreaView>
  );
}
