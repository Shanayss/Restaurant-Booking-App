import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '@/components/Button';
import ScreenBackground from '@/components/ScreenBackground';
import SurfaceCard from '@/components/SurfaceCard';
import { useUserContext } from '@/context/UserContext';

export default function StaffDashboardScreen() {
  const { user, reservations } = useUserContext();
  const canManageBookings = user?.role === 'staff' || user?.role === 'admin';
  const pendingCount = reservations.filter(
    (reservation) => reservation.status === 'pending',
  ).length;
  const confirmedCount = reservations.filter(
    (reservation) => reservation.status === 'confirmed',
  ).length;
  const cancelledCount = reservations.filter(
    (reservation) => reservation.status === 'cancelled',
  ).length;
  const currentDate = new Date();
  const today = [
    currentDate.getFullYear(),
    String(currentDate.getMonth() + 1).padStart(2, '0'),
    String(currentDate.getDate()).padStart(2, '0'),
  ].join('-');
  const todayCount = reservations.filter(
    (reservation) =>
      reservation.date === today && reservation.status !== 'cancelled',
  ).length;

  if (!canManageBookings) {
    return (
      <ScreenBackground edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          <SurfaceCard variant="solid" style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Staff access required</Text>
            <Text style={styles.emptyText}>
              Sign in with a staff or admin account to view the dashboard.
            </Text>
            <Button
              title="Go to Home"
              style={styles.button}
              onPress={() => router.replace('/home')}
            />
          </SurfaceCard>
        </View>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>RESTAURANT DASHBOARD</Text>
        <Text style={styles.subtitle}>Welcome, {user?.name}</Text>

        <View style={styles.metricsGrid}>
          <SurfaceCard variant="solid" style={styles.metricCard}>
            <Ionicons name="calendar-outline" size={22} color="#CFA04A" />
            <Text style={styles.metricValue}>{reservations.length}</Text>
            <Text style={styles.metricLabel}>All bookings</Text>
          </SurfaceCard>
          <SurfaceCard variant="solid" style={styles.metricCard}>
            <Ionicons name="time-outline" size={22} color="#CFA04A" />
            <Text style={styles.metricValue}>{pendingCount}</Text>
            <Text style={styles.metricLabel}>Pending</Text>
          </SurfaceCard>
          <SurfaceCard variant="solid" style={styles.metricCard}>
            <Ionicons name="checkmark-circle-outline" size={22} color="#a6d6ad" />
            <Text style={styles.metricValue}>{confirmedCount}</Text>
            <Text style={styles.metricLabel}>Confirmed</Text>
          </SurfaceCard>
          <SurfaceCard variant="solid" style={styles.metricCard}>
            <Ionicons name="today-outline" size={22} color="#CFA04A" />
            <Text style={styles.metricValue}>{todayCount}</Text>
            <Text style={styles.metricLabel}>Today</Text>
          </SurfaceCard>
        </View>

        <SurfaceCard variant="solid" style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Reservation overview</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Awaiting confirmation</Text>
            <Text style={styles.summaryValue}>{pendingCount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Confirmed</Text>
            <Text style={styles.summaryValue}>{confirmedCount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Cancelled</Text>
            <Text style={styles.summaryValue}>{cancelledCount}</Text>
          </View>
          <Button
            title="Manage Bookings"
            icon={
              <Ionicons name="clipboard-outline" size={20} color="#101512" />
            }
            style={styles.button}
            onPress={() => router.push('/staff')}
          />
        </SurfaceCard>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  title: {
    color: '#fffaf6',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 18,
  },
  subtitle: {
    color: '#aab4b0',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '46%',
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
  metricValue: {
    color: '#fffaf6',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 8,
  },
  metricLabel: {
    color: '#aab4b0',
    fontSize: 13,
    marginTop: 3,
  },
  summaryCard: {
    padding: 18,
    marginTop: 18,
  },
  sectionTitle: {
    color: '#fffaf6',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(104, 116, 109, 0.3)',
  },
  summaryLabel: {
    color: '#aab4b0',
    fontSize: 14,
  },
  summaryValue: {
    color: '#fffaf6',
    fontSize: 14,
    fontWeight: '700',
  },
  button: {
    marginTop: 18,
  },
  emptyCard: {
    alignItems: 'center',
    padding: 24,
    marginTop: 20,
  },
  emptyTitle: {
    color: '#fffaf6',
    fontSize: 17,
    fontWeight: '700',
  },
  emptyText: {
    color: '#aab4b0',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 6,
  },
});
