import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "route/Auth";
import Home from "route/Home";

const AppRouter = ({ isLogin, setIsLogin }) => {
  console.log(isLogin);
  return (
    <Router>
      <Switch>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route exact path="/">
          {isLogin ? <Home /> : <Auth setIsLogin={setIsLogin} />}
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
