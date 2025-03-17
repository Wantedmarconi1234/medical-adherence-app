import { useState } from "react";
import { auth } from "../configuration";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function useLogin() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Login Function
  const loginFunction = async (email, password) => {
    setLoginLoading(true);
    setLoginError(null); // Reset error before new login attempt

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredentials.user);
      setIsLoggedIn(true);
      return userCredentials.user; // Return user so component can check if login is successful
    } catch (error) {
      setLoginError(error.message); // Store error message instead of object
      return null; // Return null if login fails
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout Function
  const logoutFunction = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return { isLoggedIn, loginError, loginLoading, user, loginFunction, logoutFunction };
}
