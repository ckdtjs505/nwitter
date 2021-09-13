import { useState } from "react";
import { firebaseAuth } from "firebase";
import AppRouter from "components/Router";

function App() {
  const [isLogin, setIsLogin] = useState(firebaseAuth.currentUser);
  return (
    <div className="App">
      <AppRouter isLogin={isLogin} setIsLogin={setIsLogin} />
      <footer>&copy; nwitter </footer>
    </div>
  );
}

export default App;
