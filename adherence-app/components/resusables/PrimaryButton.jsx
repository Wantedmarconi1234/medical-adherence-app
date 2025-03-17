import { TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";

export default function PrimaryButton({ title, onPress, buttonStyle, textStyle }) {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF", // Default blue color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff", // Default white text
    fontSize: 16,
    fontWeight: "bold",
  },
});
