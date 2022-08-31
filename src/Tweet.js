import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import TweetActions from "./TweetActions";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiRepeat } from "react-icons/fi";
import { format } from "date-fns";

const Tweet = ({ tweet, tweetid }) => {
  // console.log("tweet", tweet);
  const { author, media, status } = tweet
    ? tweet
    : { author: undefined, media: undefined, status: undefined };
  //   console.log("url", media[0]);

  let history = useHistory();

  let newdate = 0;

  if (tweet) {
    let date = new Date(tweet.timestamp);
    newdate = format(date, "MMM do");
  }

  if (!tweet) {
    return "Loading";
  }

  function handleClick() {
    // console.log("clicked");
    history.push(`/tweet/${tweetid}`);
  }

  return (
    tweet && (
      <TweetOutline>
        <TweetDiv aria-label="View tweet" tabIndex="0">
          {tweet.retweetFrom && (
            <div
              style={{
                marginTop: "0",
                marginBottom: "6px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FiRepeat style={{ fill: "grey", color: "grey" }} />
              <Retweet>{tweet.retweetFrom.displayName} ReMeowed</Retweet>
            </div>
          )}
          <TweetHeader>
            <Avatar src={author.avatarSrc}></Avatar>
            <div>
              <ProfileLink to={`/profile/${author.handle}`}>
                {author.displayName}
              </ProfileLink>
              <TwitterHandle>@{author.handle}</TwitterHandle>

              <TimeStamp>{newdate}</TimeStamp>
              <TweetText onClick={handleClick}>{status}</TweetText>
            </div>
          </TweetHeader>
          {media[0] && (
            <BigPic onClick={handleClick} src={media[0].url}></BigPic>
          )}
        </TweetDiv>
        <div style={{ width: "450px", marginLeft: "30px" }}>
          <TweetActions tweet={tweet} />
        </div>
      </TweetOutline>
    )
  );
};

const Retweet = styled.span`
  color: grey;
  margin-left: 10px;
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin-left: 10px;
  font-weight: bolder;
  z-index: 5;
`;

const TimeStamp = styled.span`
  margin-left: 15px;
  color: grey;
`;

const TwitterName = styled.span`
  margin-left: 10px;
  font-weight: bolder;
`;

const TweetText = styled.div`
  color: black;
  margin-left: 10px;
  margin-top: 2px;
`;

const TwitterHandle = styled.span`
  color: black;
  margin-left: 10px;
`;

const TweetHeader = styled.div`
  display: flex;
`;

const TweetDiv = styled.div`
  margin-left: 20px;
  margin-bottom: 0;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 550px;
`;

const TweetOutline = styled.div`
  outline-color: lightgrey;
  outline-style: solid;
  outline-width: 1px;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-right: 16px;
`;

const BigPic = styled.img`
  width: 500px;
  margin-left: 44px;
  margin-top: 6px;
`;

export default Tweet;
