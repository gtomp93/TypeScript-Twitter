export type tweet = {
  id: string;
  author: {
    handle: string;
    displayName: string;
    avatarSrc: string;
    bannerSrc: string;
    location: string;
    url: string;
    joined: string;
    bio: string;
    numFollowing: number;
    numFollowers: string;
    numLikes: 2;
    isFollowingYou: true;
    isBeingFollowedByYou: true;
  };
  retweetFrom?: string;
  timestamp: string;
  isLiked: boolean;
  isRetweeted: boolean;
  numLikes: number;
  numRetweets: number;
  status: string;
  media: {
    type: string;
    url: string;
  }[];
};
