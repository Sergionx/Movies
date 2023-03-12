import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import {
  createUser,
  getUserById,
  signIn,
  signInWithFacebook,
  signInWithGoogle,
} from "../firebase/api";
import { auth } from "../firebase/config";
import { Client } from "../interfaces/Client";
import { IAuthProvider } from "../interfaces/providers/IAuthProvider";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthContext = createContext<IAuthProvider>({
  user: null,
  loading: true,
  login: (email: string, password: string) => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },
  register: (client: Client, password: string) => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },
  logout: () => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },
  loginWithGoogle: (client?: Client) => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },
  loginWithFacebook: (client?: Client) => {
    console.log("no estas usando la funcion que es");
    return new Promise(() => {});
  },
});

function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (!currentUser) {
          setLoading(false);
          console.log("No hay usuario", loading);
          return;
        }
        setLoading(true);
        getUserById(currentUser?.uid || "").then((user) => {
          setUser(user);
          setLoading(false);
          console.log("loading", loading);
        });
      } catch (error) {
        console.log(error);
      }
    });

    return () => unsubuscribe();
  }, []);

  async function login(
    email: string,
    password: string
  ): Promise<UserCredential | null> {
    console.log("login", email, password);
    return signIn(email, password);
  }

  async function register(
    client: Client,
    password: string
  ): Promise<UserCredential | null> {
    return createUser(client, password);
  }

  async function logout() {
    auth.signOut();
    setUser(null);
  }

  async function loginWithGoogle() {
    return signInWithGoogle();
  }

  async function loginWithFacebook() {
    return signInWithFacebook();
  }

  const value: IAuthProvider = {
    user,
    loading,
    login,
    register,
    logout,
    loginWithGoogle,
    loginWithFacebook,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
