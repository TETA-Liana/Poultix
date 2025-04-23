import { StackNavigationProp } from '@react-navigation/stack';
import { Device } from './Bluetooth';

export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
    VerifyCode: { email: string };
    VerifyYou: undefined;
    GoogleSignIn: undefined;
    Home: undefined;
    News: undefined;
    AiScreen: undefined;
    Bluetooth_Setting: undefined;
    Bluetooth_Result: { devices: Device[]|null };
    Bluetooth_Pairing: undefined;
    Farmer: undefined;
    Farm: undefined;
    Ph_Reader: undefined;
    Settings: undefined;
    CreateNewPassword: undefined;
    NetworkError: undefined;
    Testing: undefined;
    Veterinary: undefined
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
