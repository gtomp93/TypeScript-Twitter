import React, { createContext, useContext, useState, useEffect } from "react";
import { u1F4A3 } from "react-icons-kit/noto_emoji_regular/u1F4A3";
import { Icon } from "react-icons-kit";
import { loading } from "react-icons-kit/ikons/loading";
import styled, { keyframes } from "styled-components";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
        console.log(err);
      });
  }, []);

  console.log(currentUser);
  // CreateProfile = (data) =>{
  //     setCurrentUser(data.profile)
  // }

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

  if (!currentUser) {
    return <Loading icon={loading} size={70}></Loading>;
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, status, setStatus }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

const spin = keyframes`
 from { transform: rotate(0deg); }
 to { transform: rotate(1200deg) }
`;

const Loading = styled(Icon)`
  color: grey;
  animation: ${spin} 5s forwards;
`;
