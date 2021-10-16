import React from "react";
import { MdAccountCircle, MdHome } from "react-icons/md";
import { IoLogoTwitter } from "react-icons/io";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  type: string;
}

const NavItem = styled(Link)`
  display: flex;
  height: 58.25px;
  padding: 4px 0 4px 0;
  @media (max-width: 450px) {
    width: 100%;
  }
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

  @media (max-width: 450px) {
    width: 100%;
    border-radius: 0;
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

const IconBox = styled.div`
  display: flex;
  margin: auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Icon: React.FC<Props> = ({ type }) => {
  const IconSvg = () => {
    switch (type) {
      case "Icon":
        return <IoLogoTwitter size="1.3rem" />;
      case "Home":
        return <MdHome size="24px" />;
      case "Profile":
        return <MdAccountCircle size="1.5rem" />;
      default:
        return <path></path>;
    }
  };

  return (
    <IconBox>
      <IconSvg />
    </IconBox>
  );
};

const NavList: React.FC<Props> = ({ type }) => {
  return (
    <NavItem to={`/${type.toLowerCase()}`}>
      <Item defaultValue={location.pathname}>
        <Icon type={type} />
        <Text>{type === "Icon" ? "" : type}</Text>
      </Item>
    </NavItem>
  );
};

export default NavList;
