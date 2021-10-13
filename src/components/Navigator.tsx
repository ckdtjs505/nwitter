import { signOut } from "@firebase/auth";
import { AuthContext } from "context";
import { firebaseAuth } from "firebase";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import defaultImg from "../assets/default.png";
import NavList from "./NavList";

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 234px;
  height: 100vh;
  border-right: rgb(239, 243, 244) 1px solid;

  @media (max-width: 860px) {
    width: 65px;
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const Strong = styled.strong`
  font-weight: 700;
`;

const UserBox = styled.div`
  display: flex;
  margin-bottom: 1rem;
  width: 283px;
  overflow: hidden;
`;

const UserSetting = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 860px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  height: 20px;
  margin: auto;
  margin-left: 4rem;
  border: none;
`;

const Navigator = () => {
  const userInfo = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    signOut(firebaseAuth).then(() => {
      history.push("/");
    });
  };

  return (
    <Container>
      <div>
        <NavList type="Icon"> </NavList>
        <NavList type="Home"> </NavList>
        <NavList type="Profile"> </NavList>
      </div>
      <UserBox>
        <Link to="/profile">
          <Img
            src={userInfo?.user?.photoURL === null ? defaultImg : userInfo?.user?.photoURL}
          ></Img>
        </Link>
        <UserSetting>
          <div>
            <Strong>{userInfo?.user?.displayName}</Strong>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </div>
          <div style={{ color: "#677682" }}>{userInfo?.user?.email}</div>
        </UserSetting>
      </UserBox>
    </Container>
  );
};

export default Navigator;
