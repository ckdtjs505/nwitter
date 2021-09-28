import { useEffect, useState } from "react";
import { firebaseAuth } from "firebase";
import AppRouter from "components/Router";
import _ from "lodash";
import { onAuthStateChanged } from "@firebase/auth";
import styled from "styled-components";
import "../reset.css";

function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState("");
  const Main = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
  `;

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (userInfo: any) => {
      setIsLogin(firebaseAuth.currentUser ? true : false);
      if (userInfo) {
        setUser(userInfo);
      }
      setInit(true);
    });
  }, []);

  const updateUser = (newdisplayName: string) => {
    const currentUser: any = firebaseAuth.currentUser;
    currentUser.displayName = newdisplayName;
    console.log("update", currentUser);
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
          "loading.."
        )}
      </Main>
      {/* <footer>&copy; nwitter </footer> */}
    </div>
  );
}

export default App;
