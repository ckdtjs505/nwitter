import styled from "styled-components";

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  line-height: 2rem;
  font-weight: 700;
`;

export const AuthInput = styled.input`
  width: 80%;
  margin-bottom: 1rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: none;
  border-bottom: rgb(239, 243, 244) 1px solid;
  padding-left: 0.8rem;
  font-size: 1.2rem;
  prefix: 1rem;
`;

export const AuthButton = styled.button`
  width: 80%;
  height: 2rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
  background-color: white;
  border-radius: 0.5rem;
  border: solid 1px black;
`;

//// nweet from

export const NweetForm = styled.form`
  display: flex;
  padding: 10px;
  border-bottom: rgb(239, 243, 244) 1px solid;
`;

export const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

export const FileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export const NweetsInput = styled.input`
  border: none;
  margin-top: 1rem;
  font-size: 20px;
  width: 100%;
`;

export const UploadBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: rgb(239, 243, 244) 1px solid;
`;

export const NweetBtn = styled.button`
  background-color: #1d9bf0;
  color: white;
  height: 36px;
  width: 75.9688px;
  font-weight: 700;
  font-size: 15px;
  border: none;
  border-radius: 2rem;
`;

export const Content = styled.div`
  width: 100%;
`;
