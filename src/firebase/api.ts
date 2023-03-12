import { UserCredential } from "@firebase/auth";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Client } from "../interfaces/Client";
import { Movie } from "../interfaces/Movie";

import { auth, db, googleAuthProvider } from "./config";

// TODO - Usar pages para pagination
export async function getMovies(): Promise<Movie[]> {
  const movies = (await (
    await axios.get("/discover/movie")
  ).data).results as Movie[];

  console.log(movies)
  return movies;
}

export async function getMovieById(id: string): Promise<Movie> {
  const movie = (await (
    await axios.get(`/movie/${id}`)
  ).data) as Movie;

  return movie;
}

export async function getMovieUpcoming(): Promise<Movie[]> {
  const movies = (await (
    await axios.get("/movie/upcoming")
  ).data).results as Movie[];

  return movies;
}

export async function getSearchMovie(query: string): Promise<Movie[]> {
  const movies = (await (
    await axios.get(`/search/movie?query=${query}`)
  ).data).results as Movie[];

  return movies;
}

export function getMoviePoster(posterPath: string): string {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

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
