import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./HomePage";
import Profile from "./profile";
import Bookmarks from "./Bookmarks";
import Notifications from "./Notifications";
import Sidebar from "./Sidebar";
import TweetDetails from "./TweetDetails";
function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/tweet/:tweetId" element={<TweetDetails />} />

          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
