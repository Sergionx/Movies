import { UserCredential } from "@firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Client } from "../interfaces/Client";

import { auth, db, googleAuthProvider } from "./config";

export function createUser(client: Client, password: string) {
  const collectionRef = collection(db, "users");
  console.log("Creating user", client.email);
  createUserWithEmailAndPassword(auth, client.email, password).then(
    (userCredential) => {
      const user = userCredential.user;

      const clientRef = doc(collectionRef, user.uid);
      setDoc(clientRef, client);
      console.log("User created", user.uid);
    }
  );
}

export async function signIn(
  email: string,
  password: string
): Promise<UserCredential | null> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    console.log("result", result);
  } catch (error) {
    console.log("error", error);
  }
}

export async function getUserById(userId: string): Promise<Client> {
  const collectionRef = collection(db, "users");

  const document = await getDoc(doc(collectionRef, userId));
  const client = document.data()!;
  return client as Client;
}
