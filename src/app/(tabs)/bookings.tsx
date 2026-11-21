import Button from '@/components/Button';
import InputField from '@/components/InputField';
import ScreenBackground from '@/components/ScreenBackground';
import SurfaceCard from '@/components/SurfaceCard';
import { useUserContext } from '@/context/UserContext';
import { MENU_ITEMS } from '@/data/menuData';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function BookingsScreen() {
  const {
    user,
    draftDishIds,
    reservations,
    removeDishFromBooking,
    finalizeBooking,
  } = useUserContext();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [specialRequests, setSpecialRequests] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const draftDishes = MENU_ITEMS.filter((item) =>
    draftDishIds.includes(item.id),
  );
  const userReservations = reservations.filter(
    (reservation) => reservation.userId === user?.id,
  );

  const handleFinalize = () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!user) {
      router.replace('/');
      return;
    }

    if (draftDishes.length === 0) {
      setErrorMessage('Add at least one dish before finalizing your booking.');
      return;
    }

    const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!dateMatch) {
      setErrorMessage('Enter a valid date using YYYY-MM-DD.');
      return;
    }

    const [, yearText, monthText, dayText] = dateMatch;
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    const selectedDate = new Date(year, month - 1, day);

    if (
      selectedDate.getFullYear() !== year ||
      selectedDate.getMonth() !== month - 1 ||
      selectedDate.getDate() !== day
    ) {
      setErrorMessage('Enter a real calendar date using YYYY-MM-DD.');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setErrorMessage('Choose today or a future date.');
      return;
    }

    if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      setErrorMessage('Enter a valid time using 24-hour format, such as 18:30.');
      return;
    }

    if (!/^[1-9]\d*$/.test(guestCount) || Number(guestCount) > 10) {
      setErrorMessage('Enter a guest count between 1 and 10.');
      return;
    }

    finalizeBooking({
      date,
      time,
      guestCount: Number(guestCount),
      specialRequests: specialRequests.trim(),
    });
    setDate('');
    setTime('');
    setGuestCount('2');
    setSpecialRequests('');
    setSuccessMessage('Your reservation has been finalized.');
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>MY BOOKINGS</Text>

        <Text style={styles.sectionTitle}>Selected dishes</Text>
        {draftDishes.length > 0 ? (
          draftDishes.map((dish) => (
            <SurfaceCard
              key={dish.id}
              variant="solid"
              style={styles.draftCard}
            >
              <View style={styles.draftDetails}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishPrice}>{dish.price}</Text>
              </View>
              <Button
                title="Remove"
                variant="plain"
                size="small"
                icon={
                  <Ionicons name="trash-outline" size={18} color="#d98275" />
                }
                textStyle={styles.removeText}
                accessibilityLabel={`Remove ${dish.name} from booking`}
                onPress={() => removeDishFromBooking(dish.id)}
              />
            </SurfaceCard>
          ))
        ) : (
          <Text style={styles.emptyMessage}>
            No dishes selected. Choose dishes from the menu before finalizing.
          </Text>
        )}

        <Text style={styles.sectionTitle}>Finalize reservation</Text>
        <SurfaceCard variant="solid" style={styles.formCard}>
          <InputField
            label="Booking date"
            iconName="calendar-outline"
            value={date}
            onChangeText={(value) => {
              setDate(value);
              setErrorMessage('');
              setSuccessMessage('');
            }}
            placeholder="YYYY-MM-DD"
            autoCapitalize="none"
          />
          <InputField
            label="Booking time (24-hour)"
            iconName="time-outline"
            value={time}
            onChangeText={(value) => {
              setTime(value);
              setErrorMessage('');
              setSuccessMessage('');
            }}
            placeholder="18:30"
            autoCapitalize="none"
          />
          <InputField
            label="Number of guests (1-10)"
            iconName="people-outline"
            value={guestCount}
            onChangeText={(value) => {
              setGuestCount(value);
              setErrorMessage('');
              setSuccessMessage('');
            }}
            placeholder="2"
            keyboardType="number-pad"
          />
          <InputField
            label="Special requests (optional)"
            iconName="chatbubble-ellipses-outline"
            value={specialRequests}
            onChangeText={(value) => {
              setSpecialRequests(value);
              setErrorMessage('');
              setSuccessMessage('');
            }}
            placeholder="Add a note for the restaurant"
            multiline
            inputContainerStyle={styles.notesInput}
            inputStyle={styles.notesText}
          />
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          {successMessage ? (
            <Text style={styles.successMessage}>{successMessage}</Text>
          ) : null}
          <Button
            title="Finalize Booking"
            icon={
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="#101512"
              />
            }
            style={styles.finalizeButton}
            onPress={handleFinalize}
          />
        </SurfaceCard>

        <Text style={styles.sectionTitle}>Finalized reservations</Text>
        {userReservations.length > 0 ? (
          userReservations.map((reservation) => (
            <SurfaceCard
              key={reservation.id}
              variant="solid"
              style={styles.reservationCard}
            >
              <Text
                style={[
                  styles.reservationStatus,
                  reservation.status === 'confirmed' && styles.confirmedStatus,
                  reservation.status === 'cancelled' && styles.cancelledStatus,
                ]}
              >
                {reservation.status.toUpperCase()}
              </Text>
              <Text style={styles.reservationDate}>
                {new Date(`${reservation.date}T00:00:00`).toLocaleDateString()}
                {' at '}
                {reservation.time}
              </Text>
              <Text style={styles.reservationGuests}>
                {reservation.guestCount}{' '}
                {reservation.guestCount === 1 ? 'guest' : 'guests'}
              </Text>
              {reservation.dishIds.map((dishId) => {
                const dish = MENU_ITEMS.find((item) => item.id === dishId);
                return dish ? (
                  <Text key={dish.id} style={styles.reservationDish}>
                    {dish.name} · {dish.price}
                  </Text>
                ) : null;
              })}
              {reservation.specialRequests ? (
                <Text style={styles.requestText}>
                  Note: {reservation.specialRequests}
                </Text>
              ) : null}
            </SurfaceCard>
          ))
        ) : (
          <Text style={styles.emptyMessage}>
            Your finalized reservations will appear here.
          </Text>
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
    paddingVertical: 18,
  },
  sectionTitle: {
    color: '#fffaf6',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 10,
  },
  draftCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
  },
  draftDetails: {
    flex: 1,
  },
  dishName: {
    color: '#fffaf6',
    fontSize: 15,
    fontWeight: '600',
  },
  dishPrice: {
    color: '#CFA04A',
    fontSize: 14,
    marginTop: 4,
  },
  removeText: {
    color: '#d98275',
    fontSize: 13,
  },
  emptyMessage: {
    color: '#aab4b0',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 8,
  },
  formCard: {
    padding: 16,
  },
  notesInput: {
    minHeight: 80,
    height: 80,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  notesText: {
    minHeight: 56,
    textAlignVertical: 'top',
  },
  errorMessage: {
    color: '#d98275',
    fontSize: 14,
    marginBottom: 12,
  },
  successMessage: {
    color: '#a6d6ad',
    fontSize: 14,
    marginBottom: 12,
  },
  finalizeButton: {
    marginTop: 4,
  },
  reservationCard: {
    padding: 16,
    marginBottom: 12,
  },
  reservationDate: {
    color: '#fffaf6',
    fontSize: 16,
    fontWeight: '700',
  },
  reservationStatus: {
    color: '#CFA04A',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 7,
  },
  confirmedStatus: {
    color: '#a6d6ad',
  },
  cancelledStatus: {
    color: '#d98275',
  },
  reservationGuests: {
    color: '#CFA04A',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 8,
  },
  reservationDish: {
    color: '#aab4b0',
    fontSize: 14,
    lineHeight: 22,
  },
  requestText: {
    color: '#aab4b0',
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 20,
    marginTop: 10,
  },
});
