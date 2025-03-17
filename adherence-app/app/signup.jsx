import { StyleSheet, Text, View, TextInput, StatusBar, SafeAreaView, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import PrimaryButton from "../components/resusables/PrimaryButton";
import useSignup from "../hooks/useSignup";

export default function Signup() {
  const { signupFunction, signupError, signupLoading } = useSignup();

  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes correctly
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    signupFunction(formData.email, formData.password);
    console.log("Signup form data", formData);
    router.push("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#007BFF" barStyle="light-content" />

      <View>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.welcomeParagraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
      </View>

      <TextInput 
        placeholder="Email" 
        style={styles.input}
        onChangeText={(text) => handleChange("email", text)}
        value={formData.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput 
        placeholder="Password" 
        style={styles.input}
        onChangeText={(text) => handleChange("password", text)}
        value={formData.password}
        secureTextEntry={true} // Correct way to hide password
      />

      {signupError && <Text style={styles.errorText}>{signupError}</Text>}

      {signupLoading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginVertical: 10 }} />
      ) : (
        <PrimaryButton 
          title="Signup"
          textStyle={{ fontWeight: "bold" }}
          buttonStyle={{ width: "100%", marginVertical: 20 }} 
          onPress={handleSubmit}
        />
      )}

      <Link href="login" style={styles.loginLink}>
        Login here
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: "#F8F8F8",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  welcomeParagraph: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    textAlign: "center",
  },
  loginLink: {
    textAlign: "center",
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 15,
  },
});
