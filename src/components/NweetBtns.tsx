import { doc, updateDoc } from "@firebase/firestore";
import { firebaseAuth, firestore } from "firebase";
import React from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { BiShare } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { GoComment } from "react-icons/go";
import { HiOutlineHeart } from "react-icons/hi";
import styled from "styled-components";

interface Props {
  id: string;
  like: string[];
  relay: string[];
}

const Contents = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 0.5rem;
`;

const BtnBox = styled.button`
  border: none;
  background: none;
  width: 25px;
  height: 25px;

  &:hover {
    cursor: pointer;
    border-radius: 5rem;
    background-color: #e1eef6;
  }
`;

const NweetsBtns: React.FC<Props> = ({ like = [], relay = [], id }) => {
  const isLoginUserLike = () => {
    return like.includes(firebaseAuth.currentUser?.uid ? firebaseAuth.currentUser?.uid : "");
  };
  const handleLikeBtnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    let likeData;
    if (isLoginUserLike()) {
      likeData = [...like].filter(ele => ele !== firebaseAuth.currentUser?.uid);
    } else {
      likeData = [...like, firebaseAuth.currentUser?.uid];
    }
    await updateDoc(doc(firestore, `nweets/${id}`), {
      like: likeData
    });
  };

  return (
    <Contents>
      <div>
        <BtnBox>
          <GoComment size={15} />
        </BtnBox>
        {relay.length > 0 ? relay.length : ""}
      </div>
      <div>
        <BtnBox>
          <AiOutlineRetweet size={15} />
        </BtnBox>
      </div>
      <div>
        {isLoginUserLike() ? (
          <BtnBox onClick={handleLikeBtnClick}>
            <FcLike size={15} />
          </BtnBox>
        ) : (
          <BtnBox onClick={handleLikeBtnClick}>
            <HiOutlineHeart size={15} />
          </BtnBox>
        )}

        {like && like.length > 0 ? like.length : ""}
      </div>
      <div>
        <BtnBox>
          <BiShare size={15} />
        </BtnBox>
      </div>
    </Contents>
  );
};

export default NweetsBtns;
