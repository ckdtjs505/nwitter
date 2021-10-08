import { fireCollection, fireStoage } from "firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import defaultImg from "../img/default.png";

import React, { useState } from "react";
import { addDoc } from "@firebase/firestore";
import styled from "styled-components";
import { DefaultButton, NweetImg } from "./Nweets";

const Form = styled.form`
  display: flex;
  padding: 10px;
  border-bottom: rgb(239, 243, 244) 1px solid;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const FileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const NweetsInput = styled.input`
  border: none;
  margin-top: 1rem;
  font-size: 20px;
  width: 100%;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: rgb(239, 243, 244) 1px solid;
`;

const FileFormImg = styled.div`
  width: 25px;
`;

const NweetBtn = styled.button`
  background-color: #1d9bf0;
  color: white;
  height: 36px;
  width: 75.9688px;
  font-weight: 700;
  font-size: 15px;
  border: none;
  border-radius: 2rem;
`;

const Content = styled.div`
  width: 100%;
`;

const NweetsFrom = ({ user }: any) => {
  const [text, setText] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  // 텍스트 입력시
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;
    setText(value);
  };

  // form tag submit시
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // 값이 비어있는 경우 예외처리
    if (text === "") {
      alert("텍스르를 입력해주세욧");
      return;
    }

    setText("");
    setUploadFile(null);

    let fileUrl = "";
    if (uploadFile) {
      const fileRef = await ref(fireStoage, `${user.uid}/${uuidv4()}`);
      await uploadString(fileRef, uploadFile, "data_url");
      fileUrl = await getDownloadURL(fileRef);
    }

    await addDoc(fireCollection, {
      text,
      createdAd: Date.now(),
      userId: user.uid,
      userPhotoURL: user.photoURL,
      userNickName: user.displayName,
      fileUrl
    });
  };

  const handleFileChange = (e: any) => {
    const {
      target: { files }
    } = e;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (e: any) => {
      setUploadFile(e.target.result);
    };
    reader.readAsDataURL(uploadFile);
  };

  const handleDeleteImg = () => {
    setUploadFile(null);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Img src={user.photoURL === null ? defaultImg : user.photoURL} />

      <Content>
        <NweetsInput
          value={text}
          onChange={handleChange}
          type="text"
          placeholder="What's happening?"
          maxLength={120}
        ></NweetsInput>
        {uploadFile && (
          <div>
            <NweetImg src={uploadFile} />
            <DefaultButton onClick={handleDeleteImg}> 이미지 삭제 </DefaultButton>
          </div>
        )}
        <FormFooter>
          <FileFormImg>
            <label htmlFor="upload">
              <svg viewBox="0 0 24 24">
                <g>
                  <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
                  <circle cx="8.868" cy="8.309" r="1.542"></circle>
                </g>
              </svg>
            </label>
            <FileInput id="upload" type="file" accept="image/*" onChange={handleFileChange} />
          </FileFormImg>

          <NweetBtn type="submit">Nweet</NweetBtn>
        </FormFooter>
      </Content>
    </Form>
  );
};

export default NweetsFrom;
