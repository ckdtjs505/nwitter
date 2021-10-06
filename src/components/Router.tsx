import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "route/Auth";
import Home from "route/Home";
import Profile from "route/Profile";
import Navigator from "components/Navigator";
import styled from "styled-components";

const Content = styled.div`
  /* width: 990px; */
`;
const AppRouter = ({ isLogin, setIsLogin, user, updateUser }: any) => {
  return (
    <Router>
      {isLogin ? <Navigator isLogin={isLogin} user={user} /> : ""}

      <Content>
        <Switch>
          <Route exact path="/profile">
            {isLogin ? (
              <Profile user={user} updateUser={updateUser}></Profile>
            ) : (
              <Auth setIsLogin={setIsLogin} />
            )}
          </Route>
          <Route exact path="/auth">
            <Auth setIsLogin={true} />
          </Route>
          <Route exact path="/">
            {isLogin ? <Home user={user} /> : <Auth setIsLogin={setIsLogin} />}
          </Route>
          <Route path="*">
            {isLogin ? <Home user={user} /> : <Auth setIsLogin={setIsLogin} />}
          </Route>
        </Switch>
      </Content>
    </Router>
  );
};

export default AppRouter;
