import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Animated,
  ScrollView,
  Dimensions,
  RefreshControl
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function VeterinarianScreen() {
  const router = useRouter();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');
  const animatedScale = useRef(new Animated.Value(0.95)).current;
  const [refreshing, setRefreshing] = useState(false);

  // Enhanced sample data
  const scheduleData = [
    { 
      id: '1', 
      farmer: 'Mwiza Anne', 
      appointment: '11.Jan.2025', 
      status: 'done', 
      avatar: null, 
      farmType: 'Poultry',
      location: 'Kigali East'
    },
    { 
      id: '2', 
      farmer: 'Ngarambe Jean', 
      appointment: '23.Feb.2025', 
      status: 'in progress', 
      avatar: null, 
      farmType: 'Dairy',
      location: 'Musanze'
    },
    { 
      id: '3', 
      farmer: 'Kalisa Joie', 
      appointment: '25.Feb.2025', 
      status: 'done', 
      avatar: null, 
      farmType: 'Mixed',
      location: 'Nyagatare'
    },
    { 
      id: '4', 
      farmer: 'Rubaye Darius', 
      appointment: '27.Feb.2025', 
      status: 'done', 
      avatar: null, 
      farmType: 'Cattle',
      location: 'Bugesera'
    },
    { 
      id: '5', 
      farmer: 'Mutoni Sarah', 
      appointment: '03.Mar.2025', 
      status: 'scheduled', 
      avatar: null, 
      farmType: 'Poultry',
      location: 'Huye'
    },
  ];

  // Enhanced stats data with more details
  const statsData = [
    { 
      id: '1', 
      title: 'Farms', 
      count: 20, 
      icon: 'barn', 
      color: '#4F46E5',
      gradient: ['#4338CA', '#6366F1'],
      subtext: '3 new this month',
      growth: '+15%'
    },
    { 
      id: '2', 
      title: 'Vaccines', 
      count: 500, 
      icon: 'needle', 
      color: '#10B981',
      gradient: ['#059669', '#10B981'],
      subtext: '120 units used',
      growth: '-5%'
    },
    { 
      id: '3', 
      title: 'Treatments', 
      count: 152, 
      icon: 'medical-bag', 
      color: '#F59E0B',
      gradient: ['#D97706', '#FBBF24'],
      subtext: '26 this week',
      growth: '+8%'
    },
    { 
      id: '4', 
      title: 'Animals', 
      count: 1250, 
      icon: 'cow', 
      color: '#8B5CF6',
      gradient: ['#7C3AED', '#A78BFA'],
      subtext: '45 new births',
      growth: '+12%'
    },
    { 
      id: '5', 
      title: 'Revenue', 
      count: '$8.2K', 
      icon: 'cash', 
      color: '#EC4899',
      gradient: ['#DB2777', '#F472B6'],
      subtext: 'This month',
      growth: '+22%'
    },
  ];

  // Animation effects
  useEffect(() => {
    startAnimations();
  }, []);

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(animatedScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Reset animations
    animatedValue.setValue(0);
    animatedScale.setValue(0.95);
    
    // Simulate data fetching
    setTimeout(() => {
      startAnimations();
      setRefreshing(false);
    }, 1500);
  };

  const fadeInAnimation = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  const scaleAnimation = {
    transform: [{ scale: animatedScale }]
  };

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  // Handle navigation to disease outbreaks screen
  const handleCheckOutbreaks = () => {
    router.push('screens/disease-outbreaks');
  };

  // Handle navigation when clicking a schedule item
  const handleScheduleItemPress = (itemId) => {
    router.push({
      pathname: 'screens/appointment-details',
      params: { appointmentId: itemId },
    });
  };

  // Render each schedule item with enhanced styling
  const renderScheduleItem = ({ item, index }) => {
    const delay = index * 100;
    
    const itemAnimation = {
      opacity: animatedValue,
      transform: [
        {
          translateX: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
      ],
    };
    
    // Status badge styling
    let statusColor = 'gray-500';
    let statusBg = 'gray-100';
    let statusIcon = 'time-outline';
    
    if (item.status === 'done') {
      statusColor = 'emerald-500';
      statusBg = 'emerald-50';
      statusIcon = 'checkmark-circle';
    } else if (item.status === 'in progress') {
      statusColor = 'amber-500';
      statusBg = 'amber-50';
      statusIcon = 'sync';
    } else if (item.status === 'scheduled') {
      statusColor = 'blue-500';
      statusBg = 'blue-50';
      statusIcon = 'calendar';
    }

    return (
      <Animated.View style={[itemAnimation, { animationDelay: delay }]}>
        <TouchableOpacity
          onPress={() => handleScheduleItemPress(item.id)}
          style={tw`flex-row items-center p-4 mb-3 bg-white rounded-xl shadow-sm border border-gray-100`}
          activeOpacity={0.7}
        >
          {/* Avatar/Initial with shadow */}
          <View style={tw`w-12 h-12 rounded-full bg-indigo-100 mr-4 items-center justify-center shadow-sm`}>
            <Text style={tw`text-indigo-600 font-bold text-lg`}>{item.farmer.charAt(0)}</Text>
          </View>
          
          <View style={tw`flex-1 mr-2`}>
            <Text style={tw`text-gray-900 font-medium text-base`}>{item.farmer}</Text>
            <View style={tw`flex-row items-center mt-1`}>
              <View style={tw`bg-gray-100 rounded-full px-2 py-0.5 mr-2`}>
                <Text style={tw`text-gray-600 text-xs font-medium`}>
                  {item.farmType}
                </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Ionicons name="location-outline" size={10} style={tw`text-gray-400 mr-1`} />
                <Text style={tw`text-gray-400 text-xs`}>
                  {item.location}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={tw`items-end`}>
            <View style={tw`flex-row items-center mb-1`}>
              <Ionicons name="calendar-outline" size={12} style={tw`text-gray-500 mr-1`} />
              <Text style={tw`text-gray-500 text-xs`}>{item.appointment}</Text>
            </View>
            <View style={tw`flex-row items-center px-2.5 py-1 rounded-full ${`bg-${statusBg}`}`}>
              <Ionicons name={statusIcon} size={12} style={tw`text-${statusColor} mr-1`} />
              <Text style={tw`text-${statusColor} text-xs font-medium capitalize`}>
                {item.status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Render each stat card for horizontal scrolling
  const renderStatCard = (item, index) => {
    return (
      <Animated.View 
        key={item.id}
        style={[
          {
            opacity: animatedValue,
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                  delay: index * 150,
                }),
              },
            ],
          }
        ]}
      >
        <TouchableOpacity 
          activeOpacity={0.9}
          style={tw`rounded-xl overflow-hidden shadow-md mr-4 w-36`}
        >
          <LinearGradient
            colors={item.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={tw`p-4 items-center`}
          >
            <View style={tw`w-12 h-12 rounded-full bg-white bg-opacity-25 mb-3 items-center justify-center shadow-sm`}>
              <MaterialCommunityIcons name={item.icon} size={24} color="white" />
            </View>
            
            <Text style={tw`text-2xl font-bold text-white`}>{item.count}</Text>
            <Text style={tw`text-white font-medium mt-1`}>{item.title}</Text>
            
            <View style={tw`bg-white bg-opacity-20 rounded-full px-2 py-1 mt-2 w-full items-center`}>
              <Text style={tw`text-white text-xs`}>{item.subtext}</Text>
            </View>
            
            <View style={tw`flex-row items-center mt-2`}>
              <Ionicons 
                name={item.growth.includes('+') ? 'arrow-up' : 'arrow-down'} 
                size={12} 
                color="white"
                style={tw`mr-1`}
              />
              <Text style={tw`text-white text-xs font-bold`}>{item.growth}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <StatusBar style="dark" />
      <ScrollView 
        style={tw`flex-1`} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4F46E5']} />
        }
      >
        <View style={tw`px-5 pt-5`}>
          {/* Header with Profile */}
          <Animated.View style={[tw`flex-row justify-between items-center mb-6`, fadeInAnimation]}>
            <View>
              <Text style={tw`text-2xl font-bold text-gray-800`}>Mwiza Ange</Text>
              <View style={tw`flex-row items-center mt-1`}>
                <Ionicons name="medical" size={14} color="#0891b2" style={tw`mr-1`} />
                <Text style={tw`text-cyan-600 font-medium`}>Veterinarian</Text>
                <View style={tw`h-1.5 w-1.5 rounded-full bg-gray-300 mx-2`} />
                <Text style={tw`text-gray-500 text-xs`}>Kigali, Rwanda</Text>
              </View>
            </View>
            
            <TouchableOpacity>
              <LinearGradient
                colors={['#4F46E5', '#6366F1']}
                style={tw`w-14 h-14 rounded-full items-center justify-center shadow-lg`}
              >
                <Text style={tw`text-white font-bold text-lg`}>MA</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Welcome Card */}
          <Animated.View style={[fadeInAnimation, tw`mb-6`]}>
            <LinearGradient
              colors={['#4F46E5', '#818CF8']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={tw`rounded-2xl p-5 shadow-lg`}
            >
              <View style={tw`flex-row justify-between`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-white text-opacity-90 text-sm mb-1`}>Today's Schedule</Text>
                  <Text style={tw`text-white font-bold text-xl mb-1`}>5 Appointments</Text>
                  <Text style={tw`text-white text-opacity-80 text-xs mb-4`}>
                    Next: Ngarambe Jean at 10:30 AM
                  </Text>
                  
                  <TouchableOpacity
                    style={tw`bg-white bg-opacity-20 self-start rounded-lg px-4 py-2 mt-2`}
                    activeOpacity={0.8}
                  >
                    <Text style={tw`text-white font-medium text-sm`}>View Schedule</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={tw`justify-center items-center`}>
                  <View style={tw`w-16 h-16 rounded-full bg-white bg-opacity-20 items-center justify-center`}>
                    <Ionicons name="calendar" size={30} color="#fff" />
                  </View>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Enhanced Stats Cards Section - Horizontal Scrolling */}
          <Animated.View style={[fadeInAnimation, tw`mb-6`]}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-lg font-semibold text-gray-800`}>Dashboard Overview</Text>
              <TouchableOpacity style={tw`flex-row items-center`}>
                <Text style={tw`text-indigo-600 text-sm font-medium mr-1`}>Details</Text>
                <Ionicons name="chevron-forward" size={14} color="#4F46E5" />
              </TouchableOpacity>
            </View>
            
            {/* Horizontal scrolling stats cards */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={tw`pb-2`}
              style={tw`-mx-5 px-5`}
            >
              {statsData.map((item, index) => renderStatCard(item, index))}
            </ScrollView>
            
            {/* Quick Actions Section */}
            <Animated.View style={[tw`bg-white rounded-xl p-4 shadow-sm mb-6 mt-4`, scaleAnimation]}>
              <Text style={tw`text-gray-700 font-medium ml-2 mb-3`}>Quick Actions</Text>
              <View style={tw`flex-row justify-between px-2`}>
                <TouchableOpacity style={tw`items-center w-20`}>
                  <View style={tw`w-12 h-12 rounded-full bg-blue-100 items-center justify-center mb-2 shadow-sm`}>
                    <Ionicons name="calendar-outline" size={22} color="#2563EB" />
                  </View>
                  <Text style={tw`text-gray-600 text-xs text-center font-medium`}>Schedule</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={tw`items-center w-20`}>
                  <View style={tw`w-12 h-12 rounded-full bg-emerald-100 items-center justify-center mb-2 shadow-sm`}>
                    <Ionicons name="medical-outline" size={22} color="#10B981" />
                  </View>
                  <Text style={tw`text-gray-600 text-xs text-center font-medium`}>Treatments</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={tw`items-center w-20`}>
                  <View style={tw`w-12 h-12 rounded-full bg-amber-100 items-center justify-center mb-2 shadow-sm`}>
                    <Ionicons name="document-text-outline" size={22} color="#F59E0B" />
                  </View>
                  <Text style={tw`text-gray-600 text-xs text-center font-medium`}>Reports</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={tw`items-center w-20`}>
                  <View style={tw`w-12 h-12 rounded-full bg-purple-100 items-center justify-center mb-2 shadow-sm`}>
                    <Ionicons name="location-outline" size={22} color="#8B5CF6" />
                  </View>
                  <Text style={tw`text-gray-600 text-xs text-center font-medium`}>Map</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>

          {/* Alert Section */}
          <Animated.View style={[fadeInAnimation, tw`mb-6`]}>
            <LinearGradient
              colors={['#f43f5e', '#e11d48']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={tw`rounded-2xl p-5 shadow-lg`}
            >
              <View style={tw`flex-row items-start mb-3`}>
                <View style={tw`w-12 h-12 rounded-full bg-white bg-opacity-20 items-center justify-center mr-3 shadow-sm`}>
                  <Ionicons name="warning" size={24} color="#fff" />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-white font-bold text-lg`}>Disease Alert</Text>
                  <Text style={tw`text-white text-opacity-80 text-sm mb-4`}>
                    3 potential disease outbreaks detected in Nyagatare region
                  </Text>
                </View>
              </View>
              
              <View style={tw`flex-row justify-between`}>
                <TouchableOpacity
                  style={tw`bg-white bg-opacity-20 rounded-xl py-2.5 px-4 flex-row items-center`}
                  activeOpacity={0.8}
                >
                  <Ionicons name="eye-outline" size={16} color="#fff" style={tw`mr-2`} />
                  <Text style={tw`text-white font-medium`}>View Map</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={handleCheckOutbreaks}
                  style={tw`bg-white rounded-xl py-2.5 px-4 items-center shadow-sm flex-row`}
                  activeOpacity={0.8}
                >
                  <Text style={tw`text-rose-600 font-semibold mr-1`}>View Details</Text>
                  <Ionicons name="chevron-forward" size={14} color="#e11d48" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Schedule Section */}
          <Animated.View style={[fadeInAnimation, tw`bg-white rounded-2xl p-5 shadow-md mb-6`]}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <View>
                <Text style={tw`text-lg font-semibold text-gray-800`}>Upcoming Appointments</Text>
                <Text style={tw`text-gray-500 text-xs`}>You have 5 appointments this week</Text>
              </View>
              <TouchableOpacity style={tw`flex-row items-center`}>
                <Text style={tw`text-indigo-600 font-medium mr-1`}>See All</Text>
                <Ionicons name="chevron-forward" size={14} color="#4F46E5" />
              </TouchableOpacity>
            </View>
            
            {scheduleData.length > 0 ? (
              scheduleData.map((item, index) => renderScheduleItem({ item, index }))
            ) : (
              <View style={tw`py-10 items-center`}>
                <Ionicons name="calendar-outline" size={48} style={tw`text-gray-300 mb-3`} />
                <Text style={tw`text-gray-400`}>No appointments scheduled</Text>
              </View>
            )}
          </Animated.View>

          {/* Farm Health Overview */}
          <Animated.View style={[fadeInAnimation, tw`mb-6`]}>
            <View style={tw`flex-row justify-between items-center mb-3`}>
              <View>
                <Text style={tw`text-lg font-semibold text-gray-800`}>Farm Health Overview</Text>
                <Text style={tw`text-gray-500 text-xs`}>Last updated: Today, 08:30 AM</Text>
              </View>
              <TouchableOpacity style={tw`flex-row items-center`}>
                <Text style={tw`text-indigo-600 text-sm font-medium mr-1`}>Full Report</Text>
                <Ionicons name="chevron-forward" size={14} color="#4F46E5" />
              </TouchableOpacity>
            </View>
            
            <View style={tw`bg-white rounded-xl p-5 shadow-md`}>
              <View style={tw`flex-row items-center mb-5`}>
                <View style={tw`h-4 flex-1 rounded-full bg-gray-100 mr-3 overflow-hidden`}>
                  <View style={tw`h-4 rounded-full bg-emerald-500 w-[70%]`}>
                    <LinearGradient
                      colors={['#10B981', '#34D399']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={tw`h-full w-full`}
                    />
                  </View>
                </View>
                <Text style={tw`text-emerald-600 font-bold text-lg`}>70%</Text>
              </View>
              
              <View style={tw`flex-row justify-between`}>
                <View style={tw`items-center`}>
                  <View style={tw`w-12 h-12 rounded-full bg-emerald-100 items-center justify-center mb-2 shadow-sm`}>
                    <Ionicons name="checkmark" size={20} color="#10B981" />
                  </View>
                  <Text style={tw`text-gray-600 text-xs font-medium`}>Healthy</Text>
                  <Text style={tw`text-gray-800 font-bold text-lg`}>14</Text>
                </View>
                
                <View style={tw`items-center`}>
                  <View style={tw`w-12 h-12 rounded-full bg-amber-100 items-center justify-center mb-2 shadow-sm`}>
                    <Ionicons name="alert" size={20} color="#F59E0B" />
                  </View>
                  <Text style={tw`text-gray-600 text-xs font-medium`}>Monitor</Text>
                  <Text style={tw`text-gray-800 font-bold text-lg`}>4</Text>
                </View>
                
                <View style={tw`items-center`}>
                  <View style={tw`w-12 h-12 rounded-full bg-red-100 items-center justify-center mb-2 shadow-sm`}>
                    <Ionicons name="warning" size={20} color="#EF4444" />
                  </View>
                  <Text style={tw`text-gray-600 text-xs font-medium`}>Critical</Text>
                  <Text style={tw`text-gray-800 font-bold text-lg`}>2</Text>
                </View>
                
                <View style={tw`items-center`}>
                  <View style={tw`w-12 h-12 rounded-full bg-blue-100 items-center justify-center mb-2 shadow-sm`}>
                    <Ionicons name="sync" size={20} color="#3B82F6" />
                  </View>
                  <Text style={tw`text-gray-600 text-xs font-medium`}>Pending</Text>
                  <Text style={tw`text-gray-800 font-bold text-lg`}>3</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View style={[tw`flex-row justify-between mb-8`, fadeInAnimation]}>
            <TouchableOpacity
              style={tw`flex-1 mr-3 shadow-md overflow-hidden rounded-xl`}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4F46E5', '#6366F1']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={tw`py-4 items-center`}
              >
                <Ionicons name="add-circle-outline" size={22} color="#fff" style={tw`mb-1`} />
                <Text style={tw`text-white font-medium`}>New Visit</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleBack}
              style={tw`flex-1 bg-white border border-gray-200 rounded-xl py-4 items-center shadow-sm`}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back-outline" size={22} color="#6B7280" style={tw`mb-1`} />
              <Text style={tw`text-gray-600 font-medium`}>Back</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity
        style={tw`absolute bottom-6 right-6 w-14 h-14 rounded-full shadow-lg items-center justify-center`}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['#4F46E5', '#6366F1']}
          style={tw`w-full h-full rounded-full items-center justify-center`}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
