import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import Tweet from "./Tweet";
import { tweet } from "./TweetModel";

const TweetDetails = () => {
  const { tweetId } = useParams();
  const [tweetInfo, setTweetInfo] = useState<tweet | null>(null);
  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setTweetInfo(data.tweet);
      });
  }, []);

  if (!tweetInfo) {
    return <Loading />;
  }

  return <Tweet tweet={tweetInfo} />;
};

export default TweetDetails;
