import { StackNavigationProp } from '@react-navigation/stack';

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
    BtSettings: undefined;
    BtResult: undefined;
    Pairing: undefined;
    FarmerHome: undefined;
    FarmOverview: undefined;
    PhReader:undefined
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
