import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    const cleanName = fullName.trim();
    const cleanEmail = email.trim();

    // 1. Validation: Empty fields
    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    // 2. Validation: Email Format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // 3. Validation: Password length
    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }

    // 4. Validation: Passwords match
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match. Please try again.");
      return;
    }

    // Success Action
    Alert.alert("Account Created", "Welcome! Redirecting to login...", [
      { text: "OK", onPress: () => router.replace("/") },
    ]);
  };

  return (
    <LinearGradient
      colors={["#3d1916", "#702823", "#5b1c1c", "#07100d"]}
      locations={[0, 0.35, 0.7, 1]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.container}>
            <BlurView intensity={35} tint="dark" style={styles.card}>
              <View style={styles.header}>
                <Image
                  source={require("../../assets/images/resto-name.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.title}>Create Account</Text>

              {/* Name Field */}
              <View style={styles.field}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={21} color="#68716e" />
                  <TextInput
                    style={styles.input}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Juan Dela Cruz"
                    placeholderTextColor="#626b68"
                  />
                </View>
              </View>

              {/* Email Field */}
              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={21} color="#68716e" />
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@table.com"
                    placeholderTextColor="#626b68"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Field */}
              <View style={styles.field}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={21} color="#68716e" />
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor="#626b68"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={21}
                      color="#68716e"
                    />
                  </Pressable>
                </View>
              </View>

              {/* Confirm Password Field */}
              <View style={styles.field}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="shield-checkmark-outline" size={21} color="#68716e" />
                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="••••••••"
                    placeholderTextColor="#626b68"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Sign Up Button */}
              <Button buttonText={"Sign Up"} onPress={handleSignUp} />

              {/* Back to Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <Pressable onPress={() => router.back()}>
                  <Text style={styles.loginLink}>Log In</Text>
                </Pressable>
              </View>
            </BlurView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  gradient: { flex: 1 },
  keyboardView: { flex: 1 },
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  card: {
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: "rgba(55, 40, 40, 0.48)",
    borderWidth: 1,
    borderColor: "rgba(104, 116, 109, 0.32)",
    borderRadius: 11,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  header: { marginBottom: 10 },
  logo: { width: "100%", height: 70 },
  title: {
    color: "#fffaf6",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  field: { marginBottom: 14 },
  label: { color: "#b7c0bc", fontSize: 14, marginBottom: 6 },
  inputContainer: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "rgba(10, 18, 15, 0.57)",
    borderWidth: 1.4,
    borderColor: "rgba(76, 88, 82, 0.72)",
    borderRadius: 14,
  },
  input: { flex: 1, color: "#f2eee8", fontSize: 16, marginLeft: 10 },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  loginText: { color: "#aab4b0", fontSize: 14 },
  loginLink: { color: "#d9ae75", fontSize: 14, fontWeight: "600" },
});