import React, { useContext } from "react";

export type AuthContextProps = {
  user_id: string;
  username: string;
  email?: string;
  steam_id?: string;
  role: "user" | "moderator" | "admin";
} | null;

export const AuthContext = React.createContext<AuthContextProps>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};
