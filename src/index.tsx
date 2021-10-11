import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { firebaseAuth } from "firebase";
import { onAuthStateChanged } from "@firebase/auth";
import styled from "styled-components";
import Loading from "./components/Loading";
import AppRouter from "Router";
import _ from "lodash";
import "./reset.css";

const Main = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const App = () => {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    // 유저 정보 변경시 - 닉네임 변경
    onAuthStateChanged(firebaseAuth, (userInfo: any) => {
      setIsLogin(firebaseAuth.currentUser ? true : false);
      if (userInfo) {
        setUser(userInfo);
      }
      setInit(true);
    });
  }, []);

  // 유저 정보 변경
  const updateUser = (newdisplayName: string) => {
    const currentUser: any = firebaseAuth.currentUser;
    currentUser.displayName = newdisplayName;
    setUser(_.cloneDeep(currentUser));
  };

  return (
    <div className="App">
      <Main>
        {init ? (
          <AppRouter
            user={user}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            updateUser={updateUser}
          />
        ) : (
          <Loading />
        )}
      </Main>
      {/* <footer>&copy; nwitter </footer> */}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
