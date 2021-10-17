import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "route/Auth";
import Home from "route/Home";
import Profile from "route/Profile";
import Navigator from "components/Navigator";
import { useContext } from "react";
import { AuthContext } from "context";
import Nweet from "route/Nweet";


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

            <Route path="/:userId/:createTime">
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
