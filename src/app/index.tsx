
import React, { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

export default function LoginScreen() {
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Login function
  const handleLogin = () => {
    const cleanEmail = email.trim();

    // Check if fields are empty
    if (!cleanEmail || !password) {
      Alert.alert(
        "Missing Information",
        "Please enter your email and password."
      );
      return;
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    // Check password length
    if (password.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Password must contain at least 6 characters."
      );
      return;
    }

    // Go to home screen
    router.replace("/home");
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
            <BlurView
              intensity={35}
              tint="dark"
              style={styles.card}
            >
              {/* Header */}
              <View style={styles.header}>
              <Image
                source={require("../../assets/images/resto-name.png")} style={styles.logo}
                resizeMode="contain"
              />
              </View>

              {/* Email */}
              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>

                <View style={styles.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={21}
                    color="#68716e"
                  />

                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@table.com"
                    placeholderTextColor="#626b68"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                  />
                </View>
              </View>

              {/* Password */}
              <View style={styles.field}>
                <View style={styles.passwordHeader}>
                  <Text style={styles.label}>Password</Text>

                  <Pressable
                    onPress={() => router.push("/forgot-pass")}
                    hitSlop={8}
                  >
                    <Text style={styles.forgotText}>
                      Forgot password?
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.inputContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={21}
                    color="#68716e"
                  />

                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor="#626b68"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                  />

                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={10}
                    style={styles.eyeButton}
                  >
                    <Ionicons
                      name={
                        showPassword
                          ? "eye-outline"
                          : "eye-off-outline"
                      }
                      size={21}
                      color="#68716e"
                    />
                  </Pressable>
                </View>
              </View>

              {/* Login Button */}
              <Pressable
                onPress={handleLogin}
                style={({ pressed }) => [
                  styles.loginButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.loginButtonText}>
                  Log In
                </Text>
              </Pressable>

              {/* Divider */}
              <View style={styles.orContainer}>
                <View style={styles.line} />

                <Text style={styles.orText}>or</Text>

                <View style={styles.line} />
              </View>

              {/* Google Button */}
              <Pressable
                onPress={() =>
                  Alert.alert(
                    "Google Login",
                    "Google authentication can be connected here."
                  )
                }
                style={({ pressed }) => [
                  styles.googleButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.googleG}>G</Text>

                <Text style={styles.googleText}>
                  Continue with Google
                </Text>
              </Pressable>

              {/* Sign Up */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  New to Resto Grill?{" "}
                </Text>

                <Pressable
                  onPress={() => router.push("/sign-up")}
                  hitSlop={8}
                >
                  <Text style={styles.signupLink}>
                    Create an account
                  </Text>
                </Pressable>
              </View>
            </BlurView>

            {/* Bottom Text */}
            <Text style={styles.trustedText}>
              Where the grill meets great taste.
            </Text>
          </View>
        </KeyboardAvoidingView>
         </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Screen
  safeArea: {
    flex: 1,
  },

  gradient: {
    flex: 1,
  },

  keyboardView: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  // Card
  card: {
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: "rgba(55, 40, 40, 0.48)",
    borderWidth: 1,
    borderColor: "rgba(104, 116, 109, 0.32)",
    borderRadius: 11,
    paddingHorizontal: 20,
    paddingTop: 27,
    paddingBottom: 23,
  },

  // Header
  header: {
    marginBottom: 29,
  },

  headerText: {
    flex: 1,
    paddingRight: 10,
  },


  // Logo
  logo: {
    width: "100%",
    height: 100,
    marginBottom: 5,
  },

  // Form
  field: {
    marginBottom: 18,
  },

  label: {
    color: "#b7c0bc",
    fontSize: 16,
    marginBottom: 8,
  },

  passwordHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  forgotText: {
    color: "#CFA04A",
    fontSize: 15,
    marginBottom: 8,
  },

  // Input
  inputContainer: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "rgba(10, 18, 15, 0.57)",
    borderWidth: 1.4,
    borderColor: "rgba(76, 88, 82, 0.72)",
    borderRadius: 16,
  },

  input: {
    flex: 1,
    color: "#f2eee8",
    fontSize: 17,
    marginLeft: 13,
    paddingVertical: 0,
  },

  eyeButton: {
    padding: 4,
    marginLeft: 5,
  },

  // Buttons
  loginButton: {
    height: 59,
    backgroundColor: "#CFA04A",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },

  loginButtonText: {
    color: "#101512",
    fontSize: 19,
    fontWeight: "500",
  },

  pressed: {
    opacity: 0.72,
  },

  // Divider
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 21,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(88, 100, 94, 0.55)",
  },

  orText: {
    color: "#858e8a",
    fontSize: 16,
    marginHorizontal: 14,
  },

  // Google
  googleButton: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(11, 19, 16, 0.46)",
    borderWidth: 1.4,
    borderColor: "rgba(76, 88, 82, 0.72)",
    borderRadius: 16,
  },

  googleG: {
    color: "#f4f0e9",
    fontSize: 25,
    fontWeight: "700",
    marginRight: 13,
  },

  googleText: {
    color: "#f0ede7",
    fontSize: 17,
    fontWeight: "500",
  },

  // Sign Up
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 25,
  },

  signupText: {
    color: "#aab4b0",
    fontSize: 15,
  },

  signupLink: {
    color: "#d9ae75",
    fontSize: 15,
  },

  // Bottom Text
  trustedText: {
    color: "rgba(120, 132, 126, 0.65)",
    fontSize: 13,
    textAlign: "center",
    marginTop: 16,
  },
});

