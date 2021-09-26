import { fireCollection, fireStoage } from "firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

import React, { useState } from "react";
import { addDoc } from "@firebase/firestore";

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
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={handleChange}
        type="text"
        placeholder="아무거나 입력해"
        maxLength={120}
      ></input>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploadFile && (
        <div>
          <img src={uploadFile} width="50px" height="50px" />
          <button onClick={handleDeleteImg}> 이미지 취소</button>
        </div>
      )}
      <button type="submit">제출</button>
    </form>
  );
};

export default NweetsFrom;
