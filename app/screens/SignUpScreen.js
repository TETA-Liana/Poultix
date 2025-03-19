import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import images correctly
import GoogleIcon from '../../assets/google-icon.png';
import AppleIcon from '../../assets/apple-icon.png';

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-6 pt-10">
            {/* Background curve - simplified version */}
            <View style={{ position: 'absolute', top: 0, right: 0, width: 160, height: 160, opacity: 0.1 }}>
              <View style={{ width: 240, height: 240, borderWidth: 1, borderColor: '#D3D3D3', borderRadius: 120, position: 'absolute', right: -40, top: -40 }} />
            </View>
            
            {/* Header */}
            <View className="mt-8 mb-10">
              <Text className="text-2xl font-semibold">
                Create a <Text className="text-red-500">Poultix</Text> account
              </Text>
            </View>
            
            {/* Form */}
            <View className="space-y-4">
              {/* Full Name Input */}
              <View className="border-b border-gray-200 py-2">
                <TextInput
                  className="text-base text-gray-800"
                  placeholder="Full name"
                  placeholderTextColor="#A0A0A0"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
              
              {/* Email Input */}
              <View className="border-b border-gray-200 py-2">
                <TextInput
                  className="text-base text-gray-800"
                  placeholder="Email"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              
              {/* Password Input */}
              <View className="border-b border-gray-200 py-2 flex-row items-center justify-between">
                <TextInput
                  className="text-base text-gray-800 flex-1"
                  placeholder="Password"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={24} 
                    color="#A0A0A0" 
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Sign Up Button */}
            <TouchableOpacity 
              className="bg-red-500 rounded-md py-4 mt-8"
              onPress={() => console.log('Sign Up pressed')}
            >
              <Text className="text-white text-center font-semibold text-base">
                Sign Up
              </Text>
            </TouchableOpacity>
            
            {/* OR Divider */}
            <View className="flex-row items-center mt-6">
              <View style={{ flex: 1, height: 1, backgroundColor: '#D3D3D3' }} />
              <Text style={{ marginHorizontal: 10, color: '#A0A0A0' }}>or</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: '#D3D3D3' }} />
            </View>
            
            {/* Social Sign Up */}
            <View className="flex-row justify-center space-x-8 mt-6">
              <TouchableOpacity 
                className="w-12 h-12 border border-gray-200 rounded-md items-center justify-center"
                onPress={() => console.log('Google Sign Up')}
              >
                <Image 
                  source={GoogleIcon} 
                  className="w-6 h-6"
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="w-12 h-12 border border-gray-200 rounded-md items-center justify-center"
                onPress={() => console.log('Apple Sign Up')}
              >
                <Image 
                  source={AppleIcon} 
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
            
            {/* Sign In Link */}
            <View className="flex-row justify-center mt-8 mb-6">
              <Text className="text-gray-500">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text className="text-red-500 font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
