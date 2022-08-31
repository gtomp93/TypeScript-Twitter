import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TweetContext } from "./TweetContext";
import styled from "styled-components";
import moment from "moment";
import TweetActions from "./TweetActions";
import { FiArrowLeft } from "react-icons/fi";
import { format } from "date-fns";
import { CurrentUserContext } from "./CurrentUserContext";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { u1F4A3 } from "react-icons-kit/noto_emoji_regular/u1F4A3";

const TweetDetails = () => {
  const [tweetInfo, setTweetInfo] = useState(null);
  const { tweetId } = useParams();
  const { setStatus } = useContext(CurrentUserContext);

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setTweetInfo(data.tweet);
        console.log("data", data.tweet);
      })
      .catch((err) => {
        setStatus("error");
        console.log(err);
      });
  }, []);

  console.log("tweetinfo", tweetInfo);
  const { tweetIds, setTweetIds, setTweetsById, tweetsById } =
    useContext(TweetContext);
  console.log(tweetsById[tweetId]);

  // const tweetStuff = tweetsById[tweetId];

  // const { author, media, status } = tweetStuff;

  const { author, media, status } = tweetInfo
    ? tweetInfo
    : { author: undefined, media: undefined, status: undefined };

  let newdate = 0;

  if (tweetInfo) {
    let date = new Date(tweetInfo.timestamp);
    newdate = format(date, "p LLL y");
  }

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

  if (!tweetInfo) {
    return "loading";
  }

  return (
    <div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <Link to={"/"} style={{ fontSize: "22px", marginLeft: "48px" }}>
          <FiArrowLeft style={{ color: "grey" }} />
        </Link>
        <span
          style={{ fontSize: "20px", fontWeight: "bolder", marginLeft: "11px" }}
        >
          Meow
        </span>
      </div>
      <TweetDiv>
        <TweetHeader>
          <Avatar src={author.avatarSrc}></Avatar>
          <div>
            <TwitterName>{author.displayName}</TwitterName>
            <TwitterHandle>@{author.handle}</TwitterHandle>
          </div>
        </TweetHeader>
        <TweetText>{status}</TweetText>

        {media[0] && <BigPic src={media[0].url}></BigPic>}
        <TimeStamp>{newdate} Critter Web App</TimeStamp>

        <div style={{ width: "450px", marginLeft: "30px" }}>
          <TweetActions tweet={tweetInfo} />
        </div>
      </TweetDiv>
    </div>
  );
};

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const TimeStamp = styled.span`
  margin-top: 8px;
  margin-bottom: 8px;
  color: grey;
`;

const TwitterName = styled.span`
  font-size: 15px;
  margin-left: 10px;
  font-weight: bolder;
`;

const TweetText = styled.div`
  color: black;
  margin-left: 0;
  margin-top: 0;
`;

const TwitterHandle = styled.div`
  color: black;
  margin-left: 10px;
  font-size: 14px;
`;

const TweetHeader = styled.div`
  display: flex;
`;

const TweetDiv = styled.div`
  margin-left: 50px;
  margin-bottom: 10px;
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 550px;
  /* outline-offset: ; */
  /* outline-style: solid;
  outline-width: 1px; */
`;

const BigPic = styled.img`
  width: 500;
  margin-left: 0px;
  margin-top: 8px;
`;

export default TweetDetails;
