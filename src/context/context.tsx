import React from "react";

interface Auth {
  init: boolean;
  isLogin: boolean;
  setIsLogin: Function;
  updateUser: Function;
  displayName?: string | null;
}

export const AuthContext = React.createContext<Auth | null>(null);
