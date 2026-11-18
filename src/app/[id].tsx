import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '@/components/Button';
import RatingBadge from '@/components/RatingBadge';
import ScreenBackground from '@/components/ScreenBackground';
import SurfaceCard from '@/components/SurfaceCard';
import { useUserContext } from '@/context/UserContext';
import { MENU_ITEMS } from '@/data/menuData';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    user,
    favoriteItemIds,
    draftDishIds,
    toggleFavorite,
    addDishToBooking,
  } = useUserContext();
  const item = MENU_ITEMS.find((menuItem) => menuItem.id === id);
  const isFavorite = item ? favoriteItemIds.includes(item.id) : false;
  const isAddedToBooking =
    item !== undefined && draftDishIds.includes(item.id);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  };

  if (!item) {
    return (
      <ScreenBackground safeAreaStyle={styles.notFoundSafeArea}>
        <Button
          title="Back"
          variant="plain"
          size="small"
          icon={<Ionicons name="arrow-back" size={20} color="#fffaf6" />}
          style={styles.backButton}
          textStyle={styles.backButtonText}
          accessibilityLabel="Back to Home"
          onPress={handleBack}
        />
        <Text style={styles.notFoundText}>Menu item not found.</Text>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <Button
            title="Back"
            variant="plain"
            size="small"
            icon={<Ionicons name="arrow-back" size={20} color="#fffaf6" />}
            style={styles.backButton}
            textStyle={styles.backButtonText}
            accessibilityLabel="Back to Home"
            onPress={handleBack}
          />
          <Text style={styles.headerTitle}>ITEM DETAILS</Text>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
            style={styles.iconButton}
            onPress={() => {
              if (!user) {
                router.push('/');
                return;
              }
              toggleFavorite(item.id);
            }}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color="#CFA04A"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.heroImage} />
        </View>

        <SurfaceCard variant="solid" style={styles.contentCard}>
          <View style={styles.categoryRow}>
            <Text style={styles.category}>{item.category}</Text>
            <RatingBadge rating={item.rating} variant="badge" />
          </View>

          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>

          <Button
            title={isAddedToBooking ? 'Added to Booking' : 'Add Dish to Booking'}
            icon={
              <Ionicons
                name={
                  isAddedToBooking
                    ? 'checkmark-circle-outline'
                    : 'restaurant-outline'
                }
                size={20}
                color="#101512"
              />
            }
            style={styles.bookButton}
            textStyle={styles.bookButtonText}
            disabled={isAddedToBooking}
            onPress={() => {
              if (!user) {
                router.push('/');
                return;
              }
              addDishToBooking(item.id);
            }}
          />
        </SurfaceCard>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  notFoundSafeArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    color: '#fffaf6',
    fontSize: 16,
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#fffaf6',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    paddingBottom: 30,
  },
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
  headerTitle: {
    color: '#fffaf6',
    fontSize: 18,
    fontWeight: '700',
  },
  imageContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  heroImage: {
    width: '100%',
    height: 230,
    borderRadius: 20,
  },
  contentCard: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    color: '#CFA04A',
    fontSize: 13,
    fontWeight: '600',
  },
  id: {
    color: '#aab4b0',
    fontSize: 13,
    marginTop: 14,
  },
  title: {
    color: '#fffaf6',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  price: {
    color: '#CFA04A',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },
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
  description: {
    color: '#aab4b0',
    fontSize: 14,
    lineHeight: 22,
  },
  bookButton: {
    height: 52,
    borderRadius: 14,
    marginTop: 24,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
