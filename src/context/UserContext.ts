import { createContext, useContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = "customer" | "staff" | "admin";

export interface ReservationDetails {
  date: string;
  time: string;
  guestCount: number;
  specialRequests: string;
}

export interface Reservation extends ReservationDetails {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  dishIds: string[];
  status: "pending" | "confirmed" | "cancelled";
}

export interface ProfileUpdateDetails {
  name: string;
  email: string;
}

export interface UserContextValue {
  user: User | null;
  favoriteItemIds: string[];
  draftDishIds: string[];
  reservations: Reservation[];
  signIn: (user: User) => void;
  signOut: () => void;
  updateProfile: (details: ProfileUpdateDetails) => void;
  updateReservationStatus: (
    reservationId: string,
    status: Reservation["status"],
  ) => void;
  toggleFavorite: (itemId: string) => void;
  addDishToBooking: (dishId: string) => void;
  removeDishFromBooking: (dishId: string) => void;
  finalizeBooking: (details: ReservationDetails) => void;
}

export const UserContext = createContext<UserContextValue | null>(null);

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider.");
  }

  return context;
}
