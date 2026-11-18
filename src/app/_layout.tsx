import { Stack } from 'expo-router';
import UserProvider from '@/context/UserProvider';

export default function Layout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="forgot-pass" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="[id]" />
      </Stack>
    </UserProvider>
  );
}