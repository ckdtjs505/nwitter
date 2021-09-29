import { useEffect, useState } from "react";
import { onSnapshot } from "@firebase/firestore";
import Nweets from "components/Nweets";
import NweetsFrom from "components/NweetsForm";
import { fireCollection } from "firebase";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: space-around;
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
      <div>
        <NweetsFrom user={user} />
        {nweets.map((ele: any) => (
          <Nweets key={ele.id} info={ele} isOwner={ele.userId === user.uid} />
        ))}
      </div>
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
