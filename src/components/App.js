import { useState } from "react";
import { isLogin as login } from "../firebase";
import AppRouter from "./Router";

function App() {
  const [isLogin, setIsLogin] = useState(login);

  return (
    <div className="App">
      <AppRouter isLogin={isLogin} />
      <footer> footer </footer>
    </div>
  );
}

export default App;
