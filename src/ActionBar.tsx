import React, { FormEvent, useState } from "react";
import { FiRepeat, FiMessageCircle, FiHeart, FiShare } from "react-icons/fi";
import styled from "styled-components";

const ActionBar: React.FC = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [numLikes, setNumLikes] = useState<number>(0);

  const likeTweet = (e: FormEvent) => {
    e.preventDefault();
    setIsLiked((isLiked: boolean) => !isLiked);
    setNumLikes((numLikes: number) => (isLiked ? numLikes - 1 : numLikes + 1));
  };

  return (
    <ActionBarContainer>
      <Button>
        <FiMessageCircle />
      </Button>
      <Button>
        <FiRepeat />
      </Button>
      <div
        style={{
          width: "40px",
          height: "30px",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <Button onClick={likeTweet}>
          <FiHeart style={isLiked ? { fill: "red" } : { fill: "none" }} />
        </Button>
        {numLikes > 0 && <span>{numLikes}</span>}
      </div>
      <Button>
        <FiShare />
      </Button>
    </ActionBarContainer>
  );
};

export default ActionBar;

const Button = styled.button`
  background: transparent;
  border: none;
`;

const ActionBarContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
`;
