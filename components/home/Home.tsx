import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    FlatList,
    Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

interface Option {
    label: string;
    screen: string;
    color: string;
    icon: keyof typeof Ionicons.glyphMap;
}

const options: Option[] = [
    { label: 'Veterinary Help', screen: 'Veterinary', color: '#DCFCE7', icon: 'medkit-outline' },
    { label: 'Pharmacies', screen: 'Pharmacy', color: '#E0F2FE', icon: 'medkit' },
    { label: 'Health News', screen: 'News', color: '#FEF9C3', icon: 'newspaper-outline' },
    { label: 'Settings', screen: 'Settings', color: '#FCE7F3', icon: 'settings-outline' },
    { label: 'Farm', screen: 'Farm', color: '#EDE9FE', icon: 'paw-outline' },
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            tension: 80,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleOptionPress = (screen: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate(screen as never);
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-gray-100`}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={tw`flex-1`}
            >
                <View style={tw`flex-1 px-6`}>
                    <Text style={tw`text-4xl font-bold mt-10 mb-2 text-gray-800`}>
                        Hello 👋
                    </Text>
                    <Text style={tw`text-lg text-gray-600 mb-8`}>
                        Choose a service below
                    </Text>

                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <FlatList
                            data={options}
                            numColumns={2}
                            keyExtractor={(item) => item.label}
                            contentContainerStyle={tw`pb-20`}
                            columnWrapperStyle={tw`justify-between`}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => handleOptionPress(item.screen)}
                                    style={[
                                        tw`rounded-2xl p-5 mb-6 w-[47%] items-center`,
                                        { backgroundColor: item.color }
                                    ]}
                                >
                                    <View style={tw`bg-white p-4 rounded-full mb-4 shadow-md`}>
                                        <Ionicons name={item.icon} size={28} color="#4B5563" />
                                    </View>
                                    <Text style={tw`text-base font-semibold text-center text-gray-700`}>
                                        {item.label}
                                    </Text>
                                </Pressable>
                            )}
                        />
                    </Animated.View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default HomeScreen;
