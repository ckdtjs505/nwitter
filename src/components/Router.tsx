import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "route/Auth";
import Home from "route/Home";
import Profile from "route/Profile";
import Navigator from "components/Navigator";

const AppRouter = ({ isLogin, setIsLogin, user, updateUser }: any) => {
  return (
    <Router>
      <Navigator isLogin={isLogin} user={user} />
      <Switch>
        <Route exact path="/profile">
          <Profile user={user} updateUser={updateUser}></Profile>
        </Route>
        <Route exact path="/auth">
          <Auth setIsLogin={true} />
        </Route>
        <Route exact path="/">
          {isLogin ? <Home user={user} /> : <Auth setIsLogin={setIsLogin} />}
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
