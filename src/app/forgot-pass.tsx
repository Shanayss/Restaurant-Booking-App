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
import Divider from '@/components/Divider';
import InputField from '@/components/InputField';
import SurfaceCard from '@/components/SurfaceCard';

export default function ForgotPass() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleBackToLogin = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const handleReset = () => {
    const cleanEmail = email.trim();
    setErrorMessage('');

    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    Alert.alert(
      'Reset Link Sent',
      `Password reset instructions have been sent to ${cleanEmail}.`,
    );
  };

  return (
    <AuthScreen
      keyboardBehavior={Platform.OS === 'ios' ? 'padding' : undefined}
      contentStyle={styles.screenContent}
    >
      <SurfaceCard blurred style={styles.card}>
        <View style={styles.header}>
          <BrandLogo style={styles.logo} />
        </View>

        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.description}>
          Enter your registered email address and we'll send you instructions to
          reset your dining password.
        </Text>

        <InputField
          label="Email"
          iconName="mail-outline"
          fieldStyle={styles.field}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage('');
          }}
          placeholder="example@table.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          returnKeyType="done"
          onSubmitEditing={handleReset}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <Button title="Send Reset Link" onPress={handleReset} />

        <Divider label="or" />

        <Button
          title="Back to Log In"
          variant="secondary"
          icon={<Ionicons name="arrow-back" size={21} color="#e8e1dc" />}
          style={styles.backButton}
          textStyle={styles.backButtonText}
          onPress={handleBackToLogin}
        />

        <View style={styles.supportRow}>
          <Text style={styles.supportText}>Having trouble? </Text>
          <Pressable
            onPress={() =>
              Alert.alert(
                'Concierge Support',
                'Support will be available here soon.',
              )
            }
          >
            <Text style={styles.supportLink}>Contact concierge support</Text>
          </Pressable>
        </View>
      </SurfaceCard>

      <Text style={styles.trustedText}>Where the grill meets great taste.</Text>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 27,
    paddingBottom: 23,
  },
  header: { marginBottom: 15 },
  logo: {
    width: '100%',
    height: 90,
    marginBottom: 5,
  },
  title: {
    color: '#fffaf6',
    fontSize: 27,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    color: '#aab4b0',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 25,
  },
  field: {
    marginBottom: 18,
  },
  inputContainer: {
    height: 58,
    borderRadius: 16,
  },
  input: {
    fontSize: 17,
    marginLeft: 13,
  },
  errorText: {
    color: '#d98275',
    fontSize: 14,
    marginBottom: 12,
    marginTop: -4,
  },
  backButton: {
    height: 58,
  },
  backButtonText: {
    color: '#f0ede7',
    fontSize: 17,
    fontWeight: '500',
  },
  supportRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 25,
  },
  supportText: {
    color: '#aab4b0',
    fontSize: 15,
  },
  supportLink: {
    color: '#d9ae75',
    fontSize: 15,
  },
  trustedText: {
    color: 'rgba(120, 132, 126, 0.65)',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
  },
});
