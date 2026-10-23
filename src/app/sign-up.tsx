import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AuthScreen from '@/components/AuthScreen';
import BrandLogo from '@/components/BrandLogo';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import SurfaceCard from '@/components/SurfaceCard';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleBackToLogin = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const handleSignUp = () => {
    const cleanName = fullName.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match. Please try again.');
      return;
    }

    router.replace('/home');
  };

  return (
    <AuthScreen keyboardBehavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SurfaceCard blurred style={styles.card}>
        <View style={styles.header}>
          <BrandLogo style={styles.logo} />
        </View>

        <Text style={styles.title}>Create Account</Text>

        <InputField
          label="Full Name"
          iconName="person-outline"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Juan Dela Cruz"
        />

        <InputField
          label="Email"
          iconName="mail-outline"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="example@table.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <InputField
          label="Password"
          iconName="lock-closed-outline"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          rightAccessory={
            <Button
              variant="plain"
              size="small"
              style={styles.eyeButton}
              icon={
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={21}
                  color="#68716e"
                />
              }
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <InputField
          label="Confirm Password"
          iconName="shield-checkmark-outline"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />

        <Button title="Sign Up" onPress={handleSignUp} />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Pressable onPress={handleBackToLogin}>
            <Text style={styles.loginLink}>Log In</Text>
          </Pressable>
        </View>
      </SurfaceCard>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  header: { marginBottom: 10 },
  logo: { width: '100%', height: 70 },
  title: {
    color: '#fffaf6',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
  },
  field: { marginBottom: 14 },
  label: { fontSize: 14, marginBottom: 6 },
  inputContainer: {
    height: 52,
    borderRadius: 14,
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
  },
  eyeButton: {
    paddingHorizontal: 4,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  loginText: { color: '#aab4b0', fontSize: 14 },
  loginLink: { color: '#d9ae75', fontSize: 14, fontWeight: '600' },
});
