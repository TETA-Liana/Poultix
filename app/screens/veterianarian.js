import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

export default function VeterinarianScreen() {
  const router = useRouter();

  // Sample data for the schedule overview
  const scheduleData = [
    { id: '1', farmer: 'Mwiza Anne', appointment: '11.Jan.2025', status: 'done' },
    { id: '2', farmer: 'Ngarambe Jean', appointment: '23.Feb.2025', status: 'in progress' },
    { id: '3', farmer: 'Kalisa Joie', appointment: '25.Feb.2025', status: 'done' },
    { id: '4', farmer: 'Rubaye Darius', appointment: '27.Feb.2025', status: 'done' },
  ];

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  // Handle navigation to disease outbreaks screen
  const handleCheckOutbreaks = () => {
    router.push('screens/veterianarian'); // Navigate to a hypothetical disease outbreaks screen
  };

  // Optional: Handle navigation when clicking a schedule item
  const handleScheduleItemPress = (itemId) => {
    router.push({
      pathname: 'screens/appointment-details',
      params: { appointmentId: itemId },
    });
  };

  // Render each schedule item
  const renderScheduleItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleScheduleItemPress(item.id)} // Navigate on press (optional)
      style={tw`flex-row justify-between py-3 border-b border-gray-200`}
    >
      <Text style={tw`text-gray-900 text-base`}>{item.farmer}</Text>
      <Text style={tw`text-gray-500 text-base`}>{item.appointment}</Text>
      <Text
        style={tw`${
          item.status === 'done' ? 'text-green-500' : 'text-yellow-500'
        } text-base capitalize`}
      >
        {item.status}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-blue-50`}>
      <StatusBar style="dark" />
      <View style={tw`flex-1 px-5 pt-5`}>
        {/* Profile Section */}
        <View style={tw`flex-row justify-between items-center mb-6`}>
          <View>
            <Text style={tw`text-2xl font-bold text-blue-800`}>Mwiza Ange</Text>
            <Text style={tw`text-teal-500 text-sm`}>Farmer - Female, 35</Text>
          </View>
          <View style={tw`w-12 h-12 bg-gray-200 rounded-full items-center justify-center`}>
            <Ionicons name="person-outline" size={24} color="#000" />
          </View>
        </View>

        {/* Farms Overview Section */}
        <View style={tw`bg-yellow-600 rounded-2xl p-5 mb-6 shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-white mb-4`}>Farms overview</Text>
          <View style={tw`flex-row justify-between mb-3`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="home-outline" size={20} color="#fff" style={tw`mr-2`} />
              <Text style={tw`text-white text-base`}>Total farms managed: 20</Text>
            </View>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="medkit-outline" size={20} color="#fff" style={tw`mr-2`} />
              <Text style={tw`text-white text-base`}>Total vaccines available: 500</Text>
            </View>
          </View>
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="alert-circle-outline" size={20} color="#fff" style={tw`mr-2`} />
              <Text style={tw`text-white text-base`}>disease outbreaks</Text>
            </View>
            <TouchableOpacity
              onPress={handleCheckOutbreaks} // Navigate on press
              style={tw`bg-red-700 rounded-full px-4 py-1`}
            >
              <Text style={tw`text-white text-sm font-medium`}>check</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Schedule's Overview Section */}
        <View style={tw`bg-white rounded-2xl p-5 flex-1 shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-gray-900 mb-4`}>schedule’s overview</Text>
          <View style={tw`flex-row justify-between py-2 border-b border-gray-200`}>
            <Text style={tw`text-gray-500 text-sm font-medium`}>farmer</Text>
            <Text style={tw`text-gray-500 text-sm font-medium`}>appointment</Text>
            <Text style={tw`text-gray-500 text-sm font-medium`}>status</Text>
          </View>
          <FlatList
            data={scheduleData}
            renderItem={renderScheduleItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Back Button */}
        <View style={tw`flex-1 justify-center items-center`}>
  <TouchableOpacity
    onPress={handleBack}
    style={tw`w-40 h-12 bg-red-700 rounded-lg items-center justify-center mt-4 mb-4 shadow-md`}
  >
    <Text style={tw`text-white text-base font-semibold`}>Back</Text>
  </TouchableOpacity>
</View>

      </View>
    </SafeAreaView>
  );
}