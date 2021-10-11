import React, { useEffect, useState } from "react";
import { User } from "@firebase/auth";
import { firebaseAuth } from "firebase";
import { AuthContext } from "context";

export const AuthProvider: React.FC = ({ children }) => {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
      setIsLogin(firebaseUser ? true : false);
      setInit(true);
    });

    return unsubscribe;
  }, []);

  let userValue = {
    init,
    user,
    setUser,
    isLogin,
    setIsLogin
  };

  return <AuthContext.Provider value={userValue}>{children}</AuthContext.Provider>;
};
