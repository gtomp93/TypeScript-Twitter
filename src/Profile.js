import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { formatDate } from "tough-cookie";
import { COLORS } from "./Constants";
import { format } from "date-fns";
import Tweet from "./Tweet";
import { TweetContext } from "./TweetContext";
import { u1F4A3 } from "react-icons-kit/noto_emoji_regular/u1F4A3";
import { Icon } from "react-icons-kit";

const Profile = () => {
  const { profileId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const { tweetIds, tweetsById } = useContext(TweetContext);

  const { currentUser, setCurrentUser, setStatus, status } =
    useContext(CurrentUserContext);

  let listOfTweets = [];

  console.log(tweetsById);

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        console.log("profile", data);
        setProfileData(data);
      })
      .catch((err) => {
        setStatus("error");
        console.log(err);
      });
  }, []);

  const { profile } = profileData ? profileData : { profile: undefined };

  let newdate = 0;

  if (profile) {
    let date = new Date(profile.joined);
    newdate = format(date, "MMMM yyyy");
    console.log(newdate);

    Object.values(tweetsById).forEach((tweet) => {
      if (tweet.retweetFrom) {
        if (tweet.retweetFrom.handle === profile.handle) {
          listOfTweets.push(tweet);
        }
      }
      if (tweet.author.handle === profile.handle) {
        listOfTweets.push(tweet);
      }
    });
  }

  if (status === "error") {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Icon size={64} icon={u1F4A3} style={{ alignContent: "center" }} />
        </div>
        <p style={{ textAlign: "center" }}>An Unknown Error has Occured</p>
        <p style={{ textAlign: "center" }}>
          Please try refreshing the page or contact suppor for help
        </p>
      </div>
    );
  }

  console.log("listoftweets", listOfTweets);

  if (!profile || !newdate) {
    return <div>Loading</div>;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginLeft: "30px" }}
    >
      <Header>
        <Banner src={profile.bannerSrc}></Banner>
        <ProfileImg src={profile.avatarSrc}></ProfileImg>
        <FollowButton>
          {profile.isBeingFollowedByYou ? "Following" : "Follow"}
        </FollowButton>
      </Header>

      <DisplayName>{profile.displayName}</DisplayName>
      <div style={{ marginTop: "4px" }}>
        {" "}
        <Handle>@{profile.handle}</Handle>
        <FollowsYou>{profile.isFollowingYou ? "Follows you" : null}</FollowsYou>
      </div>
      <div style={{ marginTop: "10px", marginBottom: "2px", width: "600px" }}>
        {profile.bio}
      </div>
      <div style={{ marginTop: "12px", display: "flex", alignItems: "center" }}>
        <FiMapPin
          style={profile.location ? { height: "22px" } : { display: "none" }}
        />
        <Location
          style={
            profile.location
              ? { marginRight: "22px" }
              : { display: "none", marginRight: 0 }
          }
        >
          {profile.location}
        </Location>
        <FiCalendar style={{ height: "22px" }}></FiCalendar>
        <Joined>Joined {newdate}</Joined>
      </div>
      <div style={{ marginTop: "12px" }}>
        <Follow>
          <strong
            style={{ color: "black", marginRight: "5px", display: "inline" }}
          >
            {profile.numFollowing}
          </strong>
          Following
        </Follow>
        <Follow>
          <strong
            style={{ color: "black", marginRight: "5px", display: "inline" }}
          >
            {profile.numFollowers}
          </strong>
          Followers
        </Follow>
      </div>
      <div style={{ display: "flex", marginTop: "15px" }}>
        <ProfileTab
          style={{
            color: `${COLORS.primary}`,
            borderBottom: `3px solid ${COLORS.primary}`,
          }}
        >
          Tweets
        </ProfileTab>
        <ProfileTab>Media</ProfileTab>
        <ProfileTab>Likes</ProfileTab>
      </div>
      {Object.values(tweetsById).map((tweet) => {
        if (tweet.author.handle === profile.handle) {
          return <Tweet tweet={tweet} tweetid={tweet.id}></Tweet>;
        } else if (tweet.retweetFrom) {
          return tweet.retweetFrom.handle === profile.handle ? (
            <Tweet tweet={tweet} tweetid={tweet.id}></Tweet>
          ) : null;
        }
      })}
    </div>
  );
};

const Header = styled.div`
  position: relative;
  margin-bottom: 80px;
`;

const Banner = styled.img`
  width: 600px;
`;

const ProfileTab = styled.div`
  color: #404040;
  font-size: 22px;
  text-align: center;
  width: 200px;
  font-weight: bold;
  margin-bottom: 12px;
  margin-top: 12px;
  padding-bottom: 15px;
`;

const ProfileImg = styled.img`
  z-index: 5;
  position: absolute;
  top: 122px;
  left: 30px;
  width: 150px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 5px solid #f0ffff;
`;

const FollowButton = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
  align-content: center;
  background-color: ${COLORS.primary};
  height: 35px;
  width: 95px;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  position: absolute;
  top: 220px;
  left: 490px;
`;

const DisplayName = styled.span`
  color: black;
  font-weight: bolder;
  font-size: 20px;
`;

const Handle = styled.span`
  color: grey;
  font-size: 15px;
  margin-top: 10px;
`;

const FollowsYou = styled.span`
  color: #2f4f4f;
  background-color: lightgrey;
  margin-left: 10px;
  border-radius: 4px;
`;

const Location = styled.span`
  color: grey;
  margin-left: 6px;
`;

const Joined = styled.span`
  color: grey;
  margin-left: 6px;
  margin-right: 22px;
`;

const Follow = styled.span`
  color: grey;
  font-size: 15px;
  margin-top: 12px;
  margin-right: 16px;
`;

export default Profile;
