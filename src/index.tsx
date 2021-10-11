import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { firebaseAuth } from "firebase";
import styled from "styled-components";
import Loading from "./components/Loading";
import Routes from "Router";
import _ from "lodash";
import "./reset.css";
import { AuthProvider } from "provider/AuthProvider";
import { AuthContext } from "context";

// TODO:메인 스타일을 여기서 해주는게 맞는가?
const Main = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

// TODO:App component - 랜더링 connect 만 해주고 픔..
const App = () => {
  const userInfo = useContext(AuthContext);

  // 유저 정보 변경
  const updateUser = (newdisplayName: string) => {
    const currentUser: any = firebaseAuth.currentUser;
    currentUser.displayName = newdisplayName;
    userInfo?.setUser(_.cloneDeep(currentUser));
  };

  return (
    <div className="App">
      <Main>
        {userInfo?.init ? (
          <Routes
            user={userInfo?.user}
            isLogin={userInfo?.isLogin}
            setIsLogin={userInfo?.setIsLogin}
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
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
