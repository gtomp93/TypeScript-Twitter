import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TweetFeed from "../HomePage/TweetFeed";
import Loading from "../Loading";
import { tweet } from "../TweetModel";
import { user } from "../user";

const Profile = () => {
  const { profileId } = useParams();
  const [userTweetIds, setUserTweetIds] = useState<string[] | null>(null);
  const [userTweetsById, setUserTweetsById] = useState<{
    [key: string]: tweet;
  } | null>(null);
  const [userInfo, setUserInfo] = useState<user | null>(null);

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        setUserTweetsById(data.tweetsById);
        setUserTweetIds(data.tweetIds);
      });
  }, [profileId]);

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.profile);
      });
  }, [profileId]);

  console.log(userInfo);

  return (
    <Container>
      {userTweetIds && userTweetsById && userInfo ? (
        <>
          <TopContainer>
            <Banner src={userInfo?.bannerSrc}></Banner>
            <Avatar src={userInfo?.avatarSrc} />
          </TopContainer>
          <TweetFeed tweetIds={userTweetIds} tweetsById={userTweetsById} />
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  position: relative;
`;
const TopContainer = styled.div`
  position: relative;
`;

const Banner = styled.img`
  width: 100%;
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  bottom: -100px;
  left: 0;
`;
