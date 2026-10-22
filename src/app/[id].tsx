import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailsScreen() {
  return (
    <LinearGradient
      colors={['#3d1916', '#702823', '#5b1c1c', '#07100d']}
      locations={[0, 0.35, 0.7, 1]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Top Header Navigation Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="arrow-back" size={24} color="#fffaf6" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Item Details</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={24} color="#CFA04A" />
            </TouchableOpacity>
          </View>

          {/* Hero Banner Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
              }}
              style={styles.heroImage}
            />
          </View>

          {/* Content Card */}
          <View style={styles.contentCard}>
            <View style={styles.categoryRow}>
              <Text style={styles.category}>Signature Grill</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color="#CFA04A" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>

            <Text style={styles.title}>Smoked Grilled Ribs</Text>
            <Text style={styles.price}>₱450</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              Tender pork ribs slow-cooked and smoked to perfection with our
              secret BBQ glaze. Served hot straight off the grill.
            </Text>

            {/* Action Bar */}
            <TouchableOpacity style={styles.bookButton}>
              <Ionicons name="restaurant-outline" size={20} color="#101512" />
              <Text style={styles.bookButtonText}>Book Table for This Dish</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  container: { paddingBottom: 30 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(55, 40, 40, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(104, 116, 109, 0.32)',
  },
  headerTitle: { color: '#fffaf6', fontSize: 18, fontWeight: '700' },
  imageContainer: { paddingHorizontal: 20, marginTop: 10 },
  heroImage: { width: '100%', height: 230, borderRadius: 20 },
  contentCard: {
    backgroundColor: 'rgba(55, 40, 40, 0.65)',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(104, 116, 109, 0.32)',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: { color: '#CFA04A', fontSize: 13, fontWeight: '600' },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(10, 18, 15, 0.57)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: { color: '#fffaf6', fontSize: 13, fontWeight: '600' },
  title: { color: '#fffaf6', fontSize: 24, fontWeight: '700', marginTop: 8 },
  price: { color: '#CFA04A', fontSize: 22, fontWeight: '700', marginTop: 4 },
  divider: {
    height: 1,
    backgroundColor: 'rgba(104, 116, 109, 0.32)',
    marginVertical: 16,
  },
  sectionTitle: {
    color: '#b7c0bc',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: { color: '#aab4b0', fontSize: 14, lineHeight: 22 },
  bookButton: {
    backgroundColor: '#CFA04A',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
  },
  bookButtonText: { color: '#101512', fontSize: 16, fontWeight: '700' },
});