import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

interface DividerProps {
  label: string;
  style?: StyleProp<ViewStyle>;
}

export default function Divider({ label, style }: DividerProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 21,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(88, 100, 94, 0.55)',
  },
  label: {
    color: '#858e8a',
    fontSize: 16,
    marginHorizontal: 14,
  },
});
