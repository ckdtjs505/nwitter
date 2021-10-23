import React, { useEffect, useState } from "react";
import { onSnapshot } from "@firebase/firestore";
import Nweets from "components/nweet/Nweets";
import NweetsFrom from "components/form/NweetsForm";
import { firebaseAuth, fireCollection } from "firebase";
import { LoadingNweet } from "components/loading/index";
import { NweetsType } from "models/nweetType";
import { LayoutContents } from "components/layout";

const Home: React.FC = () => {
  const [nweets, setNweets] = useState<NweetsType[]>([]);

  useEffect(() => {
    // use Effect 안에서 async를 사용하지못함..
    // 랜더링 이슈로 async를 사용하는 것이 좋은거 같지 않음.
    onSnapshot(fireCollection, snapShot => {
      const nweetsInfo: NweetsType[] = snapShot.docs.map(ele => {
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
    <LayoutContents titleName="Home">
      <NweetsFrom />
      {nweets?.length === 0 ? (
        <LoadingNweet />
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
    </LayoutContents>
  );
};

export default Home;
