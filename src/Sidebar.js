import Reaact, { useContext } from "react";
// import catLogo from "./assets/Logo";
import { ReactComponent as Logo } from "./assets/Logo.svg";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "./Constants";

import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import { CurrentUserContext } from "./CurrentUserContext";

const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div style={{ marginRight: "18px", marginLeft: "8px" }}>
      <Logo />
      <NavigationLink exact to="/">
        <FiHome style={{ marginRight: "15px" }} />
        Home
      </NavigationLink>
      <NavigationLink exact to={`/profile/${currentUser.profile.handle}`}>
        <FiUser style={{ marginRight: "15px" }} /> Profile
      </NavigationLink>
      <NavigationLink exact to="/Notifications">
        <FiBell style={{ marginRight: "15px" }} />
        Notifications
      </NavigationLink>
      <NavigationLink exact to="/Bookmarks">
        <FiBookmark style={{ marginRight: "15px" }} /> Bookmarks
      </NavigationLink>
      <Meow>Meow</Meow>
    </div>
  );
};

const NavigationLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  color: black;
  font-weight: bolder;
  margin-top: 15px;
  font-size: 20px;

  &.active {
    color: ${COLORS.primary};
  }
`;

const Meow = styled.button`
  background-color: ${COLORS.primary};
  color: white;
  align-self: flex-end;
  border-radius: 15px;
  height: 30px;
  width: 150px;
  margin-top: 20px;
`;

export default Sidebar;
