import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Button from '@/components/Button';
import ScreenBackground from '@/components/ScreenBackground';
import SurfaceCard from '@/components/SurfaceCard';
import { useUserContext } from '@/context/UserContext';

export default function CustomerProfileScreen() {
  const { user, signOut } = useUserContext();

  const handleLogout = () => {
    signOut();
    router.replace('/');
  };

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>MY PROFILE</Text>
        {user ? (
          <SurfaceCard variant="solid" style={styles.profileCard}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={38} color="#CFA04A" />
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.label}>Customer email</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Button
              title="Log Out"
              style={styles.loginButton}
              onPress={handleLogout}
            />
          </SurfaceCard>
        ) : (
          <SurfaceCard variant="solid" style={styles.profileCard}>
            <Text style={styles.notFoundText}>Log in to view your profile.</Text>
            <Button
              title="Log In"
              style={styles.loginButton}
              onPress={() => router.replace('/')}
            />
          </SurfaceCard>
        )}
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#fffaf6',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 18,
  },
  profileCard: {
    alignItems: 'center',
    padding: 24,
    marginTop: 24,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(207, 160, 74, 0.14)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    color: '#fffaf6',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  label: {
    color: '#aab4b0',
    fontSize: 13,
    marginTop: 24,
  },
  email: {
    color: '#CFA04A',
    fontSize: 16,
    marginTop: 6,
  },
  notFoundText: {
    color: '#fffaf6',
    fontSize: 16,
    textAlign: 'center',
  },
  loginButton: {
    width: '100%',
    marginTop: 20,
  },
});
