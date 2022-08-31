import React from "react";
import Tweet from "../Tweet";
import { tweet } from "../TweetModel";

type props = {
  tweetsById: { [index: string]: tweet };
  tweetIds: string[];
};

const TweetFeed: React.FC<props> = ({ tweetIds, tweetsById }) => {
  return (
    <>
      {tweetIds.map((tweetId) => {
        console.log(tweetId);
        let tweet = tweetsById[tweetId];
        return <Tweet key={tweetId} tweet={tweet} />;
      })}
    </>
  );
};

export default TweetFeed;
