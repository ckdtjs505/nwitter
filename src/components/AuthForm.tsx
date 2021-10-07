import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { loginException } from "components/Error";
import { firebaseAuth } from "firebase";
import React, { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 80%;
  margin-bottom: 1rem;
  height: 3rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  prefix: 1rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  line-height: 2rem;
  font-weight: 700;
`;

export const AuthButton = styled.button`
  width: 80%;
  height: 2rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
  background-color: white;
  border-radius: 1rem;
  list-style: none;
`;

const AuthForm = ({ setIsLogin }: { setIsLogin: any }) => {
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
      <LoginForm onSubmit={hanldeSubmit}>
        <label> id </label>
        <Input
          value={email}
          name="elEmail"
          type="email"
          onChange={handleInput}
          placeholder={"아이디를 입력하세요"}
          required
        ></Input>

        <label> 비밀번호 </label>
        <Input
          value={password}
          name="elPassword"
          type="password"
          onChange={handleInput}
          placeholder={"비밀번호를 입력하세요"}
          required
        ></Input>
        <AuthButton name="login" type="submit">
          {createNewAccount ? "create account" : "Login"}
        </AuthButton>
      </LoginForm>
      <AuthButton onClick={handleClickCreateNew}>
        {createNewAccount ? "로그인" : "회원가입"}
      </AuthButton>
      <div>{error ? error : ""}</div>
    </>
  );
};

export default AuthForm;
