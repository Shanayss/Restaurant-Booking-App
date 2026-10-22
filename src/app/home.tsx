import { MENU_ITEMS, MenuItem } from '@/data/menuData';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <View style={styles.cardHeader}>
          <Text style={styles.category}>{item.category}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#CFA04A" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.viewBadge}>
            <Text style={styles.viewBadgeText}>View Item</Text>
            <Ionicons name="chevron-forward" size={14} color="#101512" />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#3d1916', '#702823', '#5b1c1c', '#07100d']}
      locations={[0, 0.35, 0.7, 1]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header Bar */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/resto-name.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>Explore Our Special Grill Menu</Text>
          </View>

          {/* Menu Items List */}
          <FlatList
            data={MENU_ITEMS}
            keyExtractor={(item) => item.id}
            renderItem={renderMenuItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16 },
  header: { marginTop: 10, marginBottom: 15, alignItems: 'center' },
  logo: { width: '80%', height: 50 },
  subtitle: { color: '#aab4b0', fontSize: 14, marginTop: 4 },
  listContainer: { paddingBottom: 20 },
  card: {
    backgroundColor: 'rgba(55, 40, 40, 0.65)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(104, 116, 109, 0.32)',
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 160 },
  cardDetails: { padding: 14 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: { color: '#CFA04A', fontSize: 12, fontWeight: '600' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { color: '#fffaf6', fontSize: 12, fontWeight: '600' },
  itemTitle: {
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
  cardFooter: {
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