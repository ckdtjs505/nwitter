import { signInWithPopup } from "@firebase/auth";
import AuthForm, { AuthButton } from "components/AuthForm";
import { firebaseAuth, googleLoginProvider } from "firebase";
import styled from "styled-components";

const AuthFormDiv = styled(AuthForm)`
  margin-top: 1rem;
`;

const AuthLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  @media (max-width: 860px) {
    flex-direction: column-reverse;
    /* display: none; */
    /* position: fixed; */
    width: 100%;
    margin-top: 3rem;
  }
`;

const Img = styled.img`
  width: 60%;
  height: 100vh;

  @media (max-width: 860px) {
    /* display: none; */
    /* position: fixed; */
    z-index: -1;
    width: 100%;
  }
`;

const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* width: 50rem; */
  padding-left: 2rem;
`;

const Subtitle = styled.h2`
  font-size: 31px;
  font-weight: 700;
  line-height: 36px;
  text-decoration: none solid rgb(15, 20, 25);
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 64px;
  font-weight: 700;
  line-height: 84px;
  text-decoration: none solid rgb(15, 20, 25);
  margin-bottom: 2rem;
`;

const Auth = ({ setIsLogin }: { setIsLogin: any }) => {
  // 소셜 로그인 버튼 클릭시
  const onClickSocialLogin = () => {
    signInWithPopup(firebaseAuth, googleLoginProvider)
      .then(() => {
        setIsLogin(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <AuthLayout>
      <Img src="https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png" draggable="false" />
      <AuthBox>
        <Title> Happening now </Title>
        <Subtitle> Join Nwitter today. </Subtitle>
        <AuthFormDiv setIsLogin={setIsLogin}></AuthFormDiv>
        <AuthButton name="Goggle" onClick={onClickSocialLogin}>
          Google Login
        </AuthButton>
      </AuthBox>
    </AuthLayout>
  );
};

export default Auth;
