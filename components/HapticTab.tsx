import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs/hooks/node_modules/@react-navigation/bottom-tabs/src';
import { PlatformPressable } from '@react-navigation/elements/hooks/node_modules/@react-navigation/elements/src';
import * as Haptics from '@/hooks/node_modules/expo-haptics/src/Haptics';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
