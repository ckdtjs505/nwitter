import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const Div = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loading: React.FC = () => {
  return (
    <Div>
      <Loader type="Rings" color="#000000" height={80} width={80} />
      <div>loading... </div>
    </Div>
  );
};

export default Loading;
