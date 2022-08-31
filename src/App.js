import logo from "./logo.svg";
import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Bookmarks from "./Bookmarks";
import GlobalStyles from "./GlobalStyles";
import TweetDetails from "./TweetDetails";
import SideBar from "./Sidebar";

import "./App.css";
import { CurrentUserContext } from "./CurrentUserContext";
import PostDemo from "./PostDemo";

const App = () => {
  const { currentUser, status } = useContext(CurrentUserContext);
  return (
    <Router>
      <GlobalStyles />
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        {status === "loading" && <p style={{ marginLeft: "200px" }}>Loading</p>}
        {status === "idle" && (
          <switch>
            <Route exact path="/">
              <HomeFeed />
            </Route>
            <Route exact path="/notifications">
              <Notifications />
            </Route>
            <Route exact path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route exact path="/tweet/:tweetId">
              <TweetDetails />
            </Route>
            <Route exact path="/profile/:profileId">
              <Profile />
            </Route>
            <Route exact path="/postDemo">
              <PostDemo />
            </Route>
          </switch>
        )}
      </div>
    </Router>
  );
};
export default App;
