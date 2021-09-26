import { signInWithPopup } from "@firebase/auth";
import AuthForm from "components/AuthForm";
import { firebaseAuth, googleLoginProvider } from "firebase";

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
    <>
      <AuthForm setIsLogin={setIsLogin}></AuthForm>
      <button name="Goggle" onClick={onClickSocialLogin}>
        Google Login
      </button>
    </>
  );
};

export default Auth;
