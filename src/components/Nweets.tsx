import { fireStoage, firestore } from "firebase";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import React, { useState } from "react";
import { deleteObject, ref } from "@firebase/storage";
import styled from "styled-components";
import defaultImg from "../img/default.png";

const NweetData = styled.form`
  display: flex;
  padding: 10px;
  min-height: 116px;
  border-bottom: rgb(239, 243, 244) 1px solid;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const LeftBox = styled.div`
  display: flex;
`;

const NweetImg = styled.img`
  width: 400px;
  width: 400px;
  border: solid 1px #d6dfe3;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;

  @media (max-width: 860px) {
    width: 70%;
  }
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 1.2rem;
`;
const Nweets = ({ info, isOwner }: any) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(info.text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;
    setEditText(value);
  };

  const handleDelete = () => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      deleteDoc(doc(firestore, `nweets/${info.id}`));
      if (info.fileUrl) deleteObject(ref(fireStoage, info.fileUrl));
    }
  };

  const handleToggle = () => {
    setIsEdit(prev => !prev);
  };

  const handleSumbit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    handleToggle();

    await updateDoc(doc(firestore, `nweets/${info.id}`), {
      text: editText
    });
  };

  return (
    <div key={info.id}>
      {isEdit ? (
        <form onSubmit={handleSumbit}>
          <input
            type="text"
            placeholder={"수정할 데이터를 입력해주세요"}
            onChange={handleChange}
            value={editText}
          ></input>
          <button type="submit">완료</button>
        </form>
      ) : (
        <NweetData>
          <LeftBox>
            <Img src={info.userPhotoURL === null ? defaultImg : info.userPhotoURL} alt="" />
            <div>
              <h3 style={{ marginBottom: "0.5rem" }}>
                <Title>{info.userNickName} </Title>
                {` · ${new Date(info.createdAd).getMonth()}/${new Date(info.createdAd).getDate()}`}
              </h3>
              <h4> {info.text} </h4>
              {info.fileUrl && <NweetImg src={info.fileUrl} />}
            </div>
          </LeftBox>
          {isOwner && (
            <div>
              <button onClick={handleDelete}>삭제</button>
              <button onClick={handleToggle}>{isEdit ? "수정 종료" : "수정"}</button>
            </div>
          )}
        </NweetData>
      )}
    </div>
  );
};

export default Nweets;
