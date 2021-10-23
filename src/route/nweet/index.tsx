import { doc, getDoc, onSnapshot } from "@firebase/firestore";
import { LoadingNweet } from "components/loading/index";
import { firebaseAuth, fireCollection, firestore } from "firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import defaultImg from "assets/default.png";
import NweetsFrom from "components/Form/NweetsForm";
import NweetsBtns from "components/Button/NweetBtns";
import Nweets, { NweetImg } from "components/Nweet/Nweets";
import { NweetsType } from "models/nweetType";
import {
  // ArrowIcon,
  // ArrowLeftbtn,
  Content,
  Img,
  ImgBox,
  NickName,
  Text,
  Time,
  UserBox,
  UserValue
} from "./style";
import { LayoutContents } from "components/Layout";

const Nweet = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [nweet, setNweet] = useState<NweetsType[]>();
  const [subNweet, setSubNweet] = useState<any>([]);

  useEffect(() => {
    onSnapshot(fireCollection, snapShot => {
      const nweetInfo: any = snapShot.docs
        .filter(ele => ele.id === userId)
        .map(ele => {
          let relayListData;
          if (ele.data().relay) {
            relayListData = ele.data().relay.map(async (_: any) => {
              const data: any = (await getDoc(doc(firestore, `nweets/${_}`))).data();
              return { data, id: _ };
            });

            Promise.all(relayListData).then(results => {
              setSubNweet(results);
            });
          }

          return {
            id: ele.id,
            createdAd: ele.data().createdAd,
            relayList: [],
            ...ele.data()
          };
        });
      setNweet(nweetInfo);
    });
  }, []);

  return (
    <LayoutContents titleName={"Nweet"}>
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
              <NweetsBtns like={nweet?.[0].like} id={nweet?.[0].id} relay={nweet?.[0].relay} />
            </div>
          </article>
        ) : (
          <LoadingNweet />
        )}
      </Content>

      <div>
        <NweetsFrom relayId={nweet?.[0].id} relay={nweet?.[0].relay} />
        {subNweet.length === 0
          ? ""
          : subNweet &&
            subNweet
              .sort((a: any, b: any) => b.createdAd - a.createdAd)
              .map((ele: any) => (
                <Nweets
                  key={ele.id}
                  info={{ id: ele.id, ...ele.data }}
                  isOwner={ele.data.userId === firebaseAuth.currentUser?.uid}
                />
              ))}
      </div>
    </LayoutContents>
  );
};

export default Nweet;
