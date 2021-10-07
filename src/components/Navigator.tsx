import { signOut } from "@firebase/auth";
import { firebaseAuth } from "firebase";
import { MdAccountCircle, MdHome } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import defaultImg from "../img/default.png";

type NavProps = {
  isLogin: boolean;
  user: any;
};

const IconBox = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  margin: auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const NavItem = styled(Link)`
  display: flex;
  height: 58.25px;
  padding: 4px 0 4px 0;
`;

const Item = styled.div`
  display: flex;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 2rem;
  /* font-weight: 700; */

  :hover {
    background-color: #e7e7e8;
  }
`;

const Header = styled.header`
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

const Text = styled.span`
  padding-right: 1rem;
  font-size: 20px;
  /* font-weight: 700; */
  text-decoration: none solid rgb(15, 20, 25);
  white-space: nowrap;
  word-spacing: 0;

  @media (max-width: 860px) {
    display: none;
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

const Icon = ({ type }: any): any => {
  const IconSvg = (): any => {
    switch (type) {
      case "Icon":
        return (
          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
        );
      case "Home":
        return <MdHome size="1.5rem" />;
      case "Profile":
        return <MdAccountCircle size="1.5rem" />;
      default:
        return <path></path>;
    }
  };

  return (
    <IconBox>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <IconSvg />
        </g>
      </svg>
    </IconBox>
  );
};

const NavList = ({ type }: any) => {
  return (
    <NavItem to={`/${type.toLowerCase()}`}>
      <Item defaultValue={location.pathname}>
        <Icon type={type} />
        <Text>{type === "Icon" ? "" : type}</Text>
      </Item>
    </NavItem>
  );
};

const Navigator = ({ isLogin, user }: NavProps) => {
  const history = useHistory();
  const handleLogout = () => {
    signOut(firebaseAuth);
    history.push("/");
  };
  // const location = useLocation();
  // console.log(location.pathname);

  return (
    <Header>
      <div>
        <NavList type="Icon"> </NavList>
        <NavList type="Home"> </NavList>

        <NavList type="Profile"> </NavList>
        {isLogin ? <></> : ""}
      </div>
      <UserBox>
        {/* <Link to="/profile"> {user.displayName}'의 Profile</Link> */}
        <Img src={user.photoURL === null ? defaultImg : user.photoURL}></Img>
        <UserSetting>
          <div>
            <Strong>{user.displayName}</Strong>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </div>
          <div style={{ color: "#677682" }}>{user.email}</div>
        </UserSetting>
      </UserBox>
    </Header>
  );
};

export default Navigator;
