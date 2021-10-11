import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "route/Auth";
import Home from "route/Home";
import Profile from "route/Profile";
import Navigator from "components/Navigator";
import { User } from "@firebase/auth";

type AppRouterProps = {
  isLogin: boolean;
  setIsLogin: object;
  user: User | null;
  updateUser: Function;
};

const Routes = ({ isLogin, setIsLogin, user, updateUser }: AppRouterProps) => {
  return (
    <Router>
      {isLogin ? (
        <>
          <Navigator isLogin={isLogin} user={user} />

          <Switch>
            <Route exact path="/profile">
              <Profile user={user} updateUser={updateUser}></Profile>
            </Route>
            <Route exact path="/auth">
              <Auth setIsLogin={setIsLogin} />
            </Route>
            <Route exact path="/">
              <Home user={user} />
            </Route>
            <Route path="*">
              <Home user={user} />
            </Route>
          </Switch>
        </>
      ) : (
        <Auth setIsLogin={setIsLogin} />
      )}
    </Router>
  );
};

export default Routes;
