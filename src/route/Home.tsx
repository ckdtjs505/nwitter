import { useEffect, useState } from "react";
import { onSnapshot } from "@firebase/firestore";
import Nweets from "components/Nweets";
import NweetsFrom from "components/NweetsForm";
import { fireCollection } from "firebase";
import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 620px;
  border-right: rgb(239, 243, 244) 1px solid;
  // 스크롤바 생성
  overflow-y: scroll;
  // 스크롤바 미노출
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 860px) {
    width: 95%;
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

const Home = ({ user }: any) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    // use Effect 안에서 async를 사용하지못함..
    // 랜더링 이슈로 async를 사용하는 것이 좋은거 같지 않음.
    onSnapshot(fireCollection, snapShot => {
      const nweetsInfo: any = snapShot.docs.map((ele: any) => {
        return {
          id: ele.id,
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
        <NweetsFrom user={user} />
        {nweets
          .sort((a: any, b: any) => b.createdAd - a.createdAd)
          .map((ele: any) => (
            <Nweets key={ele.id} info={ele} isOwner={ele.userId === user.uid} />
          ))}
      </div>
    </Main>
  );
};

export default Home;
