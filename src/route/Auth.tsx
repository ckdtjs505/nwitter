import { signInWithPopup } from "@firebase/auth";
import { firebaseAuth, googleLoginProvider } from "firebase";

const Auth = ({ setIsLogin }) => {
  const onClick = () => {
    signInWithPopup(firebaseAuth, googleLoginProvider)
      .then(result => {
        console.log(result);
        setIsLogin(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <div>auth</div>
      <button name="Goggle" onClick={onClick}>
        Google Login
      </button>
    </>
  );
};

export default Auth;
