import { UserCredential } from "firebase/auth";
import { Client } from "../Client";

export interface IAuthProvider {
  user: Client | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential | null>;
}
