import React, { useEffect, useState } from "react";
import TweetFeed from "./TweetFeed";
import { tweet } from "../TweetModel";
import Loading from "../Loading";

const Home = () => {
  const [tweetsById, setTweetsById] = useState<{ [key: string]: tweet }>({});
  const [tweetIds, setTweetIds] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweetIds(data.tweetIds);
        setTweetsById(data.tweetsById);
      });
  }, []);

  console.log(tweetsById, tweetIds);

  if (tweetIds.length < 1 || Object.values(tweetsById).length < 1) {
    return <Loading />;
  }

  return (
    <div>
      <TweetFeed tweetIds={tweetIds} tweetsById={tweetsById} />
    </div>
  );
};

export default Home;
