import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';

export default function News() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[tw`flex-1 px-5 pt-12 pb-8`, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          {/* Profile Section */}
          <LinearGradient
            colors={['#FF3B30', '#FF6B65']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={tw`rounded-3xl p-6 mb-6 shadow-xl border border-orange-100`}
          >
            <View style={tw`flex-row justify-between items-center`}>
              <View>
                <Text style={tw`text-3xl font-extrabold text-white tracking-tight shadow-sm`}>
                  Umutoni Raissa
                </Text>
                <Text style={tw`text-orange-100 text-sm mt-1 font-medium opacity-90 tracking-wide`}>
                  Farmer • Female, 25
                </Text>
              </View>
              <View style={tw`relative`}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/50' }}
                  style={tw`w-16 h-16 rounded-full border-4 border-white shadow-md`}
                />
                <View style={tw`absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-[#FF3B30] shadow-sm`}></View>
              </View>
            </View>
          </LinearGradient>

          {/* Upcoming Schedule Section */}
          <View style={tw`bg-white rounded-3xl p-5 mb-6 shadow-lg border border-orange-50 overflow-hidden`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-bold text-gray-900 tracking-tight`}>
                Upcoming Visit
              </Text>
              <TouchableOpacity onPress={() => router.push('/schedule')}>
                <Text style={tw`text-[#FF3B30] text-sm font-semibold tracking-wide`}>View All</Text>
              </TouchableOpacity>
            </View>
            <LinearGradient
              colors={['#FFF7F6', '#FFFFFF']}
              style={tw`flex-row items-center p-4 rounded-2xl`}
            >
              <Image
                source={{ uri: 'https://via.placeholder.com/50' }}
                style={tw`w-14 h-14 rounded-full mr-4 border-2 border-orange-100 shadow-sm`}
              />
              <View style={tw`flex-1`}>
                <Text style={tw`text_gray-900 text-lg font-semibold tracking-tight`}>
                  Dr. Patricia Uwimana
                </Text>
                <Text style={tw`text-gray-600 text-sm mt-1`}>Sunday, 27 June 2021</Text>
                <Text style={tw`text-gray-500 text-xs mt-0.5 font-medium`}>08:00am - 10:00am</Text>
              </View>
              <TouchableOpacity style={tw`p-3 bg-[#FF3B30] rounded-full shadow-md`}>
                <Ionicons name="chatbubble-ellipses-outline" size={22} color="white" />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Choose Your Location Section */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-xl font-bold text-gray-900 mb-5 tracking-tight`}>
              Select Location
            </Text>
            <View style={tw`flex-row gap-3 mb-5`}>
              {['Byose', 'Kibuye', 'Muhanga'].map((location) => (
                <TouchableOpacity
                  key={location}
                  style={tw`flex-1 bg-white p-4 rounded-2xl shadow-md border border-orange-50 active:bg-orange-50`}
                  onPress={() => router.push(`/location/${location.toLowerCase()}`)}
                >
                  <Text style={tw`text-gray-900 text-sm font-semibold text-center tracking-wide`}>
                    {location}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {[
              { name: 'Dr. Mutesi Hadidja', location: 'Muhanga' },
              { name: 'Dr. Teta Liana', location: 'Nyamirambo' },
            ].map((doctor) => (
              <View
                key={doctor.name}
                style={tw`bg-white rounded-2xl p-4 mb-3 shadow-md flex-row items-center border border-orange-50`}
              >
                <Image
                  source={{ uri: 'https://via.placeholder.com/50' }}
                  style={tw`w-12 h-12 rounded-full mr-4 border-2 border-orange-100 shadow-sm`}
                />
                <View style={tw`flex-1`}>
                  <Text style={tw`text-gray-900 text-base font-semibold tracking-tight`}>
                    {doctor.name}
                  </Text>
                  <Text style={tw`text-gray-600 text-sm mt-0.5`}>{doctor.location}</Text>
                </View>
                <TouchableOpacity style={tw`p-2 bg-orange-50 rounded-full shadow-sm`}>
                  <Ionicons name="ellipsis-horizontal" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Weekly Report Section */}
          <View style={tw`bg-white rounded-3xl p-5 shadow-lg border border-orange-50 overflow-hidden`}>
            <Text style={tw`text-xl font-bold text-gray-900 mb-5 tracking-tight`}>
              Weekly Report
            </Text>
            <View style={tw`flex-row items-center justify-between`}>
              <View style={tw`relative items-center justify-center`}>
                <Animated.View
                  style={tw`w-32 h-32 rounded-full border-[10px] border-orange-100 shadow-md`}
                />
                <Animated.View
                  style={tw`absolute top-0 left-0 w-32 h-32 rounded-full border-[10px] border-[#FF3B30] shadow-inner`}
                />
                <Text style={tw`absolute text-[#FF3B30] text-3xl font-extrabold tracking-tight`}>
                  87%
                </Text>
              </View>
              <View style={tw`space-y-4`}>
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-4 h-4 rounded-full bg-[#FF3B30] mr-3 shadow-sm`}></View>
                  <Text style={tw`text-gray-800 text-sm font-semibold`}>Healthy</Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-4 h-4 rounded-full bg-orange-200 mr-3 shadow-sm`}></View>
                  <Text style={tw`text-gray-800 text-sm font-semibold`}>At Risk</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
