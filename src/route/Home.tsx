import { onSnapshot } from "@firebase/firestore";
import Nweets from "components/Nweets";
import NweetsFrom from "components/NweetsFrom";
import { fireCollection } from "firebase";
import React, { useEffect, useState } from "react";

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
    <div>
      <NweetsFrom user={user} />
      {nweets.map((ele: any) => (
        <Nweets key={ele.id} info={ele} isOwner={ele.userId === user.uid} />
      ))}
    </div>
  );
};

export default Home;
