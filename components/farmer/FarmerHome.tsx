import { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    Animated,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/interfaces/Navigation';
import axios from 'axios';
import hostConfig from '@/config/hostConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FarmerData {
    _id: string,
    email: string,
    names: string
}

export default function FarmerScreen() {
    const router = useNavigation<NavigationProps>()
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [farmerData, setFarmerData] = useState<FarmerData | null>(null)
    const [farmData, setFarmData] = useState()

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);


    useEffect(() => {
        const fetchFarmerData = async () => {
            try {
                const token = await AsyncStorage.getItem('token')
                const response = await axios.get(hostConfig.host + '/loggedInFarmer', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                setFarmerData(response.data)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (!error.response) {
                        Alert.alert('Network Error', 'Please try again later')
                        return
                    }
                    if (error.response.status == 401) {
                        await AsyncStorage.removeItem('token')
                        router.navigate('SignIn')
                        return
                    }
                    Alert.alert('Error', error.response.data.message)
                }
            }
        }
        fetchFarmerData()
    }, [])

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <StatusBar style="dark" backgroundColor="transparent" translucent />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Animated.View style={[tw`flex-1 px-5 pt-12 pb-8`, { opacity: fadeAnim }]}>
                    {/* Profile Section */}
                    <LinearGradient
                        colors={['#F97316', '#EA580C']}
                        style={tw`rounded-2xl p-6 mb-6 shadow-lg`}
                    >
                        <View style={tw`flex-row justify-between items-center`}>
                            <View>
                                <Text style={tw`text-2xl font-extrabold text-white tracking-tight`}>
                                    {farmerData && farmerData.names ? farmerData.names : 'loading'}
                                </Text>
                                <Text style={tw`text-orange-100 text-sm mt-1 font-medium opacity-90`}>
                                    Farmer • Female, 25
                                </Text>
                            </View>
                            <View style={tw`relative`}>
                                <Image
                                    source={{ uri: '/logo.png' }}
                                    style={tw`w-14 h-14 rounded-full border-3 border-white shadow-sm`}
                                />
                                <View style={tw`absolute -bottom-1 -right-1 w-4 h-4 bg-orange-300 rounded-full border-2 border-white`}></View>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Upcoming Schedule Section */}
                    <View style={tw`bg-white rounded-2xl p-5 mb-6 shadow-md border border-orange-100`}>
                        <View style={tw`flex-row justify-between items-center mb-4`}>
                            <Text style={tw`text-xl font-semibold text-gray-800`}>
                                Upcoming Visit
                            </Text>
                            <TouchableOpacity onPress={() => router.navigate('Schedule')}>
                                <Text style={tw`text-orange-600 text-sm font-semibold`}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={tw`flex-row items-center bg-orange-50 p-4 rounded-xl`}>
                            <Image
                                source={{ uri: '/assets/logo.png' }}
                                style={tw`w-12 h-12 rounded-full mr-4 border border-orange-200`}
                            />
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-gray-800 text-base font-semibold`}>
                                    Dr. Patricia Uwimana
                                </Text>
                                <Text style={tw`text-gray-600 text-sm mt-1`}>
                                    Sunday, 27 June 2021
                                </Text>
                                <Text style={tw`text-gray-500 text-xs mt-0.5`}>08:00am - 10:00am</Text>
                            </View>
                            <TouchableOpacity style={tw`p-2 bg-orange-100 rounded-full`}>
                                <Ionicons name="chatbubble-ellipses-outline" size={22} color="#F97316" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Choose Your Location Section */}
                    <View style={tw`mb-6`}>
                        <Text style={tw`text-xl font-semibold text-gray-800 mb-4`}>
                            Select Location
                        </Text>
                        <View style={tw`flex-row gap-3 mb-5`}>
                            {['Byose', 'Kibuye', 'Muhanga'].map((location) => (
                                <TouchableOpacity
                                    key={location}
                                    style={tw`flex-1 bg-white p-4 rounded-xl shadow-sm border border-orange-100 active:bg-orange-50`}
                                    onPress={() => router.navigate('Schedule')}
                                >
                                    <Text style={tw`text-gray-800 text-sm font-semibold text-center`}>
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
                                style={tw`bg-white rounded-xl p-4 mb-3 shadow-sm flex-row items-center border border-orange-100`}
                            >
                                <Image
                                    source={{ uri: '../../assets/logo.png' }}
                                    style={tw`w-12 h-12 rounded-full mr-3 border border-orange-200`}
                                />
                                <View style={tw`flex-1`}>
                                    <Text style={tw`text-gray-800 text-base font-semibold`}>
                                        {doctor.name}
                                    </Text>
                                    <Text style={tw`text-gray-600 text-sm`}>{doctor.location}</Text>
                                </View>
                                <TouchableOpacity style={tw`p-2 bg-orange-50 rounded-full`}>
                                    <Ionicons name="ellipsis-horizontal" size={20} color="#EA580C" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    {/* Weekly Report Section */}
                    <View style={tw`bg-white rounded-2xl p-5 shadow-md border border-orange-100`}>
                        <Text style={tw`text-xl font-semibold text-gray-800 mb-5`}>
                            Weekly Report
                        </Text>
                        <View style={tw`flex-row items-center justify-between`}>
                            <View style={tw`relative items-center justify-center`}>
                                <Animated.View
                                    style={tw`w-28 h-28 rounded-full border-8 border-orange-100`}
                                />
                                <Animated.View
                                    style={tw`absolute top-0 left-0 w-28 h-28 rounded-full border-8 border-orange-500`}
                                />
                                <Text style={tw`absolute text-orange-600 text-2xl font-bold`}>
                                    87%
                                </Text>
                            </View>
                            <View style={tw`space-y-3`}>
                                <View style={tw`flex-row items-center`}>
                                    <View style={tw`w-3 h-3 rounded-full bg-orange-300 mr-2`}></View>
                                    <Text style={tw`text-gray-700 text-sm font-medium`}>Healthy</Text>
                                </View>
                                <View style={tw`flex-row items-center`}>
                                    <View style={tw`w-3 h-3 rounded-full bg-orange-500 mr-2`}></View>
                                    <Text style={tw`text-gray-700 text-sm font-medium`}>At Risk</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}
