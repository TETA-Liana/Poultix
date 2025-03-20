import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/interfaces/Navigation';
import { BlurView } from 'expo-blur';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ChickenPHReadingsScreen() {
  const router = useNavigation<NavigationProps>();
  const [loading, setLoading] = useState(true);
  const [phReadings, setPhReadings] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [averagePH, setAveragePH] = useState<number>(0);
  const [isSick, setIsSick] = useState<boolean>(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const chartAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Simulate fetching pH readings from an embedded system
    const fetchPHReadings = async () => {
      setLoading(true);
      try {
        // Mock data: pH readings over the last 12 hours
        const mockReadings = [6.8, 6.5, 6.3, 6.0, 5.8, 5.5, 5.3, 5.0, 4.8, 4.5, 4.3, 4.0];
        const mockTimestamps = Array.from({ length: 12 }, (_, i) => {
          const date = new Date();
          date.setHours(date.getHours() - (11 - i));
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        });

        setPhReadings(mockReadings);
        setTimestamps(mockTimestamps);

        // Calculate average pH
        const avg = mockReadings.reduce((sum, val) => sum + val, 0) / mockReadings.length;
        setAveragePH(parseFloat(avg.toFixed(2)));

        // Determine if the chicken might be sick (normal pH for chicken stool is ~6.5-7.5)
        setIsSick(avg < 6.0);

        // Start animations
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.parallel([
            Animated.spring(cardAnim, {
              toValue: 1,
              tension: 50,
              friction: 7,
              useNativeDriver: true,
            }),
            Animated.spring(chartAnim, {
              toValue: 1,
              tension: 40,
              friction: 6,
              useNativeDriver: true,
            }),
            Animated.spring(buttonAnim, {
              toValue: 1,
              tension: 50,
              friction: 7,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      } catch (error) {
        console.error('Error fetching pH readings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPHReadings();
  }, []);

  const handleNavigation = (path: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start(() => router.navigate(path));
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <StatusBar style="dark" backgroundColor="transparent" translucent />
        <View style={tw`w-20 h-20 rounded-full justify-center items-center mb-4 bg-[#EF4444]`}>
          <ActivityIndicator color="#FFFFFF" size="large" />
        </View>
        <Text style={tw`text-lg font-medium text-gray-700`}>Loading pH readings...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/chicken-farmer.webp')} // Replace with your image
      style={tw`flex-1`}
      imageStyle={tw`opacity-5`}
    >
      <LinearGradient
        colors={['#FFFFFF', '#FFF7ED']} // White to light orange-cream gradient
        style={tw`flex-1`}
      >
        <SafeAreaView style={tw`flex-1`}>
          <StatusBar style="dark" backgroundColor="transparent" translucent />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-10`}>
            <Animated.View style={[tw`flex-1 px-5 pt-12`, { opacity: fadeAnim }]}>
              {/* Header */}
              <View style={tw`flex-row justify-between items-center mb-4`}>
                <TouchableOpacity onPress={() => router.goBack()}>
                  <Ionicons name="arrow-back" size={28} color="#6B7280" />
                </TouchableOpacity>
                <Text style={tw`text-4xl font-extrabold text-[#EF4444]`}>pH Readings</Text>
                <TouchableOpacity
                  style={tw`p-2 rounded-full bg-gray-100`}
                  onPress={() => handleNavigation('Settings')}
                >
                  <Ionicons name="settings-outline" size={22} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <Text style={tw`text-gray-500 text-lg mb-8`}>Monitoring chicken health through pH levels</Text>

              {/* pH Readings Chart */}
              <Animated.View
                style={[
                  tw`rounded-3xl p-6 mb-6 shadow-xl overflow-hidden`,
                  {
                    opacity: chartAnim,
                    transform: [
                      {
                        scale: chartAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={tw`bg-[#EF4444] rounded-3xl relative`}>
                  <BlurView intensity={25} tint="light" style={tw`absolute inset-0 rounded-3xl`} />
                  <Text style={tw`text-white text-xl font-bold mb-4 z-10 relative`}>pH Trend (Last 12 Hours)</Text>
                  <LineChart
                    data={{
                      labels: timestamps,
                      datasets: [
                        {
                          data: phReadings,
                          color: () => '#FFFFFF', // White line
                          strokeWidth: 3,
                        },
                      ],
                    }}
                    width={width - 60} // Adjust for padding
                    height={220}
                    chartConfig={{
                      backgroundColor: 'transparent',
                      backgroundGradientFrom: 'transparent',
                      backgroundGradientTo: 'transparent',
                      decimalPlaces: 1,
                      color: () => '#FFFFFF',
                      labelColor: () => '#FFFFFF',
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#EF4444',
                      },
                    }}
                    bezier
                    style={tw`rounded-xl z-10 relative`}
                  />
                  <View style={tw`flex-row justify-between mt-4 z-10 relative`}>
                    <Text style={tw`text-white text-base font-semibold`}>Average pH: {averagePH}</Text>
                    <Text style={tw`text-white text-base font-semibold`}>Range: {Math.min(...phReadings).toFixed(1)} - {Math.max(...phReadings).toFixed(1)}</Text>
                  </View>
                </View>
              </Animated.View>

              {/* Conclusion Section */}
              <Animated.View
                style={[
                  tw`rounded-3xl p-6 mb-6 shadow-xl`,
                  {
                    opacity: cardAnim,
                    transform: [
                      {
                        translateY: cardAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={tw`bg-white rounded-3xl p-4 border border-gray-100`}>
                  <View style={tw`flex-row items-center mb-4`}>
                    <Ionicons
                      name={isSick ? 'alert-circle-outline' : 'checkmark-circle-outline'}
                      size={28}
                      color={isSick ? '#EF4444' : '#10B981'}
                      style={tw`mr-3`}
                    />
                    <Text style={tw`text-xl font-bold text-gray-900`}>Health Conclusion</Text>
                  </View>
                  <Text style={tw`text-gray-700 text-base mb-4`}>
                    {isSick
                      ? 'The average pH of the chicken’s stool is below the normal range (6.5-7.5), indicating a potential health issue.'
                      : 'The average pH of the chicken’s stool is within the normal range (6.5-7.5), suggesting good health.'}
                  </Text>
                  <Text style={tw`text-gray-900 font-semibold text-lg mb-2`}>
                    {isSick ? 'Possible Condition:' : 'Status:'}
                  </Text>
                  <Text style={tw`text-gray-700 text-base`}>
                    {isSick
                      ? 'The low pH may indicate acidosis, possibly due to dietary imbalance or infection.'
                      : 'The chicken appears to be in good health based on pH levels.'}
                  </Text>
                </View>
              </Animated.View>

              {/* Suggestions/Advice Section */}
              <Animated.View
                style={[
                  tw`rounded-3xl p-6 mb-6 shadow-xl`,
                  {
                    opacity: cardAnim,
                    transform: [
                      {
                        translateY: cardAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [30, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={tw`bg-white rounded-3xl p-4 border border-gray-100`}>
                  <View style={tw`flex-row items-center mb-4`}>
                    <Ionicons
                      name={isSick ? 'medkit-outline' : 'heart-outline'}
                      size={28}
                      color={isSick ? '#EF4444' : '#10B981'}
                      style={tw`mr-3`}
                    />
                    <Text style={tw`text-xl font-bold text-gray-900`}>{isSick ? 'Suggestions' : 'Health Tips'}</Text>
                  </View>
                  {isSick ? (
                    <>
                      <Text style={tw`text-gray-700 text-base mb-2`}>
                        • <Text style={tw`font-semibold`}>Consult a Veterinarian:</Text> Schedule a visit to diagnose potential infections or dietary issues.
                      </Text>
                      <Text style={tw`text-gray-700 text-base mb-2`}>
                        • <Text style={tw`font-semibold`}>Adjust Diet:</Text> Introduce more alkaline feed (e.g., calcium-rich supplements) to balance pH.
                      </Text>
                      <Text style={tw`text-gray-700 text-base mb-2`}>
                        • <Text style={tw`font-semibold`}>Monitor Water Quality:</Text> Ensure clean, pH-balanced water to prevent further stress.
                      </Text>
                      <Text style={tw`text-gray-700 text-base`}>
                        • <Text style={tw`font-semibold`}>Isolate if Necessary:</Text> Separate the chicken to prevent potential spread of infection.
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={tw`text-gray-700 text-base mb-2`}>
                        • <Text style={tw`font-semibold`}>Maintain Balanced Diet:</Text> Continue providing a diet rich in nutrients to support gut health.
                      </Text>
                      <Text style={tw`text-gray-700 text-base mb-2`}>
                        • <Text style={tw`font-semibold`}>Ensure Clean Environment:</Text> Regularly clean the coop to prevent infections.
                      </Text>
                      <Text style={tw`text-gray-700 text-base mb-2`}>
                        • <Text style={tw`font-semibold`}>Monitor Stress Levels:</Text> Reduce stressors like overcrowding or sudden temperature changes.
                      </Text>
                      <Text style={tw`text-gray-700 text-base`}>
                        • <Text style={tw`font-semibold`}>Regular Checkups:</Text> Schedule periodic health checks to maintain optimal health.
                      </Text>
                    </>
                  )}
                </View>
              </Animated.View>

              {/* Action Button */}
              <Animated.View
                style={{
                  opacity: buttonAnim,
                  transform: [
                    {
                      scale: buttonAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      }),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  style={tw`rounded-2xl overflow-hidden shadow-2xl border border-white/20`}
                  onPress={() => handleNavigation(isSick ? 'ChatWithAI' : 'FarmOverview')}
                  activeOpacity={0.9}
                >
                  <View style={tw`bg-[#EF4444] flex-row items-center px-5 py-3 relative`}>
                    <BlurView intensity={20} tint="light" style={tw`absolute inset-0`} />
                    <Text style={tw`text-white text-base font-semibold mr-3 z-10`}>
                      {isSick ? 'Consult AI Assistant' : 'Back to Overview'}
                    </Text>
                    <View style={tw`bg-white/30 rounded-full p-2`}>
                      <Ionicons name={isSick ? 'chatbox-ellipses-outline' : 'arrow-back'} size={22} color="#fff" style={tw`z-10`} />
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}
