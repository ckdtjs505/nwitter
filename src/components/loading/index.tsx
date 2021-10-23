import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingNweetContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
`;

export const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <Loader type="Rings" color="#000000" height={80} width={80} />
      <div>loading... </div>
    </LoadingContainer>
  );
};

export const LoadingNweet = () => {
  return (
    <LoadingNweetContainer>
      <Loader type="TailSpin" height={30} width={30} color="#1d9bf0" radius={10} />
    </LoadingNweetContainer>
  );
};
