import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { IAuthProvider } from "../interfaces/providers/IAuthProvider";

export function useAuth() {
  return useContext<IAuthProvider>(AuthContext);
}