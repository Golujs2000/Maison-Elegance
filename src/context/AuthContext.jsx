import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { STORAGE_KEYS } from "../utils/constants";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local admin session fallback first
    const localSession = localStorage.getItem(STORAGE_KEYS.AUTH_ADMIN);
    if (localSession) {
      try {
        const parsed = JSON.parse(localSession);
        setUser(parsed);
      } catch (e) {
        console.error(e);
      }
    }

    // Listen to Firebase auth state
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || "Admin",
            photoURL: firebaseUser.photoURL,
          };
          setUser(userData);
          localStorage.setItem(STORAGE_KEYS.AUTH_ADMIN, JSON.stringify(userData));
        } else if (!localSession) {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // 1. Try Firebase Auth
      if (auth) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const userData = {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName || "Admin Curator",
        };
        setUser(userData);
        localStorage.setItem(STORAGE_KEYS.AUTH_ADMIN, JSON.stringify(userData));
        toast.success("Welcome back to Maison Élégance Admin");
        setLoading(false);
        return { success: true };
      }
    } catch (firebaseErr) {
      console.warn("Firebase Auth attempt notice:", firebaseErr.code);
      
      // 2. Friendly demo fallback if admin user not yet created in Firebase console
      // Allows user to test admin right away with admin@maisonelegance.com / admin123
      if (
        (email === "admin@maisonelegance.com" && password === "admin123") ||
        (email === "admin" && password === "admin")
      ) {
        const demoAdmin = {
          uid: "admin-master",
          email: "admin@maisonelegance.com",
          displayName: "Master Curator (Admin)",
        };
        setUser(demoAdmin);
        localStorage.setItem(STORAGE_KEYS.AUTH_ADMIN, JSON.stringify(demoAdmin));
        toast.success("Logged in as Administrator (Demo Passcode)");
        setLoading(false);
        return { success: true };
      }

      toast.error(firebaseErr.message || "Invalid credentials. Please verify your email and password.");
      setLoading(false);
      return { success: false, error: firebaseErr.message };
    }
  };

  const logout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH_ADMIN);
    toast.success("Signed out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: Boolean(user),
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
