import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface RatingBadgeProps {
  rating: string;
  variant?: 'plain' | 'badge';
}

export default function RatingBadge({
  rating,
  variant = 'plain',
}: RatingBadgeProps) {
  return (
    <View style={[styles.container, variant === 'badge' && styles.badge]}>
      <Ionicons name="star" size={14} color="#CFA04A" />
      <Text style={[styles.text, variant === 'badge' && styles.badgeText]}>
        {rating}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badge: {
    backgroundColor: 'rgba(10, 18, 15, 0.57)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  text: {
    color: '#fffaf6',
    fontSize: 12,
    fontWeight: '600',
  },
  badgeText: {
    fontSize: 13,
  },
});
