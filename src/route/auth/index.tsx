import React from "react";
import { signInWithPopup } from "@firebase/auth";
import { firebaseAuth, googleLoginProvider } from "firebase";
import { FcCloseUpMode, FcGoogle } from "react-icons/fc";
import { AuthButton, Img } from "components/Form/style";
import { AuthBox, AuthFormDiv, AuthLayout, Subtitle } from "./style";
import { Title } from "route/home/style";

const Auth: React.FC = () => {
  // 소셜 로그인 버튼 클릭시
  const onClickSocialLogin = () => {
    signInWithPopup(firebaseAuth, googleLoginProvider).catch(error => {
      console.log(error);
    });
  };

  return (
    <AuthLayout>
      <Img src="https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png" draggable="false" />
      <AuthBox>
        <FcCloseUpMode size="2.5rem" />
        <Title> Happening now </Title>
        <Subtitle> Join Nwitter today. </Subtitle>
        <AuthFormDiv></AuthFormDiv>
        <AuthButton name="Goggle" onClick={onClickSocialLogin}>
          <FcGoogle /> Google 계정으로 로그인하기
        </AuthButton>
      </AuthBox>
    </AuthLayout>
  );
};

export default Auth;
