
/* Previous placeholder implementation retained below for reference.
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

export default function ForgotPass() {
  return (
    <View style={styles.container}>

      <Text style={styles.text}>
        Forgot Password
      </Text>

      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          ← Return to Log In
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF7F2',
  },

  text: {
    fontSize: 28,
    fontWeight: '700',
    color: '#28221F',
  },

  button: {
    marginTop: 20,
  },

  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#B73526',
  },
}); */

import React, { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const handleReset = () => {
    const cleanEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    Alert.alert("Reset Link Sent", `Password reset instructions have been sent to ${cleanEmail}.`);
  };

  return (
    <LinearGradient colors={["#321714", "#1b100e", "#100a09"]} locations={[0, 0.48, 1]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <View style={styles.container}>
            <BlurView intensity={24} tint="dark" style={styles.card}>
              <Image source={require("../../assets/images/resto-name.png")} style={styles.logo} resizeMode="contain" />
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.description}>Enter your registered email address and we'll send you instructions to reset your dining password.</Text>
              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={22} color="#9c8d87" />
                  <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="example@table.com" placeholderTextColor="#776b67" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" returnKeyType="done" onSubmitEditing={handleReset} />
                </View>
              </View>
              <Pressable onPress={handleReset} style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}><Text style={styles.resetButtonText}>Send Reset Link</Text></Pressable>
              <View style={styles.divider}><View style={styles.line} /><Text style={styles.orText}>or</Text><View style={styles.line} /></View>
              <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
                <Ionicons name="arrow-back" size={22} color="#e8e1dc" /><Text style={styles.backButtonText}>Back to Log In</Text>
              </Pressable>
              <View style={styles.supportRow}>
                <Text style={styles.supportText}>Having trouble? </Text>
                <Pressable onPress={() => Alert.alert("Concierge Support", "Support will be available here soon.")}><Text style={styles.supportLink}>Contact concierge support</Text></Pressable>
              </View>
            </BlurView>
            <Text style={styles.tagline}>“Where the grill meets great taste.”</Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 }, safeArea: { flex: 1 }, keyboardView: { flex: 1 },
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 28 },
  card: { overflow: "hidden", backgroundColor: "rgba(34, 19, 17, 0.72)", borderWidth: 1.5, borderColor: "rgba(127, 91, 77, 0.33)", borderRadius: 28, paddingHorizontal: 28, paddingTop: 38, paddingBottom: 34 },
  logo: { width: "100%", height: 120, marginBottom: 22 },
  title: { color: "#fffaf6", fontSize: 32, fontWeight: "700", textAlign: "center" },
  description: { color: "#ab9a94", fontSize: 16, lineHeight: 24, textAlign: "center", marginTop: 18, marginBottom: 34 },
  field: { marginBottom: 28 }, label: { color: "#c0afa8", fontSize: 16, marginBottom: 10 },
  inputContainer: { height: 64, flexDirection: "row", alignItems: "center", paddingHorizontal: 19, backgroundColor: "rgba(15, 9, 8, 0.42)", borderWidth: 1.5, borderColor: "rgba(127, 91, 77, 0.35)", borderRadius: 18 },
  input: { flex: 1, color: "#f7efeb", fontSize: 17, marginLeft: 14, paddingVertical: 0 },
  resetButton: { height: 64, borderRadius: 18, justifyContent: "center", alignItems: "center", backgroundColor: "#c99852" }, resetButtonText: { color: "#21150f", fontSize: 19, fontWeight: "700" },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 28 }, line: { flex: 1, height: 1, backgroundColor: "rgba(127, 91, 77, 0.34)" }, orText: { color: "#aa9791", fontSize: 16, marginHorizontal: 18 },
  backButton: { height: 64, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 18, borderWidth: 1.5, borderColor: "rgba(127, 91, 77, 0.35)" }, backButtonText: { color: "#eee6e2", fontSize: 18, fontWeight: "600", marginLeft: 12 },
  supportRow: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginTop: 34 }, supportText: { color: "#a79690", fontSize: 15 }, supportLink: { color: "#d2a152", fontSize: 15, fontWeight: "600" },
  tagline: { color: "rgba(201, 182, 174, 0.62)", fontSize: 16, fontStyle: "italic", fontWeight: "600", textAlign: "center", marginTop: 28 }, pressed: { opacity: 0.72 },
});

