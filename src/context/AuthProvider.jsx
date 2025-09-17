import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.init";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };


  const updateUser = (memberName)=>{
setLoading(true)
return updateProfile(auth.currentUser , {
  displayName : memberName
})
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("auth changes", currentUser);
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {

        try {
          await axios.post(
            "http://localhost:5000/jwt",
            { email: currentUser.email }, 
            { withCredentials: true } 
          );
          console.log("JWT cookie set ");
        } catch (err) {
          console.error("JWT fetch failed ", err);
        }
      } else {

        await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    loading,
    createUser,
    signInUser,
    signOutUser,
    user,
    updateUser
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};
export default AuthProvider;
