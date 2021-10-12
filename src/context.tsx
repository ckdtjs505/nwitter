import { User } from "@firebase/auth";
import React from "react";

interface Auth {
  init: boolean;
  user: User | null;
  setUser: Function;
  isLogin: boolean;
  setIsLogin: Function;
  updateUser: Function;
}

export const AuthContext = React.createContext<Auth | null>(null);
