import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../route/Auth";
import Home from "../route/Home";

const AppRouter = ({ isLogin }) => {
  console.log(isLogin);
  return (
    <Router>
      <Switch>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route exact path="/">
          {isLogin ? <Home /> : <Auth />}
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
