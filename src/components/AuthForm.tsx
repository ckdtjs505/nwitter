import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { loginException } from "components/Error";
import { firebaseAuth } from "firebase";
import React, { useState } from "react";

const AuthForm = ({ setIsLogin }: { setIsLogin: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createNewAccount, setCreateNewAccount] = useState(false);
  const [error, setError] = useState("");

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

  const handleClickCreateNew = () => {
    setCreateNewAccount(true);
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
      <button onClick={handleClickCreateNew}>{createNewAccount ? "로그인" : "회원가입"}</button>
      <div>{error ? error : ""}</div>
    </>
  );
};

export default AuthForm;
