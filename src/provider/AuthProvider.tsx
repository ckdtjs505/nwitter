import React, { useEffect, useState } from "react";
import { User } from "@firebase/auth";
import { firebaseAuth } from "firebase";
import { AuthContext } from "context";
import _ from "lodash";

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

  // 유저 정보 변경
  const updateUser = (newdisplayName: string) => {
    const currentUser: any = firebaseAuth.currentUser;
    currentUser.displayName = newdisplayName;
    setUser(_.cloneDeep(currentUser));
  };

  let userValue = {
    init,
    user,
    setUser,
    isLogin,
    setIsLogin,
    updateUser
  };

  return <AuthContext.Provider value={userValue}>{children}</AuthContext.Provider>;
};
