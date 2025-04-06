import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Animated,
    ScrollView,
    ImageBackground,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProps } from '@/interfaces/Navigation';


interface AnimatedCardProps {
    title: string;
    icon: JSX.Element;
    selected: boolean;
    onPress: () => void;
    delay: number;
    colors: string[];
    description: string;
}

const AnimatedCard = ({ title, icon, selected, onPress, delay, colors, description }: AnimatedCardProps) => {
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 700,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 50,
                delay: delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, [selected, delay]);

    return (
        <Animated.View
            style={{
                opacity: opacityAnim,
                transform: [{ scale: scaleAnim }],
                marginBottom: 20,
                borderRadius: 24,
                overflow: 'hidden',
                backgroundColor: selected ? colors[0] : '#FFFFFF',
                shadowColor: colors[0],
                shadowOffset: { width: 0, height: selected ? 8 : 4 },
                shadowOpacity: 0.25,
                shadowRadius: 12,
                elevation: selected ? 16 : 8,
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    onPress();
                }}
                style={{ padding: 20 }}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: selected ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)',
                        borderRadius: 16,
                        padding: 12,
                    }}>
                        {icon}
                    </View>
                    {selected && (
                        <View style={{
                            backgroundColor: 'rgba(255,255,255,0.3)',
                            borderRadius: 20,
                            padding: 6,
                        }}>
                            <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                        </View>
                    )}
                </View>
                <Text style={{
                    fontSize: 22,
                    fontWeight: '700',
                    color: selected ? '#FFFFFF' : '#1F2937',
                    marginTop: 16,
                    letterSpacing: -0.5,
                }}>
                    {title}
                </Text>
                <Text style={{
                    fontSize: 14,
                    color: selected ? 'rgba(255,255,255,0.9)' : '#6B7280',
                    marginTop: 8,
                    lineHeight: 20,
                    fontWeight: '500',
                }}>
                    {description}
                </Text>
                <View style={{
                    position: 'absolute',
                    bottom: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: selected ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.03)',
                }} />
            </TouchableOpacity>
        </Animated.View>
    );
};


export default function MainReasonScreen() {
    const router = useNavigation<NavigationProps>();
    const [selectedReason, setSelectedReason] = useState<'News' | 'Diseases' | 'Connecting' | 'PhReader' | 'FarmOverview' | null>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const headerAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    router.navigate('SignIn');
                }
            } catch (error) {
                Alert.alert('Error', 'An error occurred while checking user');
            }
        };
        checkUser();

        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
            Animated.spring(headerAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
        ]).start();
    }, []);

    const reasons = [
        {
            id: 'news',
            title: 'Disease Insights',
            description: 'Real-time alerts & research updates',
            colors: ['#FF6B6B', '#FF8787'],
            icon: <Ionicons name="newspaper" size={32} color={selectedReason === 'News' ? '#FFF' : '#FF6B6B'} />,
        },
        {
            id: 'detection',
            title: 'Early Warning',
            description: 'Detect issues before they escalate',
            colors: ['#4EA8DE', '#74C2E1'],
            icon: <Ionicons name="eye" size={32} color={selectedReason === 'News' ? '#FFF' : '#4EA8DE'} />,
        },
        {
            id: 'connecting',
            title: 'Community Hub',
            description: 'Connect with farming experts',
            colors: ['#2DD4BF', '#5EEAD4'],
            icon: <Ionicons name="people" size={32} color={selectedReason === 'Connecting' ? '#FFF' : '#2DD4BF'} />,
        },
        {
            id: 'veterinarian',
            title: 'Vet Suite',
            description: 'Advanced tools for professionals',
            colors: ['#A78BFA', '#C4B5FD'],
            icon: <Ionicons name="medkit" size={32} color={selectedReason === 'PhReader' ? '#FFF' : '#A78BFA'} />,
        },
        {
            id: 'FarmOverview',
            title: 'Discovery Mode',
            description: 'Experience Poultix’s potential',
            colors: ['#22D3EE', '#67E8F9'],
            icon: <Ionicons name="compass" size={32} color={selectedReason === 'FarmOverview' ? '#FFF' : '#22D3EE'} />,
        },
    ];

    const handleContinue = () => {
        if (!selectedReason) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            return;
        }


        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start(() => router.navigate(selectedReason));
    };

    const getButtonStyle = () => ({
        backgroundColor: selectedReason ? reasons.find(r => r.id === selectedReason)?.colors[0] : '#E5E7EB',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: selectedReason ? reasons.find(r => r.id === selectedReason)?.colors[0] : '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    });

    return (
        <ImageBackground
            source={require('@/assets/images/chicken.webp')}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <StatusBar style="dark" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 40 }}
                    >
                        <Animated.View style={{ opacity: fadeAnim, paddingHorizontal: 20, paddingTop: 40 }}>
                            <Animated.View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 32,
                                transform: [{ translateY: headerAnim }],
                            }}>
                                <TouchableOpacity
                                    onPress={() => router.goBack()}
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.95)',
                                        padding: 12,
                                        borderRadius: 16,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 4,
                                    }}
                                >
                                    <Ionicons name="chevron-back" size={24} color="#1F2937" />
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: 28,
                                    fontWeight: '800',
                                    color: '#FF6B6B',
                                    letterSpacing: -1,
                                }}>
                                    Poultix
                                </Text>
                            </Animated.View>

                            <Text style={{
                                fontSize: 36,
                                fontWeight: '800',
                                color: '#1F2937',
                                lineHeight: 44,
                                marginBottom: 12,
                                letterSpacing: -1.2,
                            }}>
                                Your Poultix{'\n'}Journey Begins
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                color: '#6B7280',
                                marginBottom: 32,
                                lineHeight: 24,
                                fontWeight: '500',
                            }}>
                                Choose your path to unlock tailored possibilities
                            </Text>

                            {reasons.map((reason, index) => (
                                <AnimatedCard
                                    key={reason.id}
                                    title={reason.title}
                                    icon={reason.icon}
                                    selected={selectedReason === reason.id}
                                    onPress={() => setSelectedReason(reason.id)}
                                    delay={100 + index * 150}
                                    colors={reason.colors}
                                    description={reason.description}
                                />
                            ))}

                            <TouchableOpacity
                                onPress={handleContinue}
                                style={getButtonStyle()}
                            >
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: '700',
                                    color: selectedReason ? '#FFFFFF' : '#6B7280',
                                    marginRight: selectedReason ? 12 : 0,
                                }}>
                                    {selectedReason ? 'Start Now' : 'Select a Path'}
                                </Text>
                                {selectedReason && (
                                    <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
                                )}
                            </TouchableOpacity>
                        </Animated.View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}
