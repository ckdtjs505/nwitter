import { fireCollection, fireStoage } from "firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import defaultImg from "../assets/default.png";
import { FiImage } from "react-icons/fi";

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

const UploadBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: rgb(239, 243, 244) 1px solid;
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

        <UploadBox>
          <div>
            <label htmlFor="upload">
              <FiImage size={25} />
            </label>
            <FileInput id="upload" type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <NweetBtn type="submit">Nweet</NweetBtn>
        </UploadBox>
      </Content>
    </Form>
  );
};

export default NweetsFrom;
