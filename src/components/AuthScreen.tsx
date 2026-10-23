import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  type KeyboardAvoidingViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import ScreenBackground from '@/components/ScreenBackground';

interface AuthScreenProps {
  children: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  keyboardBehavior?: KeyboardAvoidingViewProps['behavior'];
  keyboardVerticalOffset?: number;
}

export default function AuthScreen({
  children,
  contentStyle,
  keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset = 0,
}: AuthScreenProps) {
  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        style={styles.fill}
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={[styles.content, contentStyle]}>{children}</View>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
