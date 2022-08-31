import React, { useState } from "react";
import styled from "styled-components";
import { tweet } from "./TweetModel";
import { format } from "date-fns";
import ActionBar from "./ActionBar";
import { useNavigate } from "react-router-dom";

type props = {
  tweet: tweet;
};

const Tweet: React.FC<props> = ({ tweet }) => {
  const { author, media } = tweet;

  const navigate = useNavigate();
  const formattedDate = format(new Date(tweet.timestamp), "MMM do");

  const viewTweet = () => {
    navigate(`/tweet/${tweet.id}`);
  };

  return (
    <TweetContainer onClick={viewTweet}>
      <Avatar src={author.avatarSrc} />
      <TweetBox>
        <TopBanner>
          <Name>{author.displayName}</Name>
          <p>{author.handle}</p>
          <p>{formattedDate}</p>
        </TopBanner>
        <Status>{tweet.status}</Status>
        {media[0] && <Image src={media[0].url} />} <ActionBar />
      </TweetBox>
    </TweetContainer>
  );
};

export default Tweet;

const TweetContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 15px;
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const TweetBox = styled.div``;

const Name = styled.h2`
  margin: 0;
`;

const TopBanner = styled.div`
  display: flex;
  align-items: center;
  p {
    color: grey;
    margin: 0;
  }
`;

const Status = styled.p`
  margin: 0;
`;

const Image = styled.img`
  width: 70%;
`;
