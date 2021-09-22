import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "route/Auth";
import Home from "route/Home";
import Profile from "route/Profile";
import Navigator from "components/Navigator";

const AppRouter = ({ isLogin, setIsLogin }: any) => {
  return (
    <Router>
      <Navigator isLogin={isLogin} />
      <Switch>
        <Route exact path="/profile">
          <Profile></Profile>
        </Route>
        <Route exact path="/auth">
          <Auth setIsLogin={true} />
        </Route>
        <Route exact path="/">
          {isLogin ? <Home /> : <Auth setIsLogin={setIsLogin} />}
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
