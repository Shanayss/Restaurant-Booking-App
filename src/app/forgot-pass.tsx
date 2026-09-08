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

import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPass() { 
  const [email, setEmail] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleReset = () => { 
    const cleanEmail = email.trim(); 

    setErrorMessage(""); 
    
    if (!cleanEmail) { 
      setErrorMessage("Please enter your email address."); 
      return; 
    } 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) { 
      setErrorMessage("Please enter a valid email address."); 
      return; 
    } 
    
    Alert.alert( 
      "Reset Link Sent", 
      `Password reset instructions have been sent to ${cleanEmail}.` 
    ); 
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
            {/* Card */}
            <BlurView
              intensity={35}
              tint="dark"
              style={styles.card}
            >

              {/* Logo */}
              <View style={styles.header}>
                <Image
                  source={require("../../assets/images/resto-name.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              {/* Title */}
              <Text style={styles.title}>
                Reset Password
              </Text>

              {/* Description */}
              <Text style={styles.description}>
                Enter your registered email address and we'll send
                you instructions to reset your dining password.
              </Text>

              {/* Email */}
              <View style={styles.field}>
                <Text style={styles.label}>
                  Email
                </Text>

                <View style={styles.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={21}
                    color="#68716e"
                  />

                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setErrorMessage("");
                    }}
                    placeholder="example@table.com"
                    placeholderTextColor="#626b68"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    returnKeyType="done"
                    onSubmitEditing={handleReset}
                  />
                </View>
              </View>

              {/* Error Message */}
              {errorMessage ? (
                <Text style={styles.errorText}>
                  {errorMessage}
                </Text>
              ) : null}
              
              {/* Send Reset Link Button */}
              <Button
                buttonText={"Send Reset Link"}
                onPress={handleReset}
              />

              {/* Divider */}
              <View style={styles.orContainer}>
                <View style={styles.line} />

                <Text style={styles.orText}>
                  or
                </Text>

                <View style={styles.line} />
              </View>

              {/* Back to Login */}
              <Pressable
                onPress={() => router.back()}
                style={({ pressed }) => [
                  styles.backButton,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons
                  name="arrow-back"
                  size={21}
                  color="#e8e1dc"
                />

                <Text style={styles.backButtonText}>
                  Back to Log In
                </Text>
              </Pressable>

              {/* Support */}
              <View style={styles.supportRow}>
                <Text style={styles.supportText}>
                  Having trouble?{" "}
                </Text>

                <Pressable
                  onPress={() =>
                    Alert.alert(
                      "Concierge Support",
                      "Support will be available here soon."
                    )
                  }
                >
                  <Text style={styles.supportLink}>
                    Contact concierge support
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
    alignItems: "center",
    paddingHorizontal: 20,
  },

  // Card
  card: {
    width: "100%",
    maxWidth: 420,
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
    marginBottom: 15,
  },

  // Logo
  logo: {
    width: "100%",
    height: 90,
    marginBottom: 5,
  },

  // Title
  title: {
    color: "#fffaf6",
    fontSize: 27,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  // Description
  description: {
    color: "#aab4b0",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 25,
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

  errorText: {
  color: "#d98275",
  fontSize: 14,
  marginBottom: 12,
  marginTop: -4,
  },

  // Back Button
  backButton: {
    height: 58,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(11, 19, 16, 0.46)",

    borderWidth: 1.4,
    borderColor: "rgba(76, 88, 82, 0.72)",

    borderRadius: 16,
  },

  backButtonText: {
    color: "#f0ede7",
    fontSize: 17,
    fontWeight: "500",
    marginLeft: 10,
  },

  // Support
  supportRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",

    marginTop: 25,
  },

  supportText: {
    color: "#aab4b0",
    fontSize: 15,
  },

  supportLink: {
    color: "#d9ae75",
    fontSize: 15,
  },

  // Pressed
  pressed: {
    opacity: 0.72,
  },

  // Bottom Text
  trustedText: {
    color: "rgba(120, 132, 126, 0.65)",
    fontSize: 13,
    textAlign: "center",
    marginTop: 16,
  },
});