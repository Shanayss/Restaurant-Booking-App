import type { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

type IconName = keyof typeof Ionicons.glyphMap;

interface InputFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  iconName?: IconName;
  labelAccessory?: ReactNode;
  rightAccessory?: ReactNode;
  fieldStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export default function InputField({
  label,
  iconName,
  labelAccessory,
  rightAccessory,
  fieldStyle,
  labelStyle,
  inputContainerStyle,
  inputStyle,
  ...inputProps
}: InputFieldProps) {
  return (
    <View style={[styles.field, fieldStyle]}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {labelAccessory}
      </View>
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {iconName ? <Ionicons name={iconName} size={21} color="#68716e" /> : null}
        <TextInput
          {...inputProps}
          style={[styles.input, inputStyle]}
          placeholderTextColor={inputProps.placeholderTextColor ?? '#626b68'}
        />
        {rightAccessory}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#b7c0bc',
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(10, 18, 15, 0.57)',
    borderWidth: 1.4,
    borderColor: 'rgba(76, 88, 82, 0.72)',
    borderRadius: 16,
  },
  input: {
    flex: 1,
    color: '#f2eee8',
    fontSize: 17,
    marginLeft: 13,
    paddingVertical: 0,
  },
});
