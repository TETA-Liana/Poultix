import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

export default function AIFrontScreen() {
    const router = useRouter();

    // State for the user question
    const [question, setQuestion] = useState('What is the latest news in poultry farming?');

    // Handle navigation to conversation with selected style
    const handleStyleSelect = (style: string) => {
        router.push({
            pathname: '/screens/ai-front',
            params: { style, question }, // Pass selected style and question to conversation screen
        });
    };

    // Handle navigation to ask a new question
    const handleAskQuestion = () => {
        if (question.trim()) {
            router.push({
                pathname: '/screens/ai-conversation',
                params: { style: 'Balanced', question }, // Default to Balanced style
            });
        }
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <StatusBar hidden />
            <View style={tw`flex-1 px-5 pt-5`}>
                {/* Header */}
                <View style={tw`flex-row items-center justify-between mb-4`}>
                    <View style={tw`flex-row items-center`}>
                        <Ionicons name="person-circle-outline" size={24} color="#6B7280" />
                        <View style={tw`ml-2`}>
                            <Text style={tw`text-gray-900 text-sm font-semibold`}>Good Morning 🌞</Text>
                            <Text style={tw`text-gray-500 text-xs`}>Komari Gaspari</Text>
                        </View>
                    </View>
                    <Text style={tw`text-gray-500 text-xs`}>09:41</Text>
                </View>

                {/* Welcome Message */}
                <View style={tw`mb-6`}>
                    <Text style={tw`text-gray-900 text-lg font-bold mb-2`}>Welcome to Chat Farm Ai</Text>
                    <Text style={tw`text-gray-600 text-sm`}>
                        Use the power of AI to find answers from the web, create written content, and more.
                    </Text>
                    <TouchableOpacity>
                        <Text style={tw`text-blue-500 text-sm mt-1`}>Vets near me?</Text>
                    </TouchableOpacity>
                </View>

                {/* User Question */}
                <View style={tw`bg-red-100 rounded-lg p-3 mb-6 yellow-600`}>
                    <Text style={tw`text-red-700 text-base`}>{question}</Text>
                </View>

                {/* Conversation Style Selection */}
                <View style={tw`mb-6`}>
                    <Text style={tw`text-gray-900 text-sm font-semibold mb-2`}>Choose a conversation style</Text>
                    <View style={tw`flex-row justify-between`}>
                        <TouchableOpacity
                            onPress={() => handleStyleSelect('Creative')}
                            style={tw`bg-yellow-600 rounded-lg px-4 py-2`}
                        >
                            <Text style={tw`text-white text-sm font-medium`}>Creative</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleStyleSelect('Balanced')}
                            style={tw`bg-yellow-600 rounded-lg px-4 py-2`}
                        >
                            <Text style={tw`text-white text-sm font-medium`}>Balanced</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleStyleSelect('Precise')}
                            style={tw`bg-yellow-600 rounded-lg px-4 py-2`}
                        >
                            <Text style={tw`text-white text-sm font-medium`}>Precise</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Chatbot Response */}
                <View style={tw`bg-gray-100 rounded-lg p-3 mb-6`}>
                    <View style={tw`flex-row items-center mb-2`}>
                        <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
                        <Text style={tw`text-gray-600 text-sm ml-2`}>Hello</Text>
                    </View>
                    <Text style={tw`text-gray-900 text-base`}>
                        Hello! This is... How can I help you today? 😊
                    </Text>
                    <Text style={tw`text-gray-500 text-xs mt-1`}>1 of 5 • 🌟</Text>
                </View>

                {/* User Input Area */}
                <View style={tw`flex-row items-center bg-gray-100 rounded-lg p-2 mb-6`}>
                    <View style={tw`flex-1 mr-2`}>
                        <TextInput
                            style={tw`text-gray-900 text-base p-2`}
                            value={question}
                            onChangeText={setQuestion}
                            placeholder="Ask me anything..."
                            placeholderTextColor="#6B7280"
                        />
                    </View>
                    <TouchableOpacity onPress={handleAskQuestion}>
                        <Ionicons name="send" size={24} color="#6B7280" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="mic" size={24} color="#6B7280" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
