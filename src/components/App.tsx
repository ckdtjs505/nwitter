import { useEffect, useState } from "react";
import { firebaseAuth } from "firebase";
import AppRouter from "components/Router";
import { onAuthStateChanged } from "@firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, () => {
      setIsLogin(firebaseAuth.currentUser ? true : false);
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      {init ? <AppRouter isLogin={isLogin} setIsLogin={setIsLogin} /> : "loading.."}
      <footer>&copy; nwitter </footer>
    </div>
  );
}

export default App;
