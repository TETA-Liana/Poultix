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
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import * as Haptics from 'expo-haptics';
import tw from 'twrnc';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/interfaces/Navigation';

const { width, height } = Dimensions.get('window');

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
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 600,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                tension: 40,
                delay: delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, [selected, delay]);

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        onPress();
    };

    return (
        <Animated.View
            style={[
                tw`rounded-3xl overflow-hidden mb-6 shadow-lg`,
                {
                    opacity: opacityAnim,
                    transform: [{ scale: scaleAnim }],
                    shadowColor: colors[0],
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: selected ? 12 : 6,
                },
            ]}
        >
            <TouchableOpacity onPress={handlePress} activeOpacity={0.95}>
                <LinearGradient
                    colors={selected ? colors : ['#F8FAFC', '#F1F5F9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={tw`p-5 relative overflow-hidden h-44`}
                >
                    <BlurView
                        intensity={selected ? 30 : 10}
                        tint="light"
                        style={tw`absolute inset-0 rounded-3xl`}
                    />
                    
                    <View style={tw`relative z-10 flex-1 justify-between`}>
                        <View style={tw`flex-row items-center justify-between`}>
                            <LinearGradient
                                colors={selected ? ['#FFFFFFDD', '#FFFFFF88'] : [`${colors[0]}44`, `${colors[1]}22`]}
                                style={tw`rounded-full p-3 shadow-md`}
                            >
                                {icon}
                            </LinearGradient>
                            {selected && (
                                <View style={tw`bg-white/60 p-2 rounded-full border-2 border-white/80`}>
                                    <Ionicons name="checkmark-circle" size={20} color={colors[0]} />
                                </View>
                            )}
                        </View>

                        <View style={tw`mt-3`}>
                            <Text style={tw`text-xl font-bold tracking-tight ${selected ? 'text-white' : 'text-gray-900'}`}>
                                {title}
                            </Text>
                            <Text
                                style={tw`text-sm mt-2 ${selected ? 'text-white/90' : 'text-gray-600'} leading-5 font-medium`}
                                numberOfLines={2}
                            >
                                {description}
                            </Text>
                        </View>
                    </View>

                    {selected && (
                        <View style={tw`absolute inset-0 overflow-hidden rounded-3xl`}>
                            <LinearGradient
                                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0)']}
                                style={tw`absolute bottom-0 left-0 w-32 h-32 rounded-tr-full`}
                            />
                            <LinearGradient
                                colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0)']}
                                style={tw`absolute top-0 right-0 w-24 h-24 rounded-bl-full`}
                            />
                        </View>
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
    const headerAnim = useRef(new Animated.Value(-80)).current;

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
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(headerAnim, {
                toValue: 0,
                tension: 100,
                friction: 10,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const reasons = [
        {
            id: 'news',
            title: 'Disease Insights',
            description: 'Real-time alerts & research updates',
            colors: ['#FF6B6B', '#FF8787'],
            icon: <Ionicons name="newspaper" size={30} color={selectedReason === 'news' ? '#FFF' : '#FF6B6B'} />,
            secondaryIcon: <MaterialCommunityIcons name="newspaper-variant" size={54} color="#FFF" />,
        },
        {
            id: 'detection',
            title: 'Early Warning',
            description: 'Detect issues before they escalate',
            colors: ['#4EA8DE', '#74C2E1'],
            icon: <Ionicons name="eye" size={30} color={selectedReason === 'detection' ? '#FFF' : '#4EA8DE'} />,
            secondaryIcon: <MaterialCommunityIcons name="radar" size={54} color="#FFF" />,
        },
        {
            id: 'connecting',
            title: 'Community Hub',
            description: 'Connect with farming experts',
            colors: ['#2DD4BF', '#5EEAD4'],
            icon: <Ionicons name="people" size={30} color={selectedReason === 'connecting' ? '#FFF' : '#2DD4BF'} />,
            secondaryIcon: <MaterialCommunityIcons name="handshake" size={54} color="#FFF" />,
        },
        {
            id: 'veterinarian',
            title: 'Vet Suite',
            description: 'Advanced tools for professionals',
            colors: ['#A78BFA', '#C4B5FD'],
            icon: <Ionicons name="medkit" size={30} color={selectedReason === 'veterinarian' ? '#FFF' : '#A78BFA'} />,
            secondaryIcon: <MaterialCommunityIcons name="medical-bag" size={54} color="#FFF" />,
        },
        {
            id: 'explore',
            title: 'Discovery Mode',
            description: 'Experience Poultix’s potential',
            colors: ['#22D3EE', '#67E8F9'],
            icon: <Ionicons name="compass" size={30} color={selectedReason === 'explore' ? '#FFF' : '#22D3EE'} />,
            secondaryIcon: <MaterialCommunityIcons name="telescope" size={54} color="#FFF" />,
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
            router.navigate('FarmOverview');
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
        if (!selectedReason) return ['#E2E8F0', '#CBD5E1'];
        const selected = reasons.find(r => r.id === selectedReason) || reasons[0];
        return [selected.colors[0], selected.colors[1]];
    };

    return (
        <ImageBackground
            source={require('../../assets/images/chicken.webp')}
            style={tw`flex-1`}
            imageStyle={tw`opacity-15`}
        >
            <LinearGradient
                colors={['rgba(255,255,255,0.95)', 'rgba(240,248,255,0.92)']}
                style={tw`flex-1`}
            >
                <SafeAreaView style={tw`flex-1`}>
                    <StatusBar style="dark" />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={tw`flex-1`}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={tw`flex-grow pb-12`}
                            bounces={true}
                        >
                            <Animated.View style={[tw`flex-1 px-5 pt-8 pb-12`, { opacity: fadeAnim }]}>
                                <Animated.View
                                    style={[
                                        tw`flex-row items-center justify-between mb-10`,
                                        { transform: [{ translateY: headerAnim }] },
                                    ]}
                                >
                                    <TouchableOpacity
                                        onPress={handleBack}
                                        style={tw`p-3 bg-white/95 rounded-full shadow-lg`}
                                    >
                                        <Ionicons name="chevron-back" size={28} color="#1E293B" />
                                    </TouchableOpacity>
                                    <MaskedView
                                        maskElement={
                                            <Text style={tw`text-2xl font-extrabold tracking-tight`}>Poultix</Text>
                                        }
                                    >
                                        <LinearGradient
                                            colors={['#FF6B6B', '#A78BFA', '#22D3EE']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                        >
                                            <Text style={tw`text-2xl font-extrabold tracking-tight opacity-0`}>Poultix</Text>
                                        </LinearGradient>
                                    </MaskedView>
                                </Animated.View>

                                <MaskedView
                                    maskElement={
                                        <Text style={tw`text-4xl font-extrabold tracking-tight mb-4 leading-tight`}>
                                            Discover Your{'\n'}Poultix Journey
                                        </Text>
                                    }
                                >
                                    <LinearGradient
                                        colors={['#FF6B6B', '#A78BFA', '#22D3EE']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Text style={tw`text-4xl font-extrabold tracking-tight mb-4 leading-tight opacity-0`}>
                                            Discover Your{'\n'}Poultix Journey
                                        </Text>
                                    </LinearGradient>
                                </MaskedView>
                                <Text style={tw`text-gray-600 mb-8 text-base leading-6 font-medium`}>
                                    Select your path to explore a world of vibrant possibilities
                                </Text>

                                <View style={tw`flex-row flex-wrap justify-between`}>
                                    {reasons.map((reason, index) => (
                                        <View
                                            key={reason.id}
                                            style={tw`w-full mb-2`}
                                        >
                                            <AnimatedCard
                                                title={reason.title}
                                                icon={reason.icon}
                                                selected={selectedReason === reason.id}
                                                onPress={() => setSelectedReason(reason.id)}
                                                delay={100 + index * 100}
                                                colors={reason.colors}
                                                secondaryIcon={reason.secondaryIcon}
                                                description={reason.description}
                                            />
                                        </View>
                                    ))}
                                </View>

                                <TouchableOpacity
                                    onPress={handleContinue}
                                    style={tw`mt-8 rounded-full overflow-hidden shadow-xl`}
                                    activeOpacity={0.9}
                                >
                                    <LinearGradient
                                        colors={getButtonColors()}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={tw`py-4 flex-row items-center justify-center relative`}
                                    >
                                        <BlurView
                                            intensity={selectedReason ? 25 : 5}
                                            tint="light"
                                            style={tw`absolute inset-0`}
                                        />
                                        <Text style={tw`text-white font-bold text-lg tracking-tight mr-3 relative z-10`}>
                                            {selectedReason ? 'Begin Journey' : 'Select a Path'}
                                        </Text>
                                        {selectedReason && (
                                            <Ionicons name="arrow-forward" size={24} color="white" style={tw`relative z-10`} />
                                        )}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Animated.View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </ImageBackground>
    );
}