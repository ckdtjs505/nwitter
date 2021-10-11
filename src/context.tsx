import { User } from "@firebase/auth";
import React from "react";

type Auth = {
  init: boolean;
  user: User | null;
  setUser: Function;
  isLogin: boolean;
  setIsLogin: Function;
} | null;

export const AuthContext = React.createContext<Auth | null>(null);
