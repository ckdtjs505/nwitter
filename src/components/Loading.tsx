import Loader from "react-loader-spinner";
import styled from "styled-components";

const Layout = styled.div`
  margin: auto;
  justify-content: center;
`;

const Loading = () => {
  return (
    <Layout>
      <Loader type="Rings" color="#000000" height={80} width={80} />
      <div>loading... </div>
    </Layout>
  );
};

export default Loading;
