import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BrandLogo from '@/components/BrandLogo';
import FoodItemCard from '@/components/FoodItemCard';
import ScreenBackground from '@/components/ScreenBackground';
import { MENU_ITEMS } from '@/data/menuData';

export default function HomeScreen() {
  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <BrandLogo style={styles.logo} />
          <Text style={styles.subtitle}>Explore Our Special Grill Menu</Text>
        </View>

        <FlatList
          data={MENU_ITEMS}
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
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: 50,
  },
  subtitle: {
    color: '#aab4b0',
    fontSize: 14,
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
