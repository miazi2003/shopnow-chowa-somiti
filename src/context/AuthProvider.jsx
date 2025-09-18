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

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async () => {
    setLoading(true);
    await signOut(auth); // wait for Firebase sign out
    // setUser(null); // optional, onAuthStateChanged will handle it
    setLoading(false);
  };

  const updateUser = (displayName) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // logout হলে null হবে
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    loading,
    createUser,
    signInUser,
    signOutUser,
    user,
    updateUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
