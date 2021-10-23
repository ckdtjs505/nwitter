import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Loading from "./components/Loading/Loading";
import Routes from "Router";
import { AuthProvider } from "provider/AuthProvider";
import { AuthContext } from "context/context";
import GlobalStyle from "./reset.css.js";

const App = () => {
  const userInfo = useContext(AuthContext);

  return (
    <div className="App">
      <GlobalStyle />
      {userInfo?.init ? <Routes /> : <Loading />}
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
