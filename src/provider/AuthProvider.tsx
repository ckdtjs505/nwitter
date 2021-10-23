import React, { useEffect, useState } from "react";
import { firebaseAuth } from "firebase";
import { AuthContext } from "context/context";

export const AuthProvider: React.FC = ({ children }) => {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [displayName, setDisplayName] = useState<string | null | undefined>("");

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(firebaseUser => {
      setDisplayName(firebaseUser?.displayName);
      setIsLogin(firebaseUser ? true : false);
      setInit(true);
    });

    return unsubscribe;
  }, []);

  // 유저 정보 변경
  const updateUser = (newdisplayName: any) => {
    setDisplayName(newdisplayName);
  };

  let userValue = {
    init,
    isLogin,
    setIsLogin,
    updateUser,
    displayName
  };

  return <AuthContext.Provider value={userValue}>{children}</AuthContext.Provider>;
};
