import { Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import tw from "twrnc"
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProps } from "@/interfaces/Navigation";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function BottomNavigation() {
    const router = useNavigation<NavigationProps>()
    const route = useRoute()
    const [role, setRole] = useState('')

    useEffect(() => {
        const fetchRole = async () => {
            const loadedRole = await AsyncStorage.getItem('role')
            setRole(loadedRole || '')
        }
        fetchRole()
    }, [])

    //check if is current page w
    const isCurrentScreen = (name: string) => {
        const currentpage = route.name
        return name == currentpage
    }

    const handleHomeNavigation = () => {
        if (role == 'farmer') router.navigate('Farmer')
        else if (role == 'veterinary') router.navigate('Veterinary')
    }
    return (
        <>
            {/* Bottom Navigation Bar */}
            <View style={tw`absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white py-3 border-t border-gray-100 shadow-md rounded-t-2xl `
            }>
                <TouchableOpacity onPress={handleHomeNavigation} style={tw`items-center `}>
                    <View style={tw`w-12 h-12 rounded-full items-center justify-center  ${isCurrentScreen('FarmerHome') || isCurrentScreen('VeterinaryHome') ? ' bg-orange-600 shadow-md' : 'black'}`}>
                        <Ionicons name="home" size={28} color={`${isCurrentScreen('FarmerHome') || isCurrentScreen('VeterinaryHome') ? 'white' : 'black'}`} />
                    </View>
                    <Text style={tw`text-xs text-gray-900 font-medium tracking-wide mt-1`}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.navigate('Bluetooth_Pairing')} style={tw`items-center`}>
                    <View style={tw`w-12 h-12 rounded-full items-center justify-center  ${isCurrentScreen('Pairing') ? ' bg-orange-600 shadow-md' : 'black'}`}>
                        <Ionicons name="hardware-chip" size={28} color={`${isCurrentScreen('Pairing') ? 'white' : 'black'}`} />
                    </View>
                    <Text style={tw`text-xs text-gray-900 font-medium tracking-wide mt-1`}>Devices</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.navigate('News')} style={tw`items-center`}>
                    <View style={tw`w-12 h-12 rounded-full items-center justify-center  ${isCurrentScreen('News') ? ' bg-orange-600 shadow-md' : 'black'}`}>
                        <Ionicons name="newspaper" size={28} color={`${isCurrentScreen('News') ? 'white' : 'black'}`} />
                    </View>
                    <Text style={tw`text-xs text-gray-900 font-medium tracking-wide mt-1`}>News</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.navigate('Settings')} style={tw`items-center`}>
                    <View style={tw`w-12 h-12 rounded-full items-center justify-center  ${isCurrentScreen('Settings') ? ' bg-orange-600 shadow-md' : 'black'}`}>
                        <Ionicons name="settings" size={28} color={`${isCurrentScreen('Settings') ? 'white' : 'black'}`} />
                    </View>
                    <Text style={tw`text-xs text-gray-900 font-medium tracking-wide mt-1`}>Settings</Text>
                </TouchableOpacity>
            </View >
        </>
    )
}