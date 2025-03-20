import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Animated,
  ImageBackground,
  Dimensions,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import hostConfig from '../../config/hostConfig';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import * as Haptics from 'expo-haptics';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigationProps } from '@/interfaces/Navigation';
import { BlurView } from 'expo-blur';
import { SharedElement } from 'react-navigation-shared-element';
import { AnimatePresence, MotiView } from 'moti';

const { width } = Dimensions.get('window');
const isPad = width >= 768;
const isLargePhone = width >= 428;

export default function FarmOverviewScreen() {
  const router = useNavigation<NavigationProps>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [farmName, setFarmName] = useState("Sunrise Farm");
  const [farmOverview, setFarmOverview] = useState({
    chickens: 150,
    sick: 5,
    healthy: 130,
    atRisk: 15,
    lastUpdated: new Date(),
  });
  const [weatherPreview, setWeatherPreview] = useState({
    temp: 24,
    condition: 'sunny',
    humidity: 65,
  });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'alert', message: 'Increased risk of heat stress today' },
    { id: 2, type: 'info', message: 'Feeding schedule updated' },
  ]);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const navAnim = useRef(new Animated.Value(0)).current;
  const chartAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const notificationAnim = useRef(new Animated.Value(0)).current;
  const headerScaleAnim = useRef(new Animated.Value(1)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  // Derived values for parallax and scaling effects
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  // Card health colors based on farm status
  const healthColors = useMemo(() => {
    const sickPercentage = farmOverview.chickens ? (farmOverview.sick / farmOverview.chickens) * 100 : 0;
    return {
      primary: sickPercentage > 20 ? '#EF4444' : sickPercentage > 10 ? '#F59E0B' : '#10B981',
      secondary: sickPercentage > 20 ? '#FF6B6B' : sickPercentage > 10 ? '#FBBF24' : '#34D399',
      background: sickPercentage > 20 ? '#FEF2F2' : sickPercentage > 10 ? '#FEF3C7' : '#ECFDF5',
    };
  }, [farmOverview]);

  const fetchFarmOverview = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get(`${hostConfig.host}/userFarms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFarmName(response.data.farmName || "Sunrise Farm");
      setFarmOverview({
        chickens: response.data.chickens || 150,
        sick: response.data.sick || 5,
        healthy: response.data.healthy || 130,
        atRisk: response.data.atRisk || 15,
        lastUpdated: new Date(),
      });

      setWeatherPreview({
        temp: Math.floor(Math.random() * 20) + 15,
        condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
        humidity: Math.floor(Math.random() * 30) + 50,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to fetch farm data');
        console.error('Axios error:', error.response?.data);
      } else {
        setError('Network error. Please check your connection.');
        console.error('Error fetching farm overview:', error);
      }
    } finally {
      if (showLoader) setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFarmOverview(false);
  };

  useEffect(() => {
    fetchFarmOverview();

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
        Animated.timing(navAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
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
        Animated.timing(notificationAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const intervalId = setInterval(() => {
      setFarmOverview(prev => ({
        ...prev,
        atRisk: Math.max(0, prev.atRisk + Math.floor(Math.random() * 3) - 1),
      }));
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchFarmOverview(false);
    }, [])
  );

  const handleNavigation = (path: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start(() => router.navigate(path));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'sunny-outline';
      case 'cloudy':
        return 'cloudy-outline';
      case 'rainy':
        return 'rainy-outline';
      default:
        return 'partly-sunny-outline';
    }
  };

  const healthyPercentage = farmOverview.chickens ? (farmOverview.healthy / farmOverview.chickens) * 100 : 0;
  const sickPercentage = farmOverview.chickens ? (farmOverview.sick / farmOverview.chickens) * 100 : 0;
  const atRiskPercentage = farmOverview.chickens ? (farmOverview.atRisk / farmOverview.chickens) * 100 : 0;

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not available';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <StatusBar style="dark" backgroundColor="transparent" translucent />
        <View style={tw`w-20 h-20 rounded-full justify-center items-center mb-4 bg-[#EF4444]`}>
          <ActivityIndicator color="#FFFFFF" size="large" />
        </View>
        <Text style={tw`text-lg font-medium text-gray-700`}>Loading farm data...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/chicken-farmer.webp')}
      style={tw`flex-1`}
      imageStyle={tw`opacity-5`}
    >
      <LinearGradient
        colors={[healthColors.background, '#FFFFFF']}
        style={tw`flex-1`}
      >
        <SafeAreaView style={tw`flex-1`}>
          <StatusBar style="dark" backgroundColor="transparent" translucent />

          {error && (
            <MotiView
              from={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 300 }}
              style={tw`mx-4 mt-2 bg-red-50 px-4 py-3 rounded-xl border border-red-200 flex-row items-center`}
            >
              <Ionicons name="alert-circle" size={22} color="#EF4444" style={tw`mr-2`} />
              <Text style={tw`flex-1 text-red-600 font-medium text-sm`}>{error}</Text>
              <TouchableOpacity onPress={() => setError(null)}>
                <Ionicons name="close-circle" size={22} color="#6B7280" />
              </TouchableOpacity>
            </MotiView>
          )}

          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-28`}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={healthColors.primary}
                colors={[healthColors.primary]}
              />
            }
          >
            <Animated.View
              style={[
                tw`flex-1 px-5 pt-${Platform.OS === 'ios' ? '12' : '16'}`,
                { opacity: fadeAnim, transform: [{ scale: headerScale }] },
              ]}
            >
              {/* Header */}
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-gray-500 font-medium`}>
                  {farmOverview.lastUpdated ? `Last updated: ${formatDate(farmOverview.lastUpdated)}` : 'Loading data...'}
                </Text>
                <TouchableOpacity
                  style={tw`p-2 rounded-full bg-gray-100`}
                  onPress={() => handleNavigation('Settings')}
                >
                  <Ionicons name="settings-outline" size={22} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <Text style={tw`text-4xl font-extrabold tracking-tight mb-2 leading-tight text-[#EF4444]`}>
                {farmName}
              </Text>

              <Text style={tw`text-gray-500 text-lg mb-8`}>Your farm at a glance</Text>

              {/* Notifications */}
              {notifications.length > 0 && (
                <Animated.View
                  style={{
                    opacity: notificationAnim,
                    transform: [
                      {
                        translateY: notificationAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [10, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={tw`pb-2`}
                  >
                    {notifications.map((notification) => (
                      <TouchableOpacity
                        key={notification.id}
                        style={tw`mr-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm flex-row items-center max-w-[${isPad ? '300px' : '260px'}]`}
                        onPress={() => {
                          setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
                        }}
                      >
                        <View
                          style={tw`mr-3 p-2 rounded-full bg-${notification.type === 'alert' ? 'red-100' : 'blue-100'}`}
                        >
                          <Ionicons
                            name={notification.type === 'alert' ? 'warning-outline' : 'information-circle-outline'}
                            size={20}
                            color={notification.type === 'alert' ? '#EF4444' : '#3B82F6'}
                          />
                        </View>
                        <Text style={tw`flex-1 text-gray-800 font-medium text-sm`} numberOfLines={2}>
                          {notification.message}
                        </Text>
                        <Ionicons name="chevron-forward" size={18} color="#6B7280" style={tw`ml-1`} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Animated.View>
              )}

              {/* Farm Overview Card */}
              <Animated.View
                style={[
                  tw`rounded-3xl overflow-hidden shadow-xl mb-6 border border-white/30`,
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
                <SharedElement id="farm-overview-card">
                  <View style={tw`bg-[#EF4444] p-6 relative`}>
                    <BlurView intensity={25} tint="light" style={tw`absolute inset-0 rounded-3xl`} />
                    <View style={tw`absolute top-0 right-0 w-40 h-40 -mr-10 -mt-10 rounded-full bg-white/10`} />
                    <View style={tw`absolute bottom-0 left-0 w-20 h-20 -ml-5 -mb-5 rounded-full bg-white/5`} />

                    {/* Card Header */}
                    <View style={tw`flex-row items-center justify-between mb-6 z-10 relative`}>
                      <View style={tw`flex-row items-center`}>
                        <FontAwesome5 name="chicken" size={20} color="white" style={tw`mr-3`} />
                        <Text style={tw`text-white text-xl font-bold`}>Farm Overview</Text>
                      </View>
                      <TouchableOpacity
                        style={tw`rounded-full bg-white/20 p-2`}
                        onPress={() => handleNavigation('FarmDetails')}
                      >
                        <Ionicons name="information-circle-outline" size={22} color="white" />
                      </TouchableOpacity>
                    </View>

                    {/* Main Stats */}
                    <View style={tw`flex-row items-center mb-6 z-10 relative`}>
                      <Animated.View
                        style={[
                          tw`justify-center items-center`,
                          {
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
                        <View style={tw`relative justify-center items-center mb-2`}>
                          <View style={tw`w-26 h-26 rounded-full border-8 border-white/30`} />
                          <View
                            style={[
                              tw`absolute top-0 left-0 w-26 h-26 rounded-full border-8`,
                              {
                                borderColor: '#10B981',
                                borderLeftColor: 'transparent',
                                borderBottomColor: 'transparent',
                                borderRightColor: 'transparent',
                                transform: [{ rotateZ: `${healthyPercentage * 3.6}deg` }],
                              },
                            ]}
                          />
                          <View
                            style={[
                              tw`absolute top-0 left-0 w-26 h-26 rounded-full border-8`,
                              {
                                borderColor: '#F59E0B',
                                borderTopColor: 'transparent',
                                borderRightColor: 'transparent',
                                transform: [{ rotateZ: `${healthyPercentage * 3.6 + 90}deg` }],
                              },
                            ]}
                          />
                          <View
                            style={[
                              tw`absolute top-0 left-0 w-26 h-26 rounded-full border-8`,
                              {
                                borderColor: '#EF4444',
                                borderTopColor: 'transparent',
                                borderLeftColor: 'transparent',
                                transform: [{ rotateZ: `${(healthyPercentage + atRiskPercentage) * 3.6 + 180}deg` }],
                              },
                            ]}
                          />
                          <View style={tw`absolute flex items-center justify-center`}>
                            <Text style={tw`text-white text-2xl font-bold`}>
                              {formatNumber(farmOverview.chickens)}
                            </Text>
                            <Text style={tw`text-white/80 text-xs`}>chickens</Text>
                          </View>
                        </View>
                      </Animated.View>

                      <View style={tw`flex-1 ml-5`}>
                        <View style={tw`flex-row items-center mb-3`}>
                          <View style={tw`w-3 h-3 rounded-full bg-green-500 mr-2`} />
                          <Text style={tw`text-white text-base font-medium`}>Healthy:</Text>
                          <Text style={tw`text-white font-bold ml-auto`}>{farmOverview.healthy}</Text>
                        </View>
                        <View style={tw`flex-row items-center mb-3`}>
                          <View style={tw`w-3 h-3 rounded-full bg-yellow-500 mr-2`} />
                          <Text style={tw`text-white text-base font-medium`}>At Risk:</Text>
                          <Text style={tw`text-white font-bold ml-auto`}>{farmOverview.atRisk}</Text>
                        </View>
                        <View style={tw`flex-row items-center`}>
                          <View style={tw`w-3 h-3 rounded-full bg-red-500 mr-2`} />
                          <Text style={tw`text-white text-base font-medium`}>Sick:</Text>
                          <Text style={tw`text-white font-bold ml-auto`}>{farmOverview.sick}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Quick Action Buttons */}
                    <View style={tw`flex-row justify-between z-10 relative`}>
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
                          style={tw`bg-white/20 rounded-xl py-3 px-4 flex-row items-center justify-center border border-white/30 flex-1 mr-3 shadow-md`}
                          onPress={() => handleNavigation('FarmDetails')}
                        >
                          <Ionicons name="analytics-outline" size={18} color="white" style={tw`mr-2`} />
                          <Text style={tw`text-white font-semibold`}>Analytics</Text>
                        </TouchableOpacity>
                      </Animated.View>

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
                          style={tw`bg-white/20 rounded-xl py-3 px-4 flex-row items-center justify-center border border-white/30 flex-1 shadow-md`}
                          onPress={() => handleNavigation('AddChicken')}
                        >
                          <Ionicons name="add-circle-outline" size={18} color="white" style={tw`mr-2`} />
                          <Text style={tw`text-white font-semibold`}>Add Chicken</Text>
                        </TouchableOpacity>
                      </Animated.View>
                    </View>
                  </View>
                </SharedElement>
              </Animated.View>

              {/* Weather & Tools Row */}
              <View style={tw`flex-row justify-between mb-6`}>
                {/* Weather Preview */}
                <Animated.View
                  style={[
                    tw`flex-1 mr-3 rounded-3xl overflow-hidden shadow-lg border border-gray-100`,
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
                  <TouchableOpacity
                    style={tw`bg-white p-4 h-full`}
                    onPress={() => handleNavigation('WeatherCheck')}
                    activeOpacity={0.9}
                  >
                    <View style={tw`flex-row items-center justify-between mb-3`}>
                      <Text style={tw`text-gray-800 font-semibold`}>Weather</Text>
                      <Ionicons name={getWeatherIcon(weatherPreview.condition)} size={24} color="#EF4444" />
                    </View>
                    <View style={tw`items-center`}>
                      <Text style={tw`text-3xl font-bold text-gray-800`}>{weatherPreview.temp}°</Text>
                      <Text style={tw`text-gray-500 text-sm`}>{weatherPreview.humidity}% humidity</Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>

                {/* Stool Analysis Quick Access */}
                <Animated.View
                  style={[
                    tw`flex-1 rounded-3xl overflow-hidden shadow-lg border border-gray-100`,
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
                  <TouchableOpacity
                    style={tw`bg-white p-4 h-full justify-between`}
                    onPress={() => handleNavigation('StoolAnalysis')}
                    activeOpacity={0.9}
                  >
                    <View style={tw`flex-row items-center justify-between`}>
                      <Text style={tw`text-gray-800 font-semibold`}>Quick Scan</Text>
                      <Ionicons name="scan-outline" size={24} color="#EF4444" />
                    </View>
                    <View style={tw`bg-gray-50 rounded-xl p-3 mt-2 border border-gray-100`}>
                      <Text style={tw`text-gray-800 text-xs text-center`}>Tap to analyze stool samples</Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              </View>

              {/* Health Monitoring Section */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-2xl font-bold text-gray-900 mb-4`}>Health Tools</Text>

                {[
                  {
                    title: 'Stool Analysis',
                    description: 'Scan and analyze chicken stool samples',
                    icon: 'microscope-outline',
                    path: 'StoolAnalysis',
                    bgColor: 'bg-purple-50',
                    iconColor: 'text-purple-600',
                    borderColor: 'border-purple-100',
                  },
                  {
                    title: 'Chat with AI',
                    description: 'Get smart recommendations from our AI assistant',
                    icon: 'chatbox-ellipses-outline',
                    path: 'ChatWithAI',
                    bgColor: 'bg-blue-50',
                    iconColor: 'text-blue-600',
                    borderColor: 'border-blue-100',
                  },
                  {
                    title: 'Find Pharmacies',
                    description: 'Locate veterinary pharmacies nearby',
                    icon: 'location-outline',
                    path: 'Pharmacies',
                    bgColor: 'bg-green-50',
                    iconColor: 'text-green-600',
                    borderColor: 'border-green-100',
                  },
                ].map((item, index) => (
                  <Animated.View
                    key={item.title}
                    style={[
                      tw`mb-3`,
                      {
                        opacity: cardAnim,
                        transform: [
                          {
                            translateY: cardAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [10 * (index + 1), 0],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={tw`flex-row items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100`}
                      onPress={() => handleNavigation(item.path)}
                      activeOpacity={0.7}
                    >
                      <View style={tw`${item.bgColor} p-3 rounded-xl mr-4 ${item.borderColor} border`}>
                        <Ionicons name={item.icon} size={24} color={item.iconColor.replace('text-', '')} />
                      </View>
                      <View style={tw`flex-1`}>
                        <Text style={tw`text-gray-900 font-semibold text-lg`}>{item.title}</Text>
                        <Text style={tw`text-gray-500 text-sm`}>{item.description}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={22} color="#6B7280" />
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>

              {/* Recent Activity Section */}
              <View style={tw`mb-6`}>
                <View style={tw`flex-row justify-between items-center mb-4`}>
                  <Text style={tw`text-2xl font-bold text-gray-900`}>Recent Activity</Text>
                  <TouchableOpacity>
                    <Text style={tw`font-medium text-[#EF4444]`}>See all</Text>
                  </TouchableOpacity>
                </View>

                <View style={tw`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden`}>
                  {[
                    {
                      title: 'Added new chicken',
                      time: '2 hours ago',
                      icon: 'add-circle-outline',
                      iconBg: 'bg-green-100',
                      iconColor: '#10B981',
                    },
                    {
                      title: 'Updated feeding schedule',
                      time: 'Yesterday',
                      icon: 'calendar-outline',
                      iconBg: 'bg-blue-100',
                      iconColor: '#3B82F6',
                    },
                    {
                      title: 'Detected sick chicken',
                      time: '2 days ago',
                      icon: 'medkit-outline',
                      iconBg: 'bg-red-100',
                      iconColor: '#EF4444',
                    },
                  ].map((activity, index, array) => (
                    <View key={activity.title}>
                      <View style={tw`flex-row items-center p-4`}>
                        <View style={tw`${activity.iconBg} p-2 rounded-full mr-3`}>
                          <Ionicons name={activity.icon} size={18} color={activity.iconColor} />
                        </View>
                        <View style={tw`flex-1`}>
                          <Text style={tw`text-gray-900 font-medium`}>{activity.title}</Text>
                          <Text style={tw`text-gray-500 text-xs`}>{activity.time}</Text>
                        </View>
                      </View>
                      {index < array.length - 1 && <View style={tw`h-px bg-gray-100 ml-12`} />}
                    </View>
                  ))}
                </View>
              </View>
            </Animated.View>
          </Animated.ScrollView>

          {/* Bottom Navigation Bar */}
          <Animated.View
            style={[
              tw`absolute bottom-0 left-0 right-0 py-4 px-2 z-10`,
              {
                opacity: navAnim,
                transform: [
                  {
                    translateY: navAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <BlurView intensity={Platform.OS === 'ios' ? 60 : 40} tint="light" style={tw`absolute inset-0 rounded-t-3xl`}>
              <View style={tw`flex-1 bg-white/70 rounded-t-3xl border-t border-gray-200/50`} />
            </BlurView>

            <View style={tw`flex-row justify-around items-center px-4`}>
              {[
                { name: 'Home', icon: 'home', path: 'Home', isActive: true },
                { name: 'Devices', icon: 'hardware-chip-outline', path: 'Pairing' },
                { name: null, icon: 'add', path: 'AddMenu', isPrimary: true },
                { name: 'Activity', icon: 'pulse-outline', path: 'Activity' },
                { name: 'Profile', icon: 'person-outline', path: 'Profile' },
              ].map((item, index) => (
                <TouchableOpacity
                  key={item.name || `tab-${index}`}
                  onPress={() => handleNavigation(item.path)}
                  style={tw`${item.isPrimary ? '-mt-6' : ''} items-center relative`}
                  activeOpacity={0.8}
                >
                  {item.isPrimary ? (
                    <Animated.View
                      style={{
                        transform: [
                          {
                            scale: buttonAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.8, 1],
                            }),
                          },
                        ],
                      }}
                    >
                      <View style={tw`w-14 h-14 rounded-full shadow-lg items-center justify-center border-2 border-white bg-[#EF4444]`}>
                        <BlurView intensity={20} tint="light" style={tw`absolute inset-0 rounded-full`} />
                        <Ionicons name={item.icon} size={30} color="#FFFFFF" style={tw`z-10`} />
                      </View>
                    </Animated.View>
                  ) : (
                    <>
                      <View style={tw`${item.isActive ? `bg-[#EF4444]/10 p-2 rounded-full` : 'p-2'}`}>
                        <Ionicons
                          name={item.isActive ? item.icon.replace('-outline', '') : item.icon}
                          size={24}
                          color={item.isActive ? '#EF4444' : '#6B7280'}
                        />
                      </View>
                      <Text
                        style={tw`text-xs mt-1 ${item.isActive ? `text-[#EF4444] font-medium` : 'text-gray-600'}`}
                      >
                        {item.name}
                      </Text>
                      {!item.isActive && index % 2 === 0 && (
                        <Animated.View
                          style={{
                            opacity: navAnim,
                            transform: [
                              {
                                scale: navAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, 1],
                                }),
                              },
                            ],
                          }}
                        >
                          <View style={tw`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] items-center justify-center`}>
                            <Text style={tw`text-white text-xs font-bold`}>1</Text>
                          </View>
                        </Animated.View>
                      )}
                    </>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}
