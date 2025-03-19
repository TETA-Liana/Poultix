import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
    VerifyCode: undefined;
    VerifyYou: undefined;
    GoogleSignIn: undefined;
    Home: undefined;
    News: undefined;
    AiScreen: undefined;
    BtSettings: undefined;
    BtResult: undefined;
    Pairing: undefined;
    FarmerHome: undefined;
    FarmOverview: { farmId: number }; // Example with parameters
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
