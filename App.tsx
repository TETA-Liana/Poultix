import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/home/Home';
import News from './components/home/News';
import AiScreen from './components/ai/AiScreen';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import VerifyCode from './components/auth/VerifyCode';
import GoogleSignIn from './components/auth/GoogleSignIn';
import BtSettings from './components/bluetooth/BtSettings';
import BtResult from './components/bluetooth/BtResult';
import Pairing from './components/bluetooth/Pairing';
import FarmerHome from './components/farmer/FarmerHome';
import FarmOverview from './components/farmer/FarmOverview';
import ChickenPHReadingsScreen from './components/bluetooth/phreadings';
import SettingsScreen from './components/home/Settings';
import CreateNewPasswordScreen from './components/auth/CreateNewPassword';

const Stack = createStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Authentication Screens */}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
        <Stack.Screen name="GoogleSignIn" component={GoogleSignIn} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />


        {/* Home Screens */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

        {/* AI Screen */}
        <Stack.Screen name="AiScreen" component={AiScreen} />

        {/* Bluetooth Screens */}
        <Stack.Screen name="BtSettings" component={BtSettings} />
        <Stack.Screen name="BtResult" component={BtResult} />
        <Stack.Screen name="Pairing" component={Pairing} />
        <Stack.Screen name="PhReader" component={ChickenPHReadingsScreen}/>

        {/* Farmer Screens */}
        <Stack.Screen name="FarmerHome" component={FarmerHome} />
        <Stack.Screen name="FarmOverview" component={FarmOverview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
