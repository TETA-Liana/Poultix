import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen'; 
import ForgotPassword from  './screens/ForgotPassword';// If you have this screen
import MainReasonScreen from './app/screens/home-screen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Test" component={MainReasonScreen} />       
      </Stack.Navigator>
    </NavigationContainer>
  );
}