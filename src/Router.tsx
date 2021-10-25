import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useContext, lazy, Suspense } from "react";
import { AuthContext } from "context/context";
import Nweet from "route/nweet";
import ErrorBoundary from "components/ErrorBoundary";

const Home = lazy(() => import("route/home/index"));
const Auth = lazy(() => import("route/auth/index"));
const Profile = lazy(() => import("route/profile/Profile"));
const Navigator = lazy(() => import("components/navigator/Navigator"));

const Routes = () => {
  const userInfo = useContext(AuthContext);

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
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
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routes;
