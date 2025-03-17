import React,{useState} from 'react'
import { auth } from "../configuration"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default function useSignup() {
const [user, setUser] = useState(null);
const [signup, setSignup] = useState(false);
const [signupError, setSignupError] = useState(null);
const [signupLoading, setSignupLoading] = useState(false);

 const signupFunction = async (email, password) => {
    setSignupLoading(true);
    try {
        // Make API request to login
        const useCredentials = await createUserWithEmailAndPassword(auth, email, password)
        setUser(useCredentials.user)
        setSignup(true);
    } catch (error) {
        setSignupError(error);
    } finally {
        setSignupLoading(false);
    }
}

  return {signup, signupError, signupLoading, user, signupFunction};
}
