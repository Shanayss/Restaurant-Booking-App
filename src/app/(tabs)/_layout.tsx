import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useUserContext } from '@/context/UserContext';

export default function TabsLayout() {
  const { user } = useUserContext();
  const canManageBookings = user?.role === 'staff' || user?.role === 'admin';

  return (
    <Tabs
      initialRouteName={canManageBookings ? 'dashboard' : 'home'}
      backBehavior={canManageBookings ? 'initialRoute' : 'firstRoute'}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#CFA04A',
        tabBarInactiveTintColor: '#aab4b0',
        tabBarStyle: {
          backgroundColor: '#211614',
          borderTopColor: 'rgba(104, 116, 109, 0.45)',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          href: canManageBookings ? null : '/home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          href: canManageBookings ? null : '/favorites',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          href: canManageBookings ? null : '/bookings',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'restaurant' : 'restaurant-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          href: canManageBookings ? '/dashboard' : null,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="staff"
        options={{
          title: 'Manage',
          href: canManageBookings ? '/staff' : null,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'clipboard' : 'clipboard-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person-circle' : 'person-circle-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
