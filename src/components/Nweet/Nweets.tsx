import { fireStoage, firestore } from "firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "@firebase/firestore";
import React, { useState } from "react";
import { deleteObject, ref } from "@firebase/storage";
import styled from "styled-components";
import defaultImg from "assets/default.png";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { useHistory } from "react-router";
import NweetBtn from "components/button/NweetBtns";

const NweetData = styled.div`
  display: flex;
  padding: 10px;
  min-height: 60px;
  border-bottom: rgb(239, 243, 244) 1px solid;
  justify-content: space-between;

  &:hover {
    background-color: #f3f4f6;
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const Contents = styled.div`
  width: 100%;
`;

const ContentHeader = styled.h2`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const NweetImg = styled.img`
  max-width: 100%;
  width: 96%;
  height: auto;
  border: solid 1px #d6dfe3;
  border-radius: 1rem;
  margin-top: 0.5rem;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 1.2rem;
`;

const Button = styled.button`
  background: none;
  border: none;
`;

const SettingBtn = styled.div`
  display: flex;
`;

export const InfoText = styled.p`
  width: 100%;
  word-break: break-all;
  padding-bottom: 0.5rem;
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

interface Props {
  info: {
    text?: string;
    id: string;
    fileUrl?: string;
    userPhotoURL?: string;
    userNickName?: string;
    createdAd: number;
    like: string[];
    relay: string[];
    parent: string;
  };
  isOwner: boolean;
}

const Nweets: React.FC<Props> = ({ info, isOwner }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(info.text);
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const {
      target: { value }
    } = e;
    setEditText(value);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const data: any = await (await getDoc(doc(firestore, `nweets/${info.parent}`))).data();
    const ok = confirm("????????? ?????????????????????????");
    if (ok) {
      deleteDoc(doc(firestore, `nweets/${info.id}`));
      if (info.fileUrl) deleteObject(ref(fireStoage, info.fileUrl));
      // ?????? ???????????? ????????????
      if (info.parent)
        updateDoc(doc(firestore, `nweets/${info.parent}`), {
          relay: data && data.relay.filter((ele: any) => ele !== info.id)
        });
    }
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEdit(prev => !prev);
  };

  const handleSumbit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsEdit(prev => !prev);

    await updateDoc(doc(firestore, `nweets/${info.id}`), {
      text: editText
    });
  };

  const hanldNweetClick = () => {
    history.push(`/${info.id}/${info.createdAd}`);
  };

  return (
    <div key={info.id}>
      <NweetData onClick={hanldNweetClick}>
        <Img src={info.userPhotoURL === null ? defaultImg : info.userPhotoURL} alt="" />
        <Contents>
          <ContentHeader>
            <div>
              <Title>{info.userNickName} </Title>
              {` ?? ${new Date(info.createdAd).getMonth() + 1}/${new Date(
                info.createdAd
              ).getDate()}`}
            </div>

            {isOwner && (
              <SettingBtn>
                <Button onClick={handleDelete}>
                  <MdDelete />
                </Button>
                <Button onClick={handleToggle}>
                  <MdOutlineEdit />
                </Button>
              </SettingBtn>
            )}
          </ContentHeader>

          {isEdit ? (
            <form onSubmit={handleSumbit}>
              <InputFix
                type="text"
                placeholder={"????????? ???????????? ??????????????????"}
                onChange={handleChange}
                onClick={e => {
                  // ??????????????? ????????? ????????????.. ?????????????
                  e.stopPropagation();
                }}
                value={editText}
              />
              <DefaultButton
                type="submit"
                onClick={e => {
                  // ??????????????? ????????? ????????????.. ?????????????
                  e.stopPropagation();
                }}
              >
                ??????
              </DefaultButton>
            </form>
          ) : (
            <InfoText> {info.text} </InfoText>
          )}

          {info.fileUrl && <NweetImg src={info.fileUrl} />}

          <NweetBtn id={info.id} like={info.like} relay={info.relay} />
        </Contents>
      </NweetData>
    </div>
  );
};

export default Nweets;
