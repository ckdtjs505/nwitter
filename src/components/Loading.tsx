import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const Layout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading: React.FC = () => {
  return (
    <Layout>
      <Loader type="Rings" color="#000000" height={80} width={80} />
      <div>loading... </div>
    </Layout>
  );
};

export default Loading;
