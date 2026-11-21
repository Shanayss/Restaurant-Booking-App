import {
  UserContext,
  type ProfileUpdateDetails,
  type Reservation,
  type ReservationDetails,
  type User,
} from "@/context/UserContext";
import { STORED_CUSTOMERS } from "@/data/customerData";
import { STORED_STAFF } from "@/data/staffData";
import { useState, type ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [favoriteItemIds, setFavoriteItemIds] = useState<string[]>([]);
  const [draftDishIds, setDraftDishIds] = useState<string[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const updateProfile = (details: ProfileUpdateDetails) => {
    if (!user) {
      return "Log in to update your profile.";
    }

    const accounts = [...STORED_CUSTOMERS, ...STORED_STAFF];
    const emailTaken = accounts.some(
      (account) =>
        account.id !== user.id &&
        account.email.toLowerCase() === details.email.toLowerCase(),
    );

    if (emailTaken) {
      return "That email is already used by another account.";
    }

    const storedAccount = accounts.find((account) => account.id === user.id);

    if (storedAccount) {
      storedAccount.name = details.name;
      storedAccount.email = details.email;
    }

    setUser({
      ...user,
      name: details.name,
      email: details.email,
    });
    setReservations((currentReservations) =>
      currentReservations.map((reservation) =>
        reservation.userId === user.id
          ? {
              ...reservation,
              customerName: details.name,
              customerEmail: details.email,
            }
          : reservation,
      ),
    );

    return null;
  };

  const toggleFavorite = (itemId: string) => {
    setFavoriteItemIds((currentIds) =>
      currentIds.includes(itemId)
        ? currentIds.filter((currentId) => currentId !== itemId)
        : [...currentIds, itemId],
    );
  };

  const addDishToBooking = (dishId: string) => {
    setDraftDishIds((currentIds) =>
      currentIds.includes(dishId) ? currentIds : [...currentIds, dishId],
    );
  };

  const removeDishFromBooking = (dishId: string) => {
    setDraftDishIds((currentIds) =>
      currentIds.filter((currentId) => currentId !== dishId),
    );
  };

  const finalizeBooking = (details: ReservationDetails) => {
    if (!user || draftDishIds.length === 0) {
      return;
    }

    setReservations((currentReservations) => [
      ...currentReservations,
      {
        ...details,
        id: `${user.id}-${Date.now()}`,
        userId: user.id,
        customerName: user.name,
        customerEmail: user.email,
        dishIds: [...draftDishIds],
        status: "pending",
      },
    ]);
    setDraftDishIds([]);
  };

  const updateReservationStatus = (
    reservationId: string,
    status: Reservation["status"],
  ) => {
    setReservations((currentReservations) =>
      currentReservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status }
          : reservation,
      ),
    );
  };

  return (
    <UserContext.Provider
      value={{
        user,
        favoriteItemIds,
        draftDishIds,
        reservations,
        signIn: setUser,
        signOut: () => setUser(null),
        updateProfile,
        updateReservationStatus,
        toggleFavorite,
        addDishToBooking,
        removeDishFromBooking,
        finalizeBooking,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
