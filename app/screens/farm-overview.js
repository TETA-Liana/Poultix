import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import axios from 'axios'
import hostConfig from '../../config/hostConfig';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FarmOverviewScreen() {
  const router = useRouter();
  const [farmOverview, setFarmOverview] = useState({
    chickens: 0,
    sick: 0,
    healthy: 0,
    atRisk: 0,
  });

  useEffect(() => {

    const fetchFarmOverview = async () => {
      const token = await AsyncStorage.getItem('token')
      try {
        const response = await axios.get(hostConfig.host + '/userFarms', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        console.log(response.data)
      }
      catch (error) {
        if(axios.isAxiosError(error)) {
          if(error.response.status === 401) {
            router.push('/sign-in')
          }
        }
      }
    }
    fetchFarmOverview()
  }, [])

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1 px-5 pt-5 relative`}>
          {/* Farm Overview Today Section */}
          <View style={tw`bg-yellow-600 rounded-2xl p-5 mb-6 shadow-sm`}>
            <Text style={tw`text-lg font-semibold text-gray-900 mb-4`}>
              Farm overview today
            </Text>
            <View style={tw`flex-row items-center mb-2`}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/chicken.png' }} // Chicken icon placeholder
                style={tw`w-6 h-6 mr-2`}
              />
              <Text style={tw`text-white text-base`}>
                chicken present : {farmOverview.chickens}
              </Text>
            </View>
            <View style={tw`flex-row items-center justify-between`}>
              <View style={tw`relative`}>
                <View style={tw`w-20 h-20 rounded-full border-8 border-gray-200`} />
                <View
                  style={tw`absolute top-0 left-0 w-20 h-20 rounded-full border-8 border-yellow-400 transform rotate-90`}
                />
                <View
                  style={tw`absolute top-0 left-0 w-20 h-20 rounded-full border-8 border-red-600 transform rotate-180`}
                />
                <View
                  style={tw`absolute top-0 left-0 w-20 h-20 rounded-full border-8 border-green-400 transform rotate-270`}
                />
                <Text style={tw`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 text-base font-bold`}>
                  {/* Empty center for the chart */}
                </Text>
              </View>
              <View>
                <Text style={tw`text-red-600 text-sm font-medium mb-1`}>sick : {farmOverview.sick}</Text>
                <Text style={tw`text-white text-sm font-medium mb-1`}>healthy : {farmOverview.healthy}</Text>
                <Text style={tw`text-green-600 text-sm font-medium`}>at risk : {farmOverview.atRisk}</Text>
              </View>
            </View>
          </View>

          {/* Weather Check Button */}
          <TouchableOpacity
            style={tw`bg-red-700 rounded-lg px-4 py-2 w-40 mb-6  justify-between flew-row self-end`}
            onPress={() => router.push('/')}
          >
            <Text style={tw`text-white text-sm font-medium`}>
              check weather conditions at the farm
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>

          {/* Health Monitoring Section */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-lg font-semibold text-gray-900 mb-4`}>
              health monitoring
            </Text>
            <TouchableOpacity
              style={tw`bg-yellow-600 rounded-2xl p-4 mb-3 flex-row items-center justify-between`}
              onPress={() => router.push('/stool-analysis')}
            >
              <Text style={tw`text-white text-base`}>stool analysis</Text>
              <TouchableOpacity
                style={tw`bg-red-700 rounded-lg w-24 h-10 items-center justify-center`}
              >
                <Text style={tw`text-white text-xs`}>detect stool</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-yellow-600 rounded-2xl p-4 mb-3 flex-row items-center justify-between`}
              onPress={() => router.push('/chatbot')}
            >
              <Text style={tw`text-white text-base`}>chat with AI</Text>
              <TouchableOpacity
                style={tw`bg-red-600 rounded-full w-6 h-6 items-center justify-center`}
              >
                <Ionicons name="chatbox-ellipses-outline" size={14} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-yellow-600 rounded-2xl p-4 flex-row items-center justify-between`}
              onPress={() => router.push('/pharmacies')}
            >
              <Text style={tw`text-white text-base`}>pharmacies around</Text>
              <TouchableOpacity
                style={tw`bg-red-600 rounded-full w-6 h-6 items-center justify-center`}
              >
                <Ionicons name="location-outline" size={14} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Navigation Button (for router.push('/screen/farm-overview') demonstration) */}


          {/* Bottom Navigation Bar */}
          <View
            style={tw`flex-row justify-around items-center bg-white py-3 border-t border-gray-200 shadow-md mb-6`}
          >
            <TouchableOpacity
              onPress={() => router.push('/')}
              style={tw`items-center`}
            >
              <Ionicons name="home-outline" size={24} color="#000" />
              <Text style={tw`text-xs text-gray-900`}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/screens/devices')}
              style={tw`items-center`}
            >
              <Ionicons name="hardware-chip-outline" size={24} color="#000" />
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
      </ScrollView>
    </SafeAreaView>
  );
}