import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc"
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function TopNavigation() {
    const router = useNavigation()
    const route = useRoute()
    const handleBack = () => {
        router.goBack()
    }
    return (
        <>
            <View style={tw`absolute top-0 left-0 right-0 flex-row justify-between px-5 items-center bg-white/98 pt-10 pb-5 z-5`}>
                {/* Back Button (Top-Left, Small) */}
                <TouchableOpacity
                    onPress={handleBack}
                    style={tw`items-center  bg-red-500  rounded-full p-2 shadow-xl`}
                >
                    <Ionicons name="arrow-back" size={20} color="white" />
                </TouchableOpacity>
                <Text style={tw`font-bold text-2xl`}>
                    {route.name}
                </Text>
                <TouchableOpacity
                    onPress={handleBack}
                    style={tw`items-center   rounded-full `}
                >
                    <Ionicons name="menu" size={25} color="black" />
                </TouchableOpacity>

            </View>
        </>
    )
}