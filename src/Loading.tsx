import React from "react";
import { FiLoader } from "react-icons/fi";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  console.log("umm");
  return <Loader size={50} />;
};

export default Loading;

const spin = keyframes`
    from{transform: rotate(0deg)}
    to{transform: rotate(360deg)}
`;

const Loader = styled(FiLoader)`
  animation: ${spin} 2000ms linear infinite;
`;
