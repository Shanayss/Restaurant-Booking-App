
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
});

