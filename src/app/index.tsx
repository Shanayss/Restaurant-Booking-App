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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const cleanEmail = email.trim();
    setErrorMessage('');

    if (!cleanEmail || !password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }

    router.replace('/home');
  };

  return (
    <AuthScreen
      keyboardBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      contentStyle={styles.screenContent}
    >
      <SurfaceCard blurred style={styles.card}>
        <View style={styles.header}>
          <BrandLogo style={styles.logo} />
        </View>

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
          returnKeyType="next"
        />

        <InputField
          label="Password"
          iconName="lock-closed-outline"
          fieldStyle={styles.field}
          labelAccessory={
            <Pressable onPress={() => router.push('/forgot-pass')} hitSlop={8}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>
          }
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage('');
          }}
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
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

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <Button
          title="Log In"
          style={styles.loginButton}
          textStyle={styles.loginButtonText}
          onPress={handleLogin}
        />

        <Divider label="or" style={styles.divider} />

        <Button
          title="Continue with Google"
          variant="secondary"
          icon={<Text style={styles.googleG}>G</Text>}
          style={styles.googleButton}
          textStyle={styles.googleText}
          onPress={() => Alert.alert('Google Login')}
        />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>New to Resto Grill? </Text>
          <Pressable onPress={() => router.push('/sign-up')} hitSlop={8}>
            <Text style={styles.signupLink}>Create an account</Text>
          </Pressable>
        </View>
      </SurfaceCard>

      <Text style={styles.trustedText}>Where the grill meets great taste.</Text>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 27,
    paddingBottom: 23,
  },
  header: {
    marginBottom: 29,
  },
  logo: {
    width: '100%',
    height: 100,
    marginBottom: 5,
  },
  field: {
    marginBottom: 18,
  },
  inputContainer: {
    height: 58,
  },
  input: {
    fontSize: 17,
    marginLeft: 13,
  },
  forgotText: {
    color: '#CFA04A',
    fontSize: 15,
    marginBottom: 8,
  },
  eyeButton: {
    paddingHorizontal: 4,
    marginLeft: 5,
  },
  errorText: {
    color: '#d98275',
    fontSize: 14,
    marginBottom: 12,
    marginTop: -4,
  },
  loginButton: {
    height: 59,
    marginTop: 2,
  },
  loginButtonText: {
    fontSize: 19,
    fontWeight: '500',
  },
  divider: {
    marginVertical: 21,
  },
  googleButton: {
    height: 58,
  },
  googleG: {
    color: '#f4f0e9',
    fontSize: 25,
    fontWeight: '700',
  },
  googleText: {
    color: '#f0ede7',
    fontSize: 17,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  signupText: {
    color: '#aab4b0',
    fontSize: 14,
  },
  signupLink: {
    color: '#d9ae75',
    fontSize: 14,
    fontWeight: '600',
  },
  trustedText: {
    color: 'rgba(120, 132, 126, 0.65)',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
  },
});
