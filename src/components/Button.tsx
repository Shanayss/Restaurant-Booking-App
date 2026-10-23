import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'plain';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonIconPosition = 'left' | 'right';

interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  title?: string;
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: ButtonIconPosition;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Button({
  title,
  children,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'large',
  style,
  textStyle,
  disabled,
  accessibilityRole = 'button',
  ...pressableProps
}: ButtonProps) {
  const content = children ?? (
    <>
      {iconPosition === 'left' ? icon : null}
      {title ? <Text style={[styles.text, textStyle]}>{title}</Text> : null}
      {iconPosition === 'right' ? icon : null}
    </>
  );

  return (
    <Pressable
      {...pressableProps}
      accessibilityRole={accessibilityRole}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        styles[size],
        style,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primary: {
    backgroundColor: '#CFA04A',
    borderRadius: 16,
  },
  secondary: {
    backgroundColor: 'rgba(11, 19, 16, 0.46)',
    borderWidth: 1.4,
    borderColor: 'rgba(76, 88, 82, 0.72)',
    borderRadius: 16,
  },
  plain: {
    backgroundColor: 'transparent',
  },
  small: {
    minHeight: 40,
    paddingHorizontal: 10,
  },
  medium: {
    minHeight: 52,
    paddingHorizontal: 14,
  },
  large: {
    height: 59,
    paddingHorizontal: 16,
  },
  text: {
    color: '#101512',
    fontSize: 19,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.72,
  },
  disabled: {
    opacity: 0.5,
  },
});
