import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from "@firebase/auth";
import { firebaseAuth, googleLoginProvider } from "firebase";
import { loginException } from "components/Error";

const Auth = ({ setIsLogin }: { setIsLogin: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createNewAccount] = useState(false);
  const [error, setError] = useState("");

  // 소셜 로그인 버튼 클릭시
  const onClickSocialLogin = () => {
    signInWithPopup(firebaseAuth, googleLoginProvider)
      .then(result => {
        console.log(result);
        setIsLogin(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // 아이디 비밀번호 입력시
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.name === "elEmail") {
      setEmail(e.target.value);
    } else if (e.target.name === "elPassword") {
      setPassword(e.target.value);
    }
  };

  // 로그인, 계정 생성 버튼
  const hanldeSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      let result;
      if (createNewAccount) {
        // 계정 생성
        result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      } else {
        // 로그인
        result = await signInWithEmailAndPassword(firebaseAuth, email, password);
        setIsLogin(true);
      }
      console.log(result);
    } catch (error) {
      // TODO - Error 코드 파일로 빼기
      setError(loginException.errorValue(error as { code: string; message: string }));
    }
  };

  return (
    <>
      <form onSubmit={hanldeSubmit}>
        <input
          value={email}
          name="elEmail"
          type="email"
          onChange={handleInput}
          placeholder={"아이디를 입력하세요"}
          required
        ></input>
        <input
          value={password}
          name="elPassword"
          type="password"
          onChange={handleInput}
          placeholder={"비밀번호를 입력하세요"}
          required
        ></input>
        <button name="login" type="submit">
          {createNewAccount ? "create account" : "Login"}
        </button>
      </form>

      <div>{error ? error : ""}</div>
      <button name="Goggle" onClick={onClickSocialLogin}>
        Google Login
      </button>
    </>
  );
};

export default Auth;
