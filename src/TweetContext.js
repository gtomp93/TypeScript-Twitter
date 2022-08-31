import { createContext } from "react";
import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { u1F4A3 } from "react-icons-kit/noto_emoji_regular/u1F4A3";
import { Icon } from "react-icons-kit";
import styled, { keyframes } from "styled-components";
import { loading } from "react-icons-kit/ikons/loading";

export const TweetContext = createContext(null);

export const TweetProvider = ({ children }) => {
  const { status, setStatus } = useContext(CurrentUserContext);

  const [tweetIds, setTweetIds] = useState(null);
  const [tweetsById, setTweetsById] = useState(null);
  const [updateFeed, setUpdateFeed] = useState(false);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTweetIds(data.tweetIds);
        setTweetsById(data.tweetsById);
      })
      .catch((err) => {
        setStatus("error");
        console.log(err);
      });
  }, [updateFeed]);

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

  if (!tweetIds || !tweetsById) {
    return <Loading icon={loading} size={70}></Loading>;
  }

  return (
    <TweetContext.Provider
      value={{
        tweetIds,
        setTweetIds,
        setTweetsById,
        tweetsById,
        updateFeed,
        setUpdateFeed,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

const spin = keyframes`
 from { transform: rotate(0deg); }
 to { transform: rotate(1200deg) }
`;

const Loading = styled(Icon)`
  color: grey;
  animation: ${spin} 5s forwards;
`;
