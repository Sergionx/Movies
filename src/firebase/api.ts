import { FacebookAuthProvider, UserCredential } from "@firebase/auth";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Client } from "../interfaces/Client";
import { Movie } from "../interfaces/Movie";

import { auth, db, facebookAuthProvider, googleAuthProvider } from "./config";

// TODO - Usar pages para pagination
export async function getMovies(page: number): Promise<Movie[]> {
  const movies = (await (await axios.get(`/movie/popular?page=${page}`)).data)
    .results as Movie[];

  return movies;
}

export async function getMovieById(id: string): Promise<Movie> {
  const movie = (await (await axios.get(`/movie/${id}`)).data) as Movie;

  return movie;
}

export async function getMovieUpcoming(page: number): Promise<Movie[]> {
  const movies = (await (await axios.get(`/movie/upcoming?page=${page}`)).data)
    .results as Movie[];

  return movies;
}

export async function getSearchMovie(query: string): Promise<Movie[]> {
  const movies = (await (await axios.get(`/search/movie?query=${query}`)).data)
    .results as Movie[];

  return movies;
}

export function getMoviePoster(posterPath: string): string {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

export function createUser(
  client: Client,
  password: string
): Promise<UserCredential | null> {
  const collectionRef = collection(db, "users");
  console.log("Creating user", client.email);
  return createUserWithEmailAndPassword(auth, client.email, password).then(
    (userCredential) => {
      const user = userCredential.user;

      const clientRef = doc(collectionRef, user.uid);
      setDoc(clientRef, client);
      console.log("User created", user.uid);
      return userCredential;
    }
  ).catch((error) => {
    throw error;
  });
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

export async function signInWithGoogle(): Promise<UserCredential | null> {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const collectionRef = collection(db, "users");

    const document = await getDoc(doc(collectionRef, result.user?.uid));
    if (!document.exists()) {
      const client: Client = {
        email: result.user?.email ?? "",
        name: result.user?.displayName ?? "",
      }

      const clientRef = doc(collectionRef, result.user?.uid);
      setDoc(clientRef, client);
    }

    auth.updateCurrentUser(result.user);
    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function signInWithFacebook(): Promise<UserCredential | null> {
  try {
    const result = await signInWithPopup(auth, facebookAuthProvider);
    const collectionRef = collection(db, "users");

    const document = await getDoc(doc(collectionRef, result.user?.uid));
    if (!document.exists()) {
      const client: Client = {
        email: result.user?.email ?? "",
        name: result.user?.displayName ?? "",
      }

      const clientRef = doc(collectionRef, result.user?.uid);
      setDoc(clientRef, client);
    }

    auth.updateCurrentUser(result.user);
    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function getUserById(userId: string): Promise<Client> {
  const collectionRef = collection(db, "users");

  const document = await getDoc(doc(collectionRef, userId));
  const client = document.data()!;
  return client as Client;
}
