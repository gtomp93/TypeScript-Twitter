import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { TweetContext } from "./TweetContext";
import { COLORS } from "./Constants";
import { u1F4A3 } from "react-icons-kit/noto_emoji_regular/u1F4A3";
import { Icon } from "react-icons-kit";

const TweetStatus = () => {
  const { currentUser, setCurrentUser, status, setStatus } =
    useContext(CurrentUserContext);
  const [statusUpdate, setStatusUpdate] = useState("");
  const { updateFeed, setUpdateFeed } = useContext(TweetContext);

  console.log("statusupdate", statusUpdate);

  const postTweet = () => {
    fetch("/api/tweet", {
      method: "POST",
      body: JSON.stringify({
        status: statusUpdate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("JSON", json);
        setUpdateFeed(!updateFeed);
      })
      .catch((err) => {
        setStatus("error");
        console.log(err);
      });
  };

  let remainingChars = 280 - statusUpdate.length;
  let isDisabled = statusUpdate.length > 280;

  if (status === "error") {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Icon size={64} icon={u1F4A3} style={{ alignContent: "center" }} />
        </div>
        <p style={{ textAlign: "center" }}>An Unknown Error has Occured</p>
        <p style={{ textAlign: "center" }}>
          Please try refreshing the page or contact support for help
        </p>
      </div>
    );
  }

  return (
    <Wrapper>
      <Avatar src={currentUser.profile.avatarSrc}></Avatar>

      <WriteTweet
        value={statusUpdate}
        onChange={(evt) => {
          setStatusUpdate(evt.target.value);
        }}
        label="Write Tweet"
        type="text"
        placeholder="What's happening?"
      ></WriteTweet>
      <CharCount remainingChars={remainingChars}>{remainingChars}</CharCount>
      <Meow onClick={postTweet} disabled={isDisabled}>
        Meow
      </Meow>
    </Wrapper>
  );
};

const Meow = styled.button`
  color: white;
  align-self: flex-end;
  background-color: ${COLORS.primary};
  border-radius: 20%;
  height: 30px;
  &:disabled {
    background-color: lightgrey;
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 15px;
  margin-left: 20px;
  border-bottom: lightgrey;
  border-width: 6px;
`;

const WriteTweet = styled.textarea`
  width: 500px;
  height: 100px;
  outline: none;
  border: none;
  resize: none;
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const CharCount = styled.p`
  color: ${(props) =>
    props.remainingChars > 55
      ? "grey"
      : props.remainingChars >= 0
      ? "orange"
      : "red"};
`;

export default TweetStatus;

// {id: "1214624813723136002", timestamp: "2020-01-12T04:31:00+00:00", status: "Sometimes I wonder... am I playing with the ribbon…e?\n\nMaybe a more diplomatic approach will work 🤔", media: Array(1), author: {…}, …}
// author:
// avatarSrc: "/assets/diplomog-avatar.jpg"
// bannerSrc: "/assets/diplomog-banner.jpeg"
// bio: "Best friends with @treasurymog."
// displayName: "Palmerston"
// handle: "diplomog"
// isBeingFollowedByYou: true
// isFollowingYou: true
// joined: "2016-02-02T12:00"
// location: "Whitehall"
// numFollowers: 1
// numFollowing: 1
// numLikes: 1
// url: "http://fco.gov.uk"
// __proto__: Object
// id: "1214624813723136002"
// isLiked: false
// isRetweeted: false
// media: Array(1)
// 0: {type: "img", url: "/assets/diplomog-yarn.png"}
// length: 1
// __proto__: Array(0)
// numLikes: 0
// numRetweets: 0
// status: "Sometimes I wonder... am I playing with the ribbon or is the ribbon playing with me?\n\nMaybe a more diplomatic approach will work 🤔"
// timestamp: "2020-01-12T04:31:00+00:00"
