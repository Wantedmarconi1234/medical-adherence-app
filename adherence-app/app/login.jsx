import { StyleSheet, Text, View, TextInput, StatusBar, SafeAreaView, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import PrimaryButton from "../components/resusables/PrimaryButton";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const { loginFunction, loginError, loginLoading } = useLogin();
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

  const handleSubmit = async () => {
    try {
      // Await login request
      const loggedInUser = await loginFunction(formData.email, formData.password);

      if (loggedInUser) {
        console.log("Login successful!", loggedInUser);
        router.replace("/"); // Redirect to home page
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#007BFF" barStyle="light-content" />
      <Text style={styles.text}>Log in</Text>

      <View>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.welcomeParagraph}>
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
        secureTextEntry={true} 
      />

      <Link href="/" style={styles.forgotPassword}>Forgotten password?</Link>

      {loginError && <Text style={styles.errorText}>{loginError}</Text>}

      {loginLoading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginVertical: 10 }} />
      ) : (
        <PrimaryButton
          title="Log in"
          textStyle={{ fontWeight: "bold" }}
          buttonStyle={{ width: "100%", marginVertical: 20 }}
          onPress={handleSubmit}
        />
      )}

      <Link href="signup" style={styles.signupLink}>Signup here</Link>
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
    fontSize: 20,
    marginTop: 10,
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
  forgotPassword: {
    textAlign: "right",
    color: "blue",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    textAlign: "center",
  },
  signupLink: {
    textAlign: "center",
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 15,
  },
});
