import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import Button from '@/components/Button';
import RatingBadge from '@/components/RatingBadge';
import type { MenuItem } from '@/data/menuData';

interface FoodItemCardProps {
  item: MenuItem;
  onPress: () => void;
}

export default function FoodItemCard({ item, onPress }: FoodItemCardProps) {
  return (
    <Button
      variant="plain"
      size="medium"
      style={styles.card}
      onPress={onPress}
      accessibilityLabel={`View ${item.name}, ${item.price}`}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.cardHeader}>
          <Text style={styles.category}>{item.category}</Text>
          <RatingBadge rating={item.rating} />
        </View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.viewBadge}>
            <Text style={styles.viewBadgeText}>View Item</Text>
            <Ionicons name="chevron-forward" size={14} color="#101512" />
          </View>
        </View>
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: 0,
    minHeight: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: 'rgba(55, 40, 40, 0.65)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(104, 116, 109, 0.32)',
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: { width: '100%', height: 160 },
  details: { padding: 14 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: { color: '#CFA04A', fontSize: 12, fontWeight: '600' },
  title: {
    color: '#fffaf6',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  description: {
    color: '#aab4b0',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  price: { color: '#fffaf6', fontSize: 18, fontWeight: '700' },
  viewBadge: {
    backgroundColor: '#CFA04A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewBadgeText: { color: '#101512', fontSize: 12, fontWeight: '700' },
});
