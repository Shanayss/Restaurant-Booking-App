import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FoodItemCard from '@/components/FoodItemCard';
import ScreenBackground from '@/components/ScreenBackground';
import { useUserContext } from '@/context/UserContext';
import { MENU_ITEMS } from '@/data/menuData';

export default function FavoritesScreen() {
  const { favoriteItemIds } = useUserContext();
  const favoriteItems = MENU_ITEMS.filter((item) =>
    favoriteItemIds.includes(item.id),
  );

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <Text style={styles.title}>MY FAVORITES</Text>

        {favoriteItems.length > 0 ? (
          <FlatList
            data={favoriteItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FoodItemCard
                item={item}
                onPress={() =>
                  router.push({
                    pathname: '/[id]',
                    params: { id: item.id },
                  })
                }
              />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={44} color="#CFA04A" />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyMessage}>
              Tap the heart on a dish to save it here.
            </Text>
          </View>
        )}
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fffaf6',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 18,
  },
  list: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#fffaf6',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
  },
  emptyMessage: {
    color: '#aab4b0',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
