import { signOut } from "@firebase/auth";
import { AuthContext } from "context/context";
import { firebaseAuth } from "firebase";
import { useContext, useEffect, useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { IoIosMore } from "react-icons/io";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import defaultImg from "assets/default.png";
import NavList from "./NavList";

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 234px;
  height: 100vh;
  border-right: rgb(239, 243, 244) 1px solid;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;

  @media (max-width: 860px) {
    width: 65px;
  }

  @media (max-width: 450px) {
    height: 6vh;
    position: fixed;
    top: auto;
    bottom: 0;
    background-color: white;
    width: 100%;
    border-top: rgb(239, 243, 244) 1px solid;
    z-index: 5;
  }
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 5rem;
  margin: auto;
`;

const Strong = styled.strong`
  font-weight: 700;
`;

const UserBox = styled.div`
  display: flex;
  height: 4rem;
  margin-bottom: 1rem;

  :hover {
    background-color: #e7e7e8;
    border-radius: 2rem;
    cursor: pointer;
  }

  @media (max-width: 450px) {
    display: none;
  }
`;

const ToolTipUserBox = styled.div`
  display: flex;
  height: 4rem;

  :hover {
    cursor: default;
  }
`;

const UserSetting = styled.div`
  display: flex;
  width: 70%;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  margin: auto 0;
  @media (max-width: 860px) {
    display: none;
  }
`;

const ThreeDot = styled(IoIosMore)`
  margin: auto;
`;

const Checkmark = styled(FcCheckmark)`
  margin: auto;
`;

const ToolTip = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 6rem;
  width: 280px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 1.5rem;
  background-color: white;
`;

const LogoutButton = styled.div`
  height: 2rem;
  width: 100%;
  text-align: center;
  /* border: rgb(239, 243, 244) 1px solid; */
  padding-top: 1rem;

  :hover {
    cursor: pointer;
  }
`;

const NavBox = styled.div`
  @media (max-width: 450px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    bottom: 1rem;
  }
`;

const Navigator = () => {
  const userInfo = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    signOut(firebaseAuth).then(() => {
      history.push("/");
    });
  };

  const [isClickUserBox, setIsClickUserBox] = useState(false);

  const handleUserBox = () => {
    setIsClickUserBox(!isClickUserBox);
  };

  useEffect(() => {
    // 유저박스를 on/off
    if (!isClickUserBox) return;

    const update = () => setIsClickUserBox(!isClickUserBox);
    window.addEventListener("click", update);

    return () => window.removeEventListener("click", update);
  }, [isClickUserBox]);

  return (
    <Container>
      <NavBox>
        <NavList type="Icon"> </NavList>
        <NavList type="Home"> </NavList>
        <NavList type="Profile"> </NavList>
      </NavBox>
      {isClickUserBox ? (
        <ToolTip>
          <ToolTipUserBox>
            <Img
              src={
                firebaseAuth.currentUser?.photoURL === null
                  ? defaultImg
                  : firebaseAuth.currentUser?.photoURL
              }
            ></Img>
            <UserSetting>
              <div>
                <Strong>{userInfo?.displayName}</Strong>
                <div style={{ color: "#677682" }}>{firebaseAuth.currentUser?.email}</div>
              </div>
            </UserSetting>
            <Checkmark />
          </ToolTipUserBox>
          <LogoutButton onClick={handleLogout}>
            Log out {firebaseAuth.currentUser?.displayName}{" "}
          </LogoutButton>
        </ToolTip>
      ) : (
        ""
      )}
      <UserBox onClick={handleUserBox}>
        <Img
          src={
            firebaseAuth.currentUser?.photoURL === null
              ? defaultImg
              : firebaseAuth.currentUser?.photoURL
          }
        ></Img>
        <UserSetting>
          <div>
            <Strong>{firebaseAuth.currentUser?.displayName}</Strong>
            <div style={{ color: "#677682" }}>{firebaseAuth.currentUser?.email}</div>
          </div>
          <ThreeDot />
        </UserSetting>
      </UserBox>
    </Container>
  );
};

export default Navigator;
