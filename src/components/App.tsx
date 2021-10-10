import { useEffect, useState } from "react";
import { firebaseAuth } from "firebase";
import AppRouter from "components/Router";
import { onAuthStateChanged } from "@firebase/auth";
import styled from "styled-components";
import "../reset.css";
import _ from "lodash";
import Loading from "./Loading";

const Main = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

function App() {
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
}

export default App;
