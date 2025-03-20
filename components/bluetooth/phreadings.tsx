import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PoultryPHInputScreen() {
  const [phReading, setPhReading] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSick, setIsSick] = useState(false);
  const [error, setError] = useState(null);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(cardAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(buttonAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleSubmit = () => {
    const phValue = parseFloat(phReading);
    if (isNaN(phValue) || phValue < 0 || phValue > 14) {
      setError('Please enter a valid pH value between 0 and 14.');
      return;
    }

    setError(null);
    setIsSick(phValue < 6.0); // Normal pH for poultry stool is ~6.5-7.5
    setSubmitted(true);

    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleReset = () => {
    setPhReading('');
    setSubmitted(false);
    setIsSick(false);
    setError(null);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/chicken-farmer.webp')} // Replace with your image
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.05 }}
    >
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="dark" backgroundColor="transparent" translucent />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
              <Animated.View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 48, opacity: fadeAnim }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <Text style={{ fontSize: 16, color: '#6B7280' }}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  <Text style={{ fontSize: 32, fontWeight: '800', color: '#EF4444' }}>Poultry pH Check</Text>
                  <Ionicons name="settings-outline" size={24} color="#6B7280" />
                </View>

                <Text style={{ fontSize: 18, color: '#6B7280', marginBottom: 32 }}>
                  Enter the pH reading of your poultry's stool to check for health issues.
                </Text>

                {/* Error Message */}
                {error && (
                  <View style={{
                    backgroundColor: '#FEE2E2',
                    padding: 16,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#FECACA',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 24,
                  }}>
                    <Ionicons name="alert-circle" size={22} color="#DC2626" style={{ marginRight: 8 }} />
                    <Text style={{ flex: 1, color: '#DC2626', fontSize: 14, fontWeight: '500' }}>{error}</Text>
                    <TouchableOpacity onPress={() => setError(null)}>
                      <Ionicons name="close-circle" size={22} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                )}

                {/* pH Input */}
                {!submitted ? (
                  <>
                    <View style={{
                      backgroundColor: '#F3F4F6',
                      borderRadius: 12,
                      padding: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 24,
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                    }}>
                      <TextInput
                        style={{ flex: 1, fontSize: 16, color: '#1F2937' }}
                        placeholder="Enter pH reading (e.g., 6.5)"
                        placeholderTextColor="#6B7280"
                        keyboardType="numeric"
                        value={phReading}
                        onChangeText={setPhReading}
                      />
                      <Ionicons name="water-outline" size={22} color="#EF4444" />
                    </View>

                    <Animated.View style={{
                      opacity: buttonAnim,
                      transform: [{
                        scale: buttonAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.9, 1],
                        }),
                      }],
                    }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#EF4444',
                          paddingVertical: 16,
                          borderRadius: 12,
                          alignItems: 'center',
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }}
                        onPress={handleSubmit}
                      >
                        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Submit Reading</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  </>
                ) : (
                  <>
                    {/* Health Status */}
                    <Animated.View style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 16,
                      padding: 24,
                      marginBottom: 24,
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 3.84,
                      elevation: 5,
                      opacity: cardAnim,
                      transform: [{
                        translateY: cardAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      }],
                    }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <Ionicons
                          name={isSick ? 'alert-circle-outline' : 'checkmark-circle-outline'}
                          size={28}
                          color={isSick ? '#DC2626' : '#10B981'}
                          style={{ marginRight: 12 }}
                        />
                        <Text style={{ fontSize: 20, fontWeight: '700', color: '#1F2937' }}>Health Status</Text>
                      </View>
                      <Text style={{ fontSize: 16, color: '#4B5563', marginBottom: 16 }}>
                        {isSick
                          ? `The pH reading of ${phReading} is below the normal range (6.5-7.5), indicating potential health issues.`
                          : `The pH reading of ${phReading} is within the normal range (6.5-7.5), suggesting good health.`}
                      </Text>
                      {isSick && (
                        <Text style={{ fontSize: 16, color: '#DC2626', fontWeight: '600' }}>
                          Possible Issue: Acidosis or infection may be present.
                        </Text>
                      )}
                    </Animated.View>

                    {/* Recommendations */}
                    {isSick && (
                      <Animated.View style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 16,
                        padding: 24,
                        marginBottom: 24,
                        borderWidth: 1,
                        borderColor: '#E5E7EB',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 3.84,
                        elevation: 5,
                        opacity: cardAnim,
                        transform: [{
                          translateY: cardAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [30, 0],
                          }),
                        }],
                      }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                          <Ionicons name="medkit-outline" size={28} color="#EF4444" style={{ marginRight: 12 }} />
                          <Text style={{ fontSize: 20, fontWeight: '700', color: '#1F2937' }}>Recommendations</Text>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#EF4444', marginBottom: 8 }}>
                          Recommended Pharmacy:
                        </Text>
                        <Text style={{ fontSize: 16, color: '#4B5563', marginBottom: 16 }}>
                          VetRxDirect Pharmacy - They offer medications like CitraVet to help balance urine pH and support overall health.
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#EF4444', marginBottom: 8 }}>
                          Recommended Veterinarian:
                        </Text>
                        <Text style={{ fontSize: 16, color: '#4B5563', marginBottom: 16 }}>
                          Dr. Jarra Jagne at Cornell University’s Avian Health Program - Specializes in poultry health and offers on-farm assistance within 100 miles of the AHDC.
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#EF4444', marginBottom: 8 }}>
                          Advice:
                        </Text>
                        <Text style={{ fontSize: 16, color: '#4B5563', marginBottom: 8 }}>
                          • Consult a veterinarian immediately for a thorough diagnosis.
                        </Text>
                        <Text style={{ fontSize: 16, color: '#4B5563', marginBottom: 8 }}>
                          • Adjust the diet with alkaline feed (e.g., calcium supplements) to balance pH.
                        </Text>
                        <Text style={{ fontSize: 16, color: '#4B5563', marginBottom: 8 }}>
                          • Ensure clean, pH-balanced water to reduce stress on the poultry.
                        </Text>
                        <Text style={{ fontSize: 16, color: '#4B5563' }}>
                          • Isolate affected birds to prevent potential spread of infection.
                        </Text>
                      </Animated.View>
                    )}

                    {/* Healthy Advice */}
                    {!isSick && submitted && (
                      <Animated.View style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 16,
                        padding: 24,
                        marginBottom: 24,
                        borderWidth: 1,
                        borderColor: '#E5E7EB',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 3.84,
                        elevation: 5,
                        opacity: cardAnim,
                        transform: [{
                          translateY: cardAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [30, 0],
                          }),
                        }],
                      }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                          <Ionicons name="heart-outline" size={28} color="#10B981" style={{ marginRight: 12 }} />
                          <Text style={{ fontSize: 20, fontWeight: '700', color: '#1F2937' }}>Health Tips</Text>
                        </View>
                        <Text style={{ fontSize: 16, color: '#4B5563', marginBottom: 8 }}>
                          • Maintain a balanced diet to support gut health.
                        </Text>
                        <Text style={{ fontSize: 16, color: '#4B5563', marginBottom: 8 }}>
                          • Keep the coop clean to prevent infections.
                        </Text>
                        <Text style={{ fontSize: 16, color: '#4B5563', marginBottom: 8 }}>
                          • Reduce stress factors like overcrowding.
                        </Text>
                        <Text style={{ fontSize: 16, color: '#4B5563' }}>
                          • Schedule regular health checkups to maintain optimal health.
                        </Text>
                      </Animated.View>
                    )}

                    {/* Reset Button */}
                    {submitted && (
                      <Animated.View style={{
                        opacity: buttonAnim,
                        transform: [{
                          scale: buttonAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.9, 1],
                          }),
                        }],
                      }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#DC2626',
                            paddingVertical: 16,
                            borderRadius: 12,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                          }}
                          onPress={handleReset}
                        >
                          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Check Another Reading</Text>
                        </TouchableOpacity>
                      </Animated.View>
                    )}
                  </>
                )}
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
