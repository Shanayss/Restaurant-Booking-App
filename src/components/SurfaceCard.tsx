import type { ReactNode } from 'react';
import { BlurView } from 'expo-blur';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type SurfaceVariant = 'glass' | 'solid';

interface SurfaceCardProps {
  children: ReactNode;
  variant?: SurfaceVariant;
  blurred?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function SurfaceCard({
  children,
  variant = 'glass',
  blurred = false,
  style,
}: SurfaceCardProps) {
  const cardStyle = [styles.card, styles[variant], style];

  if (blurred) {
    return (
      <BlurView intensity={35} tint="dark" style={cardStyle}>
        {children}
      </BlurView>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(104, 116, 109, 0.32)',
  },
  glass: {
    backgroundColor: 'rgba(55, 40, 40, 0.48)',
    borderRadius: 11,
  },
  solid: {
    backgroundColor: 'rgba(55, 40, 40, 0.65)',
    borderRadius: 20,
  },
});
