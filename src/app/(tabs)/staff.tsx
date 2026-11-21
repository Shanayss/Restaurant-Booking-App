import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '@/components/Button';
import ScreenBackground from '@/components/ScreenBackground';
import SurfaceCard from '@/components/SurfaceCard';
import { useUserContext } from '@/context/UserContext';
import { MENU_ITEMS } from '@/data/menuData';

export default function StaffBookingsScreen() {
  const { user, reservations, updateReservationStatus } = useUserContext();
  const canManageBookings = user?.role === 'staff' || user?.role === 'admin';
  const sortedReservations = [...reservations].sort((a, b) =>
    `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
  );

  if (!canManageBookings) {
    return (
      <ScreenBackground edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          <SurfaceCard variant="solid" style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Staff access required</Text>
            <Text style={styles.emptyText}>
              Sign in with a staff or admin account to manage reservations.
            </Text>
            <Button
              title="Go to Home"
              style={styles.homeButton}
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
        <Text style={styles.title}>STAFF BOOKINGS</Text>
        <Text style={styles.subtitle}>
          {reservations.length}{' '}
          {reservations.length === 1 ? 'reservation' : 'reservations'}
        </Text>

        {sortedReservations.length > 0 ? (
          sortedReservations.map((reservation) => (
            <SurfaceCard
              key={reservation.id}
              variant="solid"
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <View style={styles.guestInfo}>
                  <Text style={styles.customerName}>
                    {reservation.customerName}
                  </Text>
                  <Text style={styles.email}>{reservation.customerEmail}</Text>
                </View>
                <Text
                  style={[
                    styles.status,
                    reservation.status === 'confirmed' && styles.confirmed,
                    reservation.status === 'cancelled' && styles.cancelled,
                  ]}
                >
                  {reservation.status.toUpperCase()}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={17} color="#CFA04A" />
                <Text style={styles.detailText}>
                  {new Date(
                    `${reservation.date}T00:00:00`,
                  ).toLocaleDateString()}{' '}
                  at {reservation.time}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="people-outline" size={17} color="#CFA04A" />
                <Text style={styles.detailText}>
                  {reservation.guestCount}{' '}
                  {reservation.guestCount === 1 ? 'guest' : 'guests'}
                </Text>
              </View>

              {reservation.dishIds.map((dishId) => {
                const dish = MENU_ITEMS.find((item) => item.id === dishId);
                return dish ? (
                  <Text key={dish.id} style={styles.dish}>
                    {dish.name} · {dish.price}
                  </Text>
                ) : null;
              })}
              {reservation.specialRequests ? (
                <Text style={styles.request}>
                  Request: {reservation.specialRequests}
                </Text>
              ) : null}

              {reservation.status !== 'cancelled' ? (
                <View style={styles.actions}>
                  {reservation.status !== 'confirmed' ? (
                    <Button
                      title="Confirm"
                      size="medium"
                      style={styles.actionButton}
                      onPress={() =>
                        updateReservationStatus(reservation.id, 'confirmed')
                      }
                    />
                  ) : null}
                  <Button
                    title="Cancel"
                    variant="secondary"
                    size="medium"
                    textStyle={styles.cancelText}
                    style={styles.actionButton}
                    onPress={() =>
                      updateReservationStatus(reservation.id, 'cancelled')
                    }
                  />
                </View>
              ) : null}
            </SurfaceCard>
          ))
        ) : (
          <SurfaceCard variant="solid" style={styles.emptyCard}>
            <Ionicons name="calendar-clear-outline" size={34} color="#CFA04A" />
            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptyText}>
              Customer reservations will appear here when they are made in
              this app session.
            </Text>
          </SurfaceCard>
        )}
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 12,
  },
  card: {
    padding: 16,
    marginTop: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  guestInfo: {
    flex: 1,
    paddingRight: 8,
  },
  customerName: {
    color: '#fffaf6',
    fontSize: 17,
    fontWeight: '700',
  },
  email: {
    color: '#aab4b0',
    fontSize: 13,
    marginTop: 3,
  },
  status: {
    color: '#CFA04A',
    fontSize: 11,
    fontWeight: '700',
  },
  confirmed: {
    color: '#a6d6ad',
  },
  cancelled: {
    color: '#d98275',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  detailText: {
    color: '#fffaf6',
    fontSize: 14,
  },
  dish: {
    color: '#aab4b0',
    fontSize: 14,
    marginTop: 8,
  },
  request: {
    color: '#aab4b0',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
  },
  cancelText: {
    color: '#d98275',
    fontSize: 16,
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
    marginTop: 10,
  },
  emptyText: {
    color: '#aab4b0',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 6,
  },
  homeButton: {
    width: '100%',
    marginTop: 18,
  },
});
