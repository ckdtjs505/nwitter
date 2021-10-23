/* eslint-disable no-unused-vars */
import { firebaseAuth, fireCollection, fireStoage, firestore } from "firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import defaultImg from "assets/default.png";
import { FiImage } from "react-icons/fi";
import React, { useState } from "react";
import { addDoc, doc, updateDoc } from "@firebase/firestore";
import { DefaultButton, NweetImg } from "../nweet/Nweets";
import { Content, FileInput, Img, NweetBtn, NweetForm, NweetsInput, UploadBox } from "./style";

interface Props {
  relayId?: string;
  relay?: string[];
}

const NweetsFrom: React.FC<Props> = ({ relayId, relay = [] }) => {
  const [text, setText] = useState("");
  const [uploadFile, setUploadFile] = useState<string | undefined | null>(null);
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
      alert("텍스트를 입력해주세욧");
      return;
    }

    setText("");
    setUploadFile(null);

    let fileUrl = "";
    if (uploadFile) {
      const fileRef = await ref(fireStoage, `${firebaseAuth.currentUser?.uid}/${uuidv4()}`);
      await uploadString(fileRef, uploadFile, "data_url");
      fileUrl = await getDownloadURL(fileRef);
    }

    await addDoc(fireCollection, {
      text,
      createdAd: Date.now(),
      userId: firebaseAuth.currentUser?.uid,
      userPhotoURL: firebaseAuth.currentUser?.photoURL,
      userNickName: firebaseAuth.currentUser?.displayName,
      like: [],
      relay: [],
      parent: relayId ? relayId : null,
      fileUrl
    }).then(ele => {
      if (relayId) {
        // 부모 컨포넌트에 생겨야한다.
        updateDoc(doc(firestore, `nweets/${relayId}`), {
          relay: [...relay, ele.id]
        });
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files }
    } = e;
    const uploadFile = files?.[0];
    const reader = new FileReader();
    reader.onloadend = (e: ProgressEvent<FileReader>) => {
      setUploadFile(String(e.target?.result));
    };
    if (uploadFile) reader.readAsDataURL(uploadFile);
  };

  const handleDeleteImg = () => {
    setUploadFile(null);
  };

  return (
    <NweetForm onSubmit={handleSubmit}>
      <Img
        src={
          firebaseAuth.currentUser?.photoURL == undefined
            ? defaultImg
            : firebaseAuth.currentUser?.photoURL
        }
      />

      <Content>
        <NweetsInput
          value={text}
          onChange={handleChange}
          type="text"
          placeholder={relayId ? "댓글쓰기" : "What`s happening?"}
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
    </NweetForm>
  );
};

export default NweetsFrom;
