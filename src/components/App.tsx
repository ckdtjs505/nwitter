import { useEffect, useState } from "react";
import { firebaseAuth } from "firebase";
import AppRouter from "components/Router";

function App() {
  const [isLogin, setIsLogin] = useState(firebaseAuth.currentUser);

  useEffect(() => {
    setIsLogin(firebaseAuth.currentUser);
  }, [firebaseAuth.currentUser]);
  // console.log(firebaseAuth.currentUser);

  // setInterval(() => {
  //   console.log(firebaseAuth.currentUser);
  // }, 1000);
  
  return (
    <div className="App">
      <AppRouter isLogin={isLogin} setIsLogin={setIsLogin} />
      <footer>&copy; nwitter </footer>
    </div>
  );
}

export default App;
