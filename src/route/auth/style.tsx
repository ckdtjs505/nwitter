import AuthForm from "components/form/AuthForm";
import styled from "styled-components";

export const AuthFormDiv = styled(AuthForm)`
  margin-top: 1rem;
`;

export const AuthLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  @media (max-width: 860px) {
    flex-direction: column-reverse;
    width: 100%;
    margin-top: 3rem;
  }
`;

export const Img = styled.img`
  width: 60%;
  height: 100vh;

  @media (max-width: 860px) {
    z-index: -1;
    width: 100%;
  }
`;

export const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  margin-left: 2rem;
`;

export const Subtitle = styled.h2`
  font-size: 31px;
  font-weight: 700;
  text-decoration: none solid rgb(15, 20, 25);
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 50px;
  font-weight: 700;
  text-decoration: none solid rgb(15, 20, 25);
  margin-bottom: 2rem;
`;
