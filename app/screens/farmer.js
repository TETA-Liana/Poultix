import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

export default function FarmerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-blue-50`}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1 px-5 pt-5`}>
          {/* Profile Section */}
          <View style={tw`flex-row justify-between items-center mb-6`}>
            <View>
              <Text style={tw`text-2xl font-bold text-yellow-600`}>
                Umutoni Raissa
              </Text>
              <Text style={tw`text-teal-500 text-sm`}>
                Farmer - Female, 25
              </Text>
            </View>
            <View style={tw`w-12 h-12 bg-gray-200 rounded-full items-center justify-center`}>
              <Image
                source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual profile image URL
                style={tw`w-12 h-12 rounded-full`}
              />
            </View>
          </View>

          {/* Upcoming Schedule Section */}
          <View style={tw`bg-yellow-600 rounded-2xl p-5 mb-6 shadow-sm`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-lg font-semibold text-white`}>
                Upcoming schedule
              </Text>
              <TouchableOpacity onPress={() => router.push('/schedule')}>
                <Text style={tw`text-red-600 text-sm font-medium`}>View all</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row items-center`}>
              <Image
                source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual doctor image URL
                style={tw`w-12 h-12 rounded-full mr-3`}
              />
              <View>
                <Text style={tw`text-white text-base font-semibold`}>
                  Dr. Patricia Uwimana ...
                </Text>
                <Text style={tw`text-white text-sm`}>
                  Sunday, 27 June 2021
                </Text>
                <Text style={tw`text-white text-sm`}>08:00am - 10:00am</Text>
              </View>
              <View style={tw`ml-auto`}>
                <TouchableOpacity>
                  <Ionicons name="chatbubble-outline" size={24} color="#A61B1B" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Choose Your Location Section */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-lg font-semibold text-gray-900 mb-4`}>
              Choose your location
            </Text>
            <View style={tw`flex-row justify-between mb-4`}>
              <TouchableOpacity
                style={tw`bg-red-700 rounded-lg px-4 py-4 flex-1 mr-2 w-40 `}
                onPress={() => router.push('/location/byose')}
              >
                <Text style={tw`text-white text-sm font-medium text-center`}>Byose</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-white rounded-lg px-4 py-2 flex-1 mr-2 border border-gray-300`}
                onPress={() => router.push('/location/kibuye')}
              >
                <Text style={tw`text-gray-900 text-sm font-medium text-center`}>Kibuye</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-white rounded-lg px-4 py-2 flex-1 border border-gray-300`}
                onPress={() => router.push('/location/muhanga')}
              >
                <Text style={tw`text-gray-900 text-sm font-medium text-center`}>Muhanga</Text>
              </TouchableOpacity>
            </View>
            {/* Doctor for Muhanga */}
            <View style={tw`bg-white rounded-2xl p-4 mb-3 shadow-sm flex-row items-center`}>
              <Image
                source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual doctor image URL
                style={tw`w-12 h-12 rounded-full mr-3`}
              />
              <View>
                <Text style={tw`text-gray-900 text-base font-semibold`}>
                  Dr. Mutesi Hadidja
                </Text>
                <Text style={tw`text-gray-600 text-sm`}>Muhanga</Text>
              </View>
              <View style={tw`ml-auto`}>
                <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
              </View>
            </View>
            {/* Doctor for Nyamirambo */}
            <View style={tw`bg-white rounded-2xl p-4 shadow-sm flex-row items-center`}>
              <Image
                source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual doctor image URL
                style={tw`w-12 h-12 rounded-full mr-3`}
              />
              <View>
                <Text style={tw`text-gray-900 text-base font-semibold`}>
                  Dr. Teta Liana
                </Text>
                <Text style={tw`text-gray-600 text-sm`}>Nyamirambo</Text>
              </View>
              <View style={tw`ml-auto`}>
                <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
              </View>
            </View>
          </View>

          {/* Weekly Report Section */}
          <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-6`}>
            <Text style={tw`text-lg font-semibold text-gray-900 mb-4`}>
              Your weekly report
            </Text>
            <View style={tw`flex-row items-center justify-between`}>
              <View style={tw`relative`}>
                <View style={tw`w-20 h-20 rounded-full border-8 border-gray-200`} />
                <View
                  style={tw`absolute top-0 left-0 w-20 h-20 rounded-full border-8 border-green-400 transform rotate-90`}
                />
                <Text style={tw`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-900 text-base font-bold`}>
                  Feb
                </Text>
              </View>
              <View>
                <Text style={tw`text-yellow-600 text-sm font-medium`}>Sick</Text>
                <Text style={tw`text-red-600 text-sm font-medium`}>At Risk</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}