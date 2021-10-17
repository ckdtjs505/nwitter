import { onSnapshot } from "@firebase/firestore";
import LoadingFile from "components/LoadingFile";
import { fireCollection } from "firebase";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Main } from "./Home";
import { FiArrowLeft } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { AiOutlineRetweet } from "react-icons/ai";
import { HiOutlineHeart } from "react-icons/hi";
import { BiShare } from "react-icons/bi";
import styled from "styled-components";
import defaultImg from "assets/default.png";
import NweetsFrom from "components/NweetsForm";

interface nweetsType {
  id: string;
  text?: string;
  userId?: string;
  userNickName?: string;
  userPhotoURL?: string;
  createdAd: number;
  fileUrl?: string;
}

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 53px;
  width: 100%;
  border-bottom: rgb(239, 243, 244) 1px solid;
`;

const ArrowLeftbtn = styled.button`
  background: none;
  border: none;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const ArrowIcon = styled(FiArrowLeft)`
  border-radius: 2rem;
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: #f3f4f6;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-decoration: none solid rgb(15, 20, 25);
  white-space: nowrap;
  padding: 16px 16px 0 0px;
  padding-bottom: 16px;
`;

const UserBox = styled.div`
  display: flex;
`;

const ImgBox = styled.div`
  width: 50px;
  height: 50px;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 5rem;
`;

const Nweet = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [nweet, setNweet] = useState<nweetsType[]>();
  const history = useHistory();
  const handleArrowLeftbtnClick = () => {
    history.goBack();
  };

  useEffect(() => {
    onSnapshot(fireCollection, snapShot => {
      const nweetInfo: any = snapShot.docs
        .filter(ele => ele.id === userId)
        .map(ele => {
          return {
            id: ele.id,
            createdAd: ele.data().createdAd,
            ...ele.data()
          };
        });
      setNweet(nweetInfo);
    });
  }, []);

  return (
    <Main>
      <TitleBox>
        <ArrowLeftbtn onClick={handleArrowLeftbtnClick}>
          <ArrowIcon size={15} />
        </ArrowLeftbtn>
        <Title> Nweet </Title>
      </TitleBox>
      <div>
        {nweet?.length === 1 ? (
          <article>
            {console.log(new Date(nweet?.[0].createdAd))}
            <UserBox>
              <ImgBox>
                <Img src={nweet?.[0].userPhotoURL ? nweet?.[0].userPhotoURL : defaultImg}></Img>
              </ImgBox>
              <div>
                <div>{nweet?.[0].userNickName}</div>
                <div>{nweet?.[0].id}</div>
              </div>
            </UserBox>
            <div> {nweet?.[0].text}</div>
            <div> {new Date(nweet?.[0].createdAd).toDateString()}</div>
            <div>
              <button>
                <GoComment size={15} />
              </button>
              <button>
                <AiOutlineRetweet size={15} />
              </button>
              <button>
                <HiOutlineHeart size={15} />
              </button>
              <button>
                <BiShare size={15} />
              </button>

              <NweetsFrom />
            </div>
          </article>
        ) : (
          <LoadingFile />
        )}
      </div>
    </Main>
  );
};

export default Nweet;
