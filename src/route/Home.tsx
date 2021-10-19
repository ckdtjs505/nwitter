import React, { useEffect, useState } from "react";
import { onSnapshot } from "@firebase/firestore";
import Nweets from "components/Nweets";
import NweetsFrom from "components/NweetsForm";
import { firebaseAuth, fireCollection } from "firebase";
import styled from "styled-components";
import LoadingFile from "components/LoadingFile";

export interface nweetsType {
  id: string;
  text?: string;
  userId?: string;
  userNickName?: string;
  userPhotoURL?: string;
  createdAd: number;
  fileUrl?: string;
  like: string[];
  relay: string[];
  relayList?: nweetsType[];
  parent: string;
}

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 620px;
  border-right: rgb(239, 243, 244) 1px solid;

  @media (max-width: 860px) {
    width: 95%;
    margin-bottom: 3rem;
  }
`;

export const TitleBox = styled.div`
  height: 53px;
  width: 100%;
  border-bottom: rgb(239, 243, 244) 1px solid;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-decoration: none solid rgb(15, 20, 25);
  white-space: nowrap;
  margin: auto;
  padding: 16px 16px 0 16px;
  padding-bottom: 16px;
`;

const Home: React.FC = () => {
  const [nweets, setNweets] = useState<nweetsType[]>([]);

  useEffect(() => {
    // use Effect 안에서 async를 사용하지못함..
    // 랜더링 이슈로 async를 사용하는 것이 좋은거 같지 않음.
    onSnapshot(fireCollection, snapShot => {
      const nweetsInfo: nweetsType[] = snapShot.docs.map(ele => {
        return {
          id: ele.id,
          createdAd: ele.data().createdAd,
          like: ele.data().like,
          relay: ele.data().relay,
          parent: ele.data().parent,
          ...ele.data()
        };
      });
      setNweets(nweetsInfo);
    });
  }, []);

  return (
    <Main>
      <TitleBox>
        <Title> Home </Title>
      </TitleBox>
      <div>
        <NweetsFrom />
        {nweets?.length === 0 ? (
          <LoadingFile />
        ) : (
          nweets
            .sort((a, b) => b.createdAd - a.createdAd)
            .map(ele => (
              <Nweets
                key={ele.id}
                info={ele}
                isOwner={ele.userId === firebaseAuth.currentUser?.uid}
              />
            ))
        )}
      </div>
    </Main>
  );
};

export default Home;
