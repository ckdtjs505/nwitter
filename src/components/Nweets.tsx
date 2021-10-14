import { fireStoage, firestore } from "firebase";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import React, { useState } from "react";
import { deleteObject, ref } from "@firebase/storage";
import styled from "styled-components";
import defaultImg from "../assets/default.png";
import { MdDelete, MdOutlineEdit } from "react-icons/md";

interface Props {
  info: {
    text?: string;
    id: string;
    fileUrl?: string;
    userPhotoURL?: string;
    userNickName?: string;
    createdAd: number;
  };
  isOwner: boolean;
}

const NweetData = styled.div`
  display: flex;
  padding: 10px;
  min-height: 60px;
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

export const NweetImg = styled.img`
  max-width: 100%;
  height: auto;
  border: solid 1px #d6dfe3;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 1.2rem;
`;

const Button = styled.button`
  background: none;
  border: none;
`;

const ButtonBox = styled.div`
  position: relative;
  width: 15px;
`;

const InfoText = styled.p`
  width: 100%;
  word-break: break-all;
`;

const InputFix = styled.input`
  width: 80%;
`;

export const DefaultButton = styled.button`
  border: none;
  color: black;
  /* width: 2.5rem; */
  height: 1.5rem;
`;

const Nweets: React.FC<Props> = ({ info, isOwner }) => {
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
      <NweetData>
        <LeftBox>
          <Img src={info.userPhotoURL === null ? defaultImg : info.userPhotoURL} alt="" />
          <div>
            <h3 style={{ marginBottom: "0.5rem" }}>
              <Title>{info.userNickName} </Title>
              {` · ${new Date(info.createdAd).getMonth() + 1}/${new Date(
                info.createdAd
              ).getDate()}`}
            </h3>
            {isEdit ? (
              <form onSubmit={handleSumbit}>
                <InputFix
                  type="text"
                  placeholder={"수정할 데이터를 입력해주세요"}
                  onChange={handleChange}
                  value={editText}
                />
                <DefaultButton type="submit">완료</DefaultButton>
              </form>
            ) : (
              <InfoText> {info.text} </InfoText>
            )}
            {info.fileUrl && <NweetImg src={info.fileUrl} />}
          </div>
        </LeftBox>
        {isOwner && (
          <ButtonBox>
            <Button onClick={handleDelete}>
              <MdDelete />
            </Button>
            <Button onClick={handleToggle}>
              <MdOutlineEdit />
            </Button>
          </ButtonBox>
        )}
      </NweetData>
    </div>
  );
};

export default Nweets;
