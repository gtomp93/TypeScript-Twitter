import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "./assets/Logo.svg";

type Props = {};

const Sidebar: React.FC<Props> = ({}) => {
  return (
    <SideContainer>
      <Logo />
      <Link to="/">Home</Link>
      <Link to="/profile/treasurymog">Profile</Link>
      <Link to="/bookmarks">Bookmarks</Link>
      <Link to="/notifications">Notifications</Link>
    </SideContainer>
  );
};

export default Sidebar;

const SideContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: black;
  }
`;
