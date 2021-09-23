import { useEffect, useState } from "react";
import { firebaseAuth } from "firebase";
import AppRouter from "components/Router";
import { onAuthStateChanged } from "@firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (userInfo: any) => {
      setIsLogin(firebaseAuth.currentUser ? true : false);
      setUser(userInfo);
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      {init ? <AppRouter user={user} isLogin={isLogin} setIsLogin={setIsLogin} /> : "loading.."}
      <footer>&copy; nwitter </footer>
    </div>
  );
}

export default App;
