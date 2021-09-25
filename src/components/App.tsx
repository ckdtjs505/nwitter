import { useEffect, useState } from "react";
import { firebaseAuth } from "firebase";
import AppRouter from "components/Router";
import _ from "lodash";
import { onAuthStateChanged } from "@firebase/auth";
// setUser({
//   email: userInfo.email,
//   displayName: userInfo.displayName,
//   uid: userInfo.uid,
//   photoURL: userInfo.photoURL,
//   updateProfile: (args: any) => userInfo.updateProfile(args)
// });
function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState("");

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
      {init ? (
        <AppRouter user={user} isLogin={isLogin} setIsLogin={setIsLogin} updateUser={updateUser} />
      ) : (
        "loading.."
      )}
      <footer>&copy; nwitter </footer>
    </div>
  );
}

export default App;
