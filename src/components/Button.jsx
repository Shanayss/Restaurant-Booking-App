
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button(props) {
  return (
    <TouchableOpacity
      style={styles.loginButton}
      onPress={props.onPress}
    >
      <Text style={styles.loginButtonText}>
        {props.buttonText}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
