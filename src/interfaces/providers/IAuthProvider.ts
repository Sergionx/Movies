import { UserCredential } from "firebase/auth";
import { Client } from "../Client";

export interface IAuthProvider {
  user: Client | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential | null>;
  register: (client: Client, password: string) => Promise<UserCredential | null>;
  logout: () => Promise<void>;
  loginWithGoogle: (client: Client) => Promise<UserCredential | null>;
  loginWithFacebook: (client: Client) => Promise<UserCredential | null>;
}
