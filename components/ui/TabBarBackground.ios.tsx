import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs/hooks/node_modules/@react-navigation/bottom-tabs/src';
import { BlurView } from '@/hooks/node_modules/expo-blur/src';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context/hooks/node_modules/react-native-safe-area-context/src';

export default function BlurTabBarBackground() {
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint="systemChromeMaterial"
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}
