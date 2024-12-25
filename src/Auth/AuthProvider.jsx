import React, { useState, createContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "../Firebase/Firebase.config";
import axios from "axios";

const auth = Auth;
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createNewUser = async (email, password, displayName, photoURL) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);

      // Store the user in the database
      await axios.post("https://a11server.vercel.app/user", {
        email,
        displayName,
        photoURL,
      });

      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const ProfileUpdate = async (displayName, photoURL) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);

      // Store the user in the database
      await axios.post("https://a11server.vercel.app/user", {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      toast.success("Google login successful!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      // console.error("Login error:", error.message);
      toast.error("Please input valid email or password");
    } finally {
      setLoading(false);
    }
  };


  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Sign-out successful.");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        await axios.post(
          "https://a11server.vercel.app/jwt",
          { email: currentUser?.email },
          { withCredentials: true }
        );
      } else {
        setUser(currentUser);
        await axios.get("https://a11server.vercel.app/logout", { withCredentials: true });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    createNewUser,
    loginWithGoogle,
    logout,
    loading,
    ProfileUpdate,
    login
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;