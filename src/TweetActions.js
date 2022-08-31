import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FiRepeat, FiMessageCircle, FiHeart, FiShare } from "react-icons/fi";
import { TweetContext } from "./TweetContext";

const TweetActions = ({ tweet }) => {
  const [toggleLike, setToggleLike] = useState(tweet.isLiked);
  const [toggleRetweet, setToggleRetweet] = useState(false);
  const { updateFeed, setUpdateFeed } = useContext(TweetContext);

  const handleLikeClick = () => {
    // console.log("tweet", tweet);
    // console.log("clicked heart");
    setToggleLike(!toggleLike);

    fetch(`/api/tweet/${tweet.id}/like`, {
      method: "PUT",
      body: JSON.stringify({
        like: !toggleLike,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("JSON", json);
      });
  };

  console.log(tweet.isLiked);

  const handleRetweet = () => {
    // console.log("tweet", tweet);
    // console.log("retweeted");
    setToggleRetweet(!toggleRetweet);

    fetch(`/api/tweet/${tweet.id}/retweet`, {
      method: "PUT",
      body: JSON.stringify({
        retweet: !tweet.isRetweeted,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("JSON", json);
      });
  };

  //   console.log(tweet);

  if (!tweet) {
    return "loading";
  }

  //   console.log("updated tweet", tweet);

  return (
    tweet && (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <FiMessageCircle />
        <div>
          <RetweetButton onClick={handleRetweet}>
            <FiRepeat
              style={
                toggleRetweet
                  ? { color: "green", fill: "green" }
                  : { color: "black" }
              }
            />
          </RetweetButton>
          <NumOfRetweets>{toggleRetweet ? 1 : null}</NumOfRetweets>
        </div>
        <div>
          <WrapperButton onClick={handleLikeClick}>
            <FiHeart
              style={
                toggleLike ? { color: "red", fill: "red" } : { color: "black" }
              }
            ></FiHeart>
          </WrapperButton>{" "}
          <NumOfLikes>{toggleLike ? 1 : null}</NumOfLikes>
        </div>

        <FiShare />
      </div>
    )
  );
};

const WrapperButton = styled.button`
  background-color: white;
  border: none;
`;

const NumOfLikes = styled.span`
  font-size: 10px;
`;

const NumOfRetweets = styled.span`
  font-size: 10px;
`;

const RetweetButton = styled.button`
  background-color: white;
  border: none;
`;

export default TweetActions;
