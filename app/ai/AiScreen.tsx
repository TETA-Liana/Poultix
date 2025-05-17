import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Animated,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import TopNavigation from '../navigation/TopNavigation';

export default function AIFrontScreen() {
    const router = useRouter();
    const [question, setQuestion] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    // Animation effect on mount
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                tension: 60,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleStyleSelect = (style: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const handleAskQuestion = () => {
        if (question.trim()) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push({
                pathname: '/screens/ai-conversation',
                params: { style: 'Balanced', question },
            });
        }
    };

    return (
        <SafeAreaView style={tw`flex-1`}>
           <TopNavigation/>
            <LinearGradient
                colors={['#F9FAFB', '#E5E7EB']}
                style={tw`flex-1`}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={tw`flex-1`}
                >
                    <View style={tw`flex-1 px-4 pt-6 pb-4`}>


                        {/* Welcome Message */}
                        <Animated.View
                            style={[tw`mb-8`, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
                        >
                            <Text style={tw`text-gray-900 text-xl font-bold mb-2 tracking-tight`}>
                                Chat Farm AI
                            </Text>
                            <Text style={tw`text-gray-600 text-base leading-6`}>
                                Ask about poultry farming, find vets, or explore AI-powered insights.
                            </Text>
                            <TouchableOpacity onPress={() => handleAskQuestion()}>
                                <Text style={tw`text-blue-500 text-base mt-2 font-medium`}>
                                    Vets near me?
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>

                        {/* User Question (Chat Bubble) */}
                        <Animated.View
                            style={[
                                tw`max-w-[75%] bg-blue-500 rounded-2xl p-4 mb-6 ml-auto relative`,
                                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                            ]}
                        >
                            <Text style={tw`text-white text-base`}>
                                Hello there! Can you help me today?
                            </Text>
                            {/* Bubble Tail */}

                        </Animated.View>



                        {/* AI Response (Chat Bubble) */}
                        <Animated.View
                            style={[
                                tw`max-w-[75%] bg-gray-200 rounded-2xl p-4 mb-6 mr-auto relative`,
                                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                            ]}
                        >
                            <View style={tw`flex-row items-center mb-2`}>
                                <Ionicons name="chatbubble-outline" size={20} color="#4B5563" />
                                <Text style={tw`text-gray-600 text-sm ml-2 font-medium`}>AI Assistant</Text>
                            </View>
                            <Text style={tw`text-gray-900 text-base leading-6`}>
                                Hello! I'm here to help with your farming queries. What's on your mind? 😊
                            </Text>
                            <Text style={tw`text-gray-500 text-xs mt-2`}>1 of 5 • 🌟</Text>
                            {/* Bubble Tail */}
                            <View
                                style={tw`absolute bottom-0 left-[-8px] w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-gray-200 border-b-[8px] border-b-transparent`}
                            />
                        </Animated.View>
                    </View>

                    {/* Input Area */}
                    <Animated.View
                        style={[
                            tw`px-4 pb-4`,
                            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                        ]}
                    >
                        <View
                            style={tw`flex-row items-center bg-white rounded-full p-3 shadow-lg border border-gray-200`}
                        >
                            <TextInput
                                style={tw`flex-1 text-gray-900 text-base px-3 py-2`}
                                value={question}
                                onChangeText={setQuestion}
                                placeholder="Ask me anything..."
                                placeholderTextColor="#6B7280"
                            />
                            <TouchableOpacity
                                onPress={handleAskQuestion}
                                style={tw`p-2`}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="send" size={24} color="#3B82F6" />
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`p-2`} activeOpacity={0.7}>
                                <Ionicons name="mic" size={24} color="#3B82F6" />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    );
}