import { onSnapshot } from "@firebase/firestore";
import LoadingFile from "components/LoadingFile";
import { fireCollection } from "firebase";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Main, nweetsType } from "./Home";
import { FiArrowLeft } from "react-icons/fi";
import styled from "styled-components";
import defaultImg from "assets/default.png";
import NweetsFrom from "components/NweetsForm";
import NweetsBtns from "components/NweetBtns";
import { NweetImg } from "components/Nweets";

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

const Content = styled.div`
  padding: 10px;
  border-bottom: rgb(239, 243, 244) 1px solid;
`;

const UserValue = styled.div`
  margin-left: 0.5rem;
`;

const NickName = styled.h2`
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
`;

const Text = styled.p`
  margin-top: 1rem;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
`;

const Time = styled.span`
  font-size: 14px;
  color: rgb(83, 100, 113);
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
      <Content>
        {nweet?.length === 1 ? (
          <article>
            <UserBox>
              <ImgBox>
                <Img src={nweet?.[0].userPhotoURL ? nweet?.[0].userPhotoURL : defaultImg}></Img>
              </ImgBox>
              <UserValue>
                <NickName>{nweet?.[0].userNickName}</NickName>
                <div>{nweet?.[0].id}</div>
              </UserValue>
            </UserBox>

            <div>
              <Text> {nweet?.[0].text}</Text>
              <NweetImg src={nweet?.[0].fileUrl} />
              <Time>{new Date(nweet?.[0].createdAd).toDateString()}</Time>
              <NweetsBtns like={nweet?.[0].like} id={nweet?.[0].id} />
            </div>
          </article>
        ) : (
          <LoadingFile />
        )}
      </Content>
      <NweetsFrom />
    </Main>
  );
};

export default Nweet;
