import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "route/Auth";
import Home from "route/Home";
import Profile from "route/Profile";
import Navigator from "components/Navigator";
import { useContext } from "react";
import { AuthContext } from "context";

const Routes = () => {
  const userInfo = useContext(AuthContext);
  return (
    <Router>
      {userInfo?.init && userInfo?.isLogin ? (
        <>
          <Navigator />

          <Switch>
            <Route exact path="/profile">
              <Profile></Profile>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <Home />
            </Route>
          </Switch>
        </>
      ) : (
        <Auth />
      )}
    </Router>
  );
};

export default Routes;
