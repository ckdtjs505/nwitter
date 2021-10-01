import { useEffect, useState } from "react";
import { onSnapshot } from "@firebase/firestore";
import Nweets from "components/Nweets";
import NweetsFrom from "components/NweetsForm";
import { fireCollection } from "firebase";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  height: 100vh;
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

  const TitleBox = styled.div`
    height: 53px;
    border-bottom: rgb(239, 243, 244) 1px solid;
  `;

  const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    text-decoration: none solid rgb(15, 20, 25);
    white-space: nowrap;
    margin: auto;

    padding: 16px 16px 0 16px;
  `;

  const Content = styled.div`
    border-right: rgb(239, 243, 244) 1px solid;
    width: 598px;
  `;

  return (
    <Main>
      <Content>
        <TitleBox>
          <Title>Home </Title>
        </TitleBox>
        <div>
          <NweetsFrom user={user} />
          {nweets.map((ele: any) => (
            <Nweets key={ele.id} info={ele} isOwner={ele.userId === user.uid} />
          ))}
        </div>
      </Content>
      <aside>
        <button> Search Nwitter </button>
        <div>
          <div>You might like</div>
          <div>
            <span>방탄 소년단</span>
            <button>Follow</button>
          </div>
          <div>
            <span>방탄 소년단</span>
            <button>Follow</button>
          </div>
          <div>
            <span>방탄 소년단</span>
            <button>Follow</button>
          </div>
        </div>
      </aside>
    </Main>
  );
};

export default Home;
