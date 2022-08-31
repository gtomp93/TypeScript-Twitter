import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TweetContext } from "./TweetContext";

const PostDemo = () => {
  const { updateFeed, setUpdateFeed } = useContext(TweetContext);
  const [value, setValue] = useState("");
  const submitFunc = (ev) => {
    e.preventDefault();
    fetch("/whatever", {
      method: "POST",
      body: JSON.stringify({
        status: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setUpdateFeed(!updateFeed);
      });
  };

  return (
    <form onSubmit={(e) => submitFunc(e)}>
      <input onChange={(e) => setValue(e.target.value)} />

      <StyledInput type="submit" />
    </form>
  );
};

export default PostDemo;

const StyledInput = styled.input``;

const AnotherStyledInput = styled(StyledInput)``;
