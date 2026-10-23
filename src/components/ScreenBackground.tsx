import type { ReactNode } from 'react';
import {
  LinearGradient,
  type LinearGradientProps,
} from 'expo-linear-gradient';
import {
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenBackgroundProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  safeAreaStyle?: StyleProp<ViewStyle>;
  colors?: LinearGradientProps['colors'];
  locations?: LinearGradientProps['locations'];
}

export default function ScreenBackground({
  children,
  style,
  safeAreaStyle,
  colors = ['#3d1916', '#702823', '#5b1c1c', '#07100d'],
  locations = [0, 0.35, 0.7, 1],
}: ScreenBackgroundProps) {
  return (
    <LinearGradient colors={colors} locations={locations} style={[styles.fill, style]}>
      <SafeAreaView style={[styles.fill, safeAreaStyle]}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
