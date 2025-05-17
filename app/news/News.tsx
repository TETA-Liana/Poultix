import React from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useRouter } from 'expo-router'
import tw from 'twrnc'
import NewsComponent from '@/components/news/BodyNews'
import StatusNews from '@/components/news/HeadNews'

export default function News() {
  const router = useRouter()

  return (
    <View style={tw`flex-1 bg-white px-4 gap-y-4`}>
      <View style={tw`flex-row justify-between items-center p-5`}>
        <View>
          <Text style={tw`font-semibold`}>Breaking new</Text>
        </View>
        <TouchableOpacity >
          <Text style={tw`text-orange-600`}>View all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={tw`flex flex-col gap-y-4`}  >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <StatusNews />
        </ScrollView>
        <NewsComponent />
        <NewsComponent />
        <NewsComponent />
        <NewsComponent />
        <NewsComponent />
      </ScrollView>

    </View>
  )
}
