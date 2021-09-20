import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from "@firebase/auth";
import { firebaseAuth, googleLoginProvider } from "firebase";

const Auth = ({ setIsLogin }: { setIsLogin: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  const hanldeSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: string;
      email: { value: string };
      password: { value: string };
    };

    // 계정 생성
    if (target.name === "signIn") {
      createUserWithEmailAndPassword(firebaseAuth, email, password).catch(err => {
        console.log(err);
      });
    } else {
      // 로그인
      signInWithEmailAndPassword(firebaseAuth, email, password);
    }
  };

  return (
    <>
      <div>auth</div>
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
          Login
        </button>
        <button name="signIn" type="submit">
          Sign in
        </button>
      </form>

      <button name="Goggle" onClick={onClickSocialLogin}>
        Google Login
      </button>
    </>
  );
};

export default Auth;
