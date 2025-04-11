import { SafeAreaView, Text, Touchable, TouchableOpacity, View } from "react-native";
import tw from 'twrnc'
export default function Testing() {
    const test = () => {
        console.log('aaaaaaa')
        
    }
    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <View style={tw`flex-1 bg-white p-20 `}>
                <Text style={tw`text-gray-500 text-sm`}>Trust your feelings, be a good human being</Text>
                <TouchableOpacity style={tw`bg-black p-10 rounded-2xl`} onPress={test}>
                    <Text style={tw`text-white font-semibold text-xl`}>Test bluetooth</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}