import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "route/auth/index";
import Home from "route/home/index";
import Profile from "route/profile/Profile";
import Navigator from "components/navigator/Navigator";
import { useContext } from "react";
import { AuthContext } from "context/context";
import Nweet from "route/nweet";

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
            <Route exact path="/home">
              <Home />
            </Route>

            <Route exact path="/:userId/:createTime">
              <Nweet />
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
