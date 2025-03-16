import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

export default function MainReasonScreen() {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState(null);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (!selectedReason) {
      alert('Please select a reason before continuing');
      return;
    }
    router.push('screens/home-screen');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 px-5 pt-5`}>
          {/* Back Button */}
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>

          {/* Title and Description */}
          <View style={tw`mt-4`}>
            <Text style={tw`text-3xl font-bold text-red-600 leading-9`}>
              Main reason for using{'\n'}Poultix
            </Text>
            <Text style={tw`text-gray-500 text-sm mt-2 leading-5`}>
              We need to know this for regulatory{'\n'}reasons. And also we're curious!
            </Text>
          </View>

          {/* Cards Container */}
          <View style={tw`flex-1 mt-6`}>
            {/* First Row */}
            <View style={tw`flex-row justify-between mb-4`}>
              {/* News Card */}
              <TouchableOpacity
                onPress={() => setSelectedReason('news')}
                style={tw`w-[47%] bg-red-600 rounded-2xl p-4 justify-between shadow-md`}
              >
                <View style={tw`w-10 h-10 bg-red-700 rounded-full items-center justify-center`}>
                  <Ionicons name="newspaper-outline" size={20} color="#fff" />
                </View>
                <Text style={tw`text-white text-base font-medium leading-5`}>
                  Getting news{'\n'}about new{'\n'}diseases
                </Text>
              </TouchableOpacity>

              {/* Detection Card */}
              <TouchableOpacity
                onPress={() => setSelectedReason('detection')}
                style={tw`w-[47%] bg-white border border-gray-200 rounded-2xl p-4 shadow-sm`}
              >
                <View style={tw`w-6 h-6 mb-2`}>
                  <Ionicons name="alert-circle-outline" size={20} color="#000" />
                </View>
                <Text style={tw`text-gray-900 text-sm font-medium leading-5`}>
                  Detecting{'\n'}diseases earlier
                </Text>
              </TouchableOpacity>
            </View>

            {/* Second Row */}
            <View style={tw`flex-row justify-between`}>
              {/* Connecting Card */}
              <TouchableOpacity
                onPress={() => setSelectedReason('connecting')}
                style={tw`w-[47%] bg-white border border-gray-200 rounded-2xl p-4 shadow-sm`}
              >
                <View style={tw`w-6 h-6 mb-2`}>
                  <Ionicons name="people-outline" size={20} color="#000" />
                </View>
                <Text style={tw`text-gray-900 text-sm font-medium leading-5`}>
                  Connecting with{'\n'}other chicken{'\n'}farmers
                </Text>
              </TouchableOpacity>

              {/* Veterinarian and Explore Cards */}
              <View style={tw`w-[47%] space-y-4`}>
                {/* Veterinarian Card */}
                <TouchableOpacity
                  onPress={() => setSelectedReason('veterinarian')}
                  style={tw`w-full bg-red-600 rounded-2xl p-4 shadow-md`}
                >
                  <View style={tw`w-6 h-6 mb-2`}>
                    <Ionicons name="medical-outline" size={20} color="#fff" />
                  </View>
                  <Text style={tw`text-white text-sm font-medium leading-5`}>
                    I am a veterinarian
                  </Text>
                </TouchableOpacity>

                {/* Explore Card */}
                <TouchableOpacity
                  onPress={() => setSelectedReason('explore')}
                  style={tw`w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm`}
                >
                  <View style={tw`w-6 h-6 mb-2`}>
                    <Ionicons name="compass-outline" size={20} color="#000" />
                  </View>
                  <Text style={tw`text-gray-900 text-sm font-medium leading-5`}>
                    I just want to{'\n'}explore
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            style={tw`w-full h-12 bg-yellow-600 rounded-lg items-center justify-center mb-4 shadow-md`}
          >
            <Text style={tw`text-white text-base font-semibold`}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}