import Loader from "react-loader-spinner";
import styled from "styled-components";

const Layout = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
`;
const LoadingFile = () => {
  return (
    <Layout>
      <Loader type="TailSpin" height={30} width={30} color="#1d9bf0" radius={10} />
    </Layout>
  );
};

export default LoadingFile;
