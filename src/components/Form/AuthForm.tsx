import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { loginException } from "components/Error";
import { firebaseAuth } from "firebase";
import { AuthButton, AuthInput, LoginForm } from "./style";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createNewAccount, setCreateNewAccount] = useState(false);
  const [error, setError] = useState("");

  // 아이디 비밀번호 입력시
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      }
      console.log(result);
    } catch (error) {
      // TODO - Error 코드 파일로 빼기
      setError(loginException.errorValue(error as { code: string; message: string }));
    }
  };

  const handleClickCreateNew = () => {
    setCreateNewAccount(true);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <LoginForm onSubmit={hanldeSubmit}>
        <AuthInput
          value={email}
          name="elEmail"
          type="email"
          onChange={handleInput}
          placeholder={"아이디"}
          required
        ></AuthInput>

        <AuthInput
          value={password}
          name="elPassword"
          type="password"
          onChange={handleInput}
          placeholder={"비밀번호"}
          required
        ></AuthInput>

        <AuthButton name="login" type="submit">
          {createNewAccount ? "아이디 생성하기" : "로그인"}
        </AuthButton>
      </LoginForm>
      {!createNewAccount ? <AuthButton onClick={handleClickCreateNew}>회원가입</AuthButton> : ""}
      <div>{error ? error : ""}</div>
    </>
  );
};

export default AuthForm;
