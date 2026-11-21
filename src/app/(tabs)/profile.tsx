import Button from "@/components/Button";
import InputField from "@/components/InputField";
import ScreenBackground from "@/components/ScreenBackground";
import SurfaceCard from "@/components/SurfaceCard";
import { useUserContext } from "@/context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function CustomerProfileScreen() {
  const { user, signOut, updateProfile } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleStartEdit = () => {
    if (!user) {
      return;
    }
    setName(user.name);
    setEmail(user.email);
    setErrorMessage("");
    setSuccessMessage("");
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setErrorMessage("Enter your name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage("Enter a valid email address.");
      return;
    }

    const updateError = updateProfile({
      name: trimmedName,
      email: trimmedEmail,
    });

    if (updateError) {
      setErrorMessage(updateError);
      return;
    }

    setIsEditing(false);
    setErrorMessage("");
    setSuccessMessage("Profile details updated.");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrorMessage("");
  };

  const handleLogout = () => {
    setIsEditing(false);
    setErrorMessage("");
    setSuccessMessage("");
    signOut();
    router.replace("/");
  };

  return (
    <ScreenBackground edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>MY PROFILE</Text>
        {user ? (
          <SurfaceCard variant="solid" style={styles.profileCard}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={38} color="#CFA04A" />
            </View>
            {isEditing ? (
              <View style={styles.formContainer}>
                <InputField
                  label="Full name"
                  iconName="person-outline"
                  value={name}
                  onChangeText={(value) => {
                    setName(value);
                    setErrorMessage("");
                  }}
                  placeholder="Enter your name"
                />
                <InputField
                  label="Email address"
                  iconName="mail-outline"
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    setErrorMessage("");
                  }}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errorMessage ? (
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}
                <Button
                  title="Save Changes"
                  style={styles.actionButton}
                  onPress={handleSaveProfile}
                />
                <Button
                  title="Cancel"
                  variant="plain"
                  textStyle={styles.cancelText}
                  style={styles.cancelButton}
                  onPress={handleCancelEdit}
                />
              </View>
            ) : (
              <>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.email}>{user.email}</Text>
                {successMessage ? (
                  <Text style={styles.successMessage}>{successMessage}</Text>
                ) : null}
                <Button
                  title="Edit Profile"
                  style={styles.actionButton}
                  onPress={handleStartEdit}
                />
                <Button
                  title="Log Out"
                  style={styles.logoutButton}
                  onPress={handleLogout}
                />
              </>
            )}
          </SurfaceCard>
        ) : (
          <SurfaceCard variant="solid" style={styles.profileCard}>
            <Text style={styles.notFoundText}>
              Log in to view your profile.
            </Text>
            <Button
              title="Log In"
              style={styles.actionButton}
              onPress={() => router.replace("/")}
            />
          </SurfaceCard>
        )}
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  headerTitle: {
    color: "#fffaf6",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 18,
  },
  profileCard: {
    alignItems: "center",
    padding: 24,
    marginTop: 24,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(207, 160, 74, 0.14)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  formContainer: {
    width: "100%",
  },
  name: {
    color: "#fffaf6",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  label: {
    color: "#aab4b0",
    fontSize: 13,
    marginTop: 24,
  },
  email: {
    color: "#CFA04A",
    fontSize: 16,
    marginTop: 6,
  },
  errorMessage: {
    color: "#d98275",
    fontSize: 13,
    marginBottom: 8,
  },
  successMessage: {
    color: "#a6d6ad",
    fontSize: 13,
    marginTop: 12,
    textAlign: "center",
  },
  actionButton: {
    width: "100%",
    marginTop: 20,
  },
  logoutButton: {
    width: "100%",
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 8,
    alignSelf: "center",
  },
  cancelText: {
    color: "#aab4b0",
    fontSize: 13,
  },
  notFoundText: {
    color: "#fffaf6",
    fontSize: 16,
    textAlign: "center",
  },
});
