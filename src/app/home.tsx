
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.text}>
        home screen ni
      </Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.loginText}>
          Back to Log In
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7F2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  text: {
    fontSize: 24,
    fontWeight: '700',
    color: '#28221F',
    marginBottom: 25,
  },

  loginButton: {
    backgroundColor: '#B73526',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
  },

  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
