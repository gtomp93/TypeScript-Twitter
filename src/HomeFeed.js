import React, { useContext, useEffect, useState } from "react";
// import { tweets } from "../../server/data";
import { CurrentUserContext } from "./CurrentUserContext";
import moment from "moment";
import Tweet from "./Tweet";
import { TweetContext } from "./TweetContext";
import styled from "styled-components";
import TweetStatus from "./TweetStatus";

const HomeFeed = () => {
  const { status, setStatus } = useContext(CurrentUserContext);
  const { tweetIds, setTweetIds, setTweetsById, tweetsById } =
    useContext(TweetContext);

  // const [tweetIds, setTweetIds] = useState(null);
  // const [tweetsById, setTweetsById] = useState(null);

  // useEffect(() => {
  //   fetch("/api/me/home-feed")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setTweetIds(data.tweetIds);
  //       setTweetsById(data.tweetsById);
  //     })
  //     .catch((err) => {
  //       setStatus("error");
  //       console.log(err);
  //     });
  // }, []);

  console.log("TweetIds", tweetIds);
  console.log("TweetsById", tweetsById);

  return (
    tweetIds &&
    tweetsById && (
      <div>
        <HomeTitle>Home</HomeTitle>
        <TweetStatus />
        {tweetIds.map((tweetid) => {
          return (
            <Tweet
              tweet={tweetsById[tweetid]}
              tweetid={tweetid}
              key={tweetid}
            />
          );
        })}
      </div>
    )
  );
};

const HomeTitle = styled.p`
  font-weight: bolder;
  font-size: larger;
  color: black;
`;

export default HomeFeed;
