import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Dimensions,
    ScrollView,
    ImageBackground,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import * as Haptics from 'expo-haptics';
import tw from 'twrnc';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProps } from '@/interfaces/Navigation';

const { width } = Dimensions.get('window');

interface AnimatedCardProps {
    title: string;
    icon: React.ReactNode;
    selected: boolean;
    onPress: () => void;
    delay: number;
    colors: string[];
    secondaryIcon?: React.ReactNode;
    description?: string;
}

const AnimatedCard = ({
    title,
    icon,
    selected,
    onPress,
    delay,
    colors,
    secondaryIcon,
    description
}: AnimatedCardProps) => {
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 600,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.timing(glowAnim, {
                toValue: selected ? 1 : 0.5,
                duration: 600,
                delay: delay,
                useNativeDriver: false,
            }),
        ]).start();
    }, [selected, delay]);

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        onPress();
    };

    const borderGradient = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.4)'],
    });

    return (
        <Animated.View
            style={[
                tw`rounded-3xl overflow-hidden mb-5`,
                {
                    opacity: opacityAnim,
                    shadowColor: colors[0],
                    shadowOpacity: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.1, 0.3],
                    }),
                    shadowRadius: 25,
                    elevation: selected ? 20 : 6,
                },
            ]}
        >
            <TouchableOpacity onPress={handlePress} activeOpacity={1}>
                <LinearGradient
                    colors={selected ? colors : ['#FFFFFF', '#FFF7ED']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={tw`p-6 relative overflow-hidden h-40`}
                >
                    <Animated.View
                        style={[
                            tw`absolute inset-0 rounded-3xl`,
                            { borderWidth: 1.5, borderColor: borderGradient },
                        ]}
                    >
                        <BlurView
                            intensity={selected ? 25 : 8}
                            tint="light"
                            style={tw`flex-1`}
                        />
                    </Animated.View>

                    <View style={tw`relative z-10 flex-1 justify-between`}>
                        <View style={tw`flex-row items-center justify-between`}>
                        <LinearGradient colors={selected ? ['#FFFFFFCC', '#FFFFFF66'] : [`${colors[0]}33`, `${colors[1]}1A`]} style={tw`rounded-full p-3.5 shadow-lg`}>
    {React.cloneElement(icon, { color: selected ? '#FFF' : colors[0] })}
</LinearGradient>

                            {selected && (
                                <View style={tw`bg-white/50 p-2 rounded-full border-2 border-white/70 shadow-md`}>
                                    <Ionicons name="checkmark" size={18} color="white" />
                                </View>
                            )}
                        </View>

                        <View style={tw`mt-2`}>
                            <Text style={tw`text-xl font-extrabold tracking-tight ${selected ? 'text-white' : 'text-gray-900'}`}>
                                {title}
                            </Text>
                            <Text
                                style={tw`text-sm mt-2 ${selected ? 'text-white/90' : 'text-gray-700'} leading-5 font-medium`}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                {description}
                            </Text>
                        </View>
                    </View>

                    {selected && (
                        <>
                            <LinearGradient
                                colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0)']}
                                style={tw`absolute bottom-0 left-0 w-24 h-24 rounded-tr-full`}
                            />
                            <LinearGradient
                                colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0)']}
                                style={tw`absolute top-0 right-0 w-20 h-20 rounded-bl-full`}
                            />
                        </>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default function MainReasonScreen() {
    const router = useNavigation<NavigationProps>();
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const headerAnim = useRef(new Animated.Value(-60)).current;

    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log('Token:', token);
            } catch (error) {
                console.log('Error checking token:', error);
            }
        };
        checkUser();

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 900,
                useNativeDriver: true,
            }),
            Animated.spring(headerAnim, {
                toValue: 0,
                tension: 90,
                friction: 9,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const reasons = [
        {
            id: 'news',
            title: 'Disease Insights',
            description: 'Real-time alerts & research updates',
            colors: ['#EF4444', '#FF6B6B'],
            icon: <Ionicons name="newspaper" size={28} color={selectedReason === 'news' ? '#FFF' : '#EF4444'} />,
            secondaryIcon: <MaterialCommunityIcons name="newspaper-variant" size={52} color="#FFF" />,
        },
        {
            id: 'detection',
            title: 'Early Warning',
            description: 'Detect issues before they escalate',
            colors: ['#5E60CE', '#787CFF'],
            icon: <Ionicons name="eye" size={28} color={selectedReason === 'detection' ? '#FFF' : '#5E60CE'} />,
            secondaryIcon: <MaterialCommunityIcons name="radar" size={52} color="#FFF" />,
        },
        {
            id: 'connecting',
            title: 'Community Hub',
            description: 'Connect with farming experts',
            colors: ['#40C9A2', '#65D4B5'],
            icon: <Ionicons name="people" size={28} color={selectedReason === 'connecting' ? '#FFF' : '#40C9A2'} />,
            secondaryIcon: <MaterialCommunityIcons name="handshake" size={52} color="#FFF" />,
        },
        {
            id: 'veterinarian',
            title: 'Vet Suite',
            description: 'Advanced tools for professionals',
            colors: ['#9B5DE5', '#C68FFF'],
            icon: <Ionicons name="medkit" size={28} color={selectedReason === 'veterinarian' ? '#FFF' : '#9B5DE5'} />,
            secondaryIcon: <MaterialCommunityIcons name="medical-bag" size={52} color="#FFF" />,
        },
        {
            id: 'explore',
            title: 'Discovery Mode',
            description: 'Experience Poultix’s potential',
            colors: ['#00B4D8', '#48CAE4'],
            icon: <Ionicons name="compass" size={28} color={selectedReason === 'explore' ? '#FFF' : '#00B4D8'} />,
            secondaryIcon: <MaterialCommunityIcons name="telescope" size={52} color="#FFF" />,
        },
    ];

    const handleContinue = () => {
        if (!selectedReason) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
            return;
        }
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            router.navigate("Home");
        });
    };

    const handleBack = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => router.goBack());
    };

    const getButtonColors = () => {
        if (!selectedReason) return ['#FFF7ED', '#FFEDE1'];
        const selected = reasons.find(r => r.id === selectedReason) || reasons[0];
        return [selected.colors[0], selected.colors[1]];
    };

    return (
        <ImageBackground
            source={require('../../assets/images/chicken.webp')}
            style={tw`flex-1`}
            imageStyle={tw`opacity-10`}
        >
            <LinearGradient
                colors={['rgba(255,255,255,0.98)', 'rgba(255,247,237,0.95)']}
                style={tw`flex-1`}
            >
                <SafeAreaView style={tw`flex-1`}>
                    <StatusBar style="dark" />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={tw`flex-1`}
                    >
                        <Animated.View style={[tw`flex-1 px-6 py-12`, { opacity: fadeAnim }]}>
                            <Animated.View
                                style={[
                                    tw`flex-row items-center justify-between mb-12`,
                                    { transform: [{ translateY: headerAnim }] },
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={handleBack}
                                    style={tw`p-3 bg-white/90 rounded-full shadow-xl`}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <Ionicons name="chevron-back" size={26} color="#431407" />
                                </TouchableOpacity>
                                <MaskedView
                                    maskElement={
                                        <Text style={tw`text-xl font-extrabold tracking-tight`}>Poultix</Text>
                                    }
                                >
                                    <LinearGradient
                                        colors={['#EF4444', '#FF6B6B', '#9B5DE5']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Text style={tw`text-xl font-extrabold tracking-tight opacity-0`}>Poultix</Text>
                                    </LinearGradient>
                                </MaskedView>
                            </Animated.View>

                            <MaskedView
                                maskElement={
                                    <Text style={tw`text-4xl font-extrabold tracking-tight mb-4 leading-tight`}>
                                        Embark on Your{'\n'}Poultix Journey
                                    </Text>
                                }
                            >
                                <LinearGradient
                                    colors={['#EF4444', '#FF6B6B', '#9B5DE5']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Text style={tw`text-4xl font-extrabold tracking-tight mb-4 leading-tight opacity-0`}>
                                        Embark on Your{'\n'}Poultix Journey
                                    </Text>
                                </LinearGradient>
                            </MaskedView>
                            <Text style={tw`text-gray-700 mb-10 text-base leading-6 font-medium opacity-90`}>
                                Choose your path to unlock a world of tailored brilliance
                            </Text>

                            {/* Cards */}
                            {reasons.map((reason) => (
                                <AnimatedCard
                                    key={reason.id}
                                    title={reason.title}
                                    icon={reason.icon}
                                    selected={selectedReason === reason.id}
                                    onPress={() => setSelectedReason(reason.id)}
                                    delay={200} // Adjust delay if needed
                                    colors={reason.colors}
                                    secondaryIcon={reason.secondaryIcon}
                                    description={reason.description}
                                />
                            ))}

                            <TouchableOpacity
                                onPress={handleContinue}
                                style={tw`mt-10 rounded-full overflow-hidden shadow-2xl`}
                                activeOpacity={0.9}
                            >
                                <LinearGradient
                                    colors={getButtonColors()}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={tw`py-4 flex-row items-center justify-center relative`}
                                >
                                    <BlurView
                                        intensity={selectedReason ? 20 : 0}
                                        tint="light"
                                        style={tw`absolute inset-0`}
                                    />
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0)']}
                                        style={tw`absolute top-0 left-0 w-full h-1`}
                                    />
                                    <Text style={tw`text-white font-extrabold text-lg tracking-tight mr-2 relative z-10`}>
                                        {selectedReason ? 'Start Your Adventure' : 'Choose Your Path'}
                                    </Text>
                                    {selectedReason && (
                                        <Ionicons name="arrow-forward" size={24} color="white" style={tw`relative z-10`} />
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animated.View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </ImageBackground>
    );
}
