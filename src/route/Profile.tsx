import React, { useContext, useEffect, useState } from "react";
import { doc, getDocs, onSnapshot, query, updateDoc, where } from "@firebase/firestore";
import { firebaseAuth, fireCollection, firestore } from "firebase";
import { updateProfile } from "@firebase/auth";
import { Main, nweetsType, Title, TitleBox } from "./Home";
import Nweets from "components/Nweets";
import styled from "styled-components";
import { AuthContext } from "context";

const ProfileDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: rgb(239, 243, 244) 1px solid;
`;

const Msg = styled.div`
  margin-top: 5rem;
  font-size: 1.2rem;
  text-align: center;
`;
const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;

  div {
    padding-bottom: 0.5rem;
  }
`;
const ProfileBackground = styled.div`
  height: 10rem;
  background-color: #cfd9de;
`;
const ProfileInfo = styled.div`
  padding: 0.5rem;
`;
const ProfileImgBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border: 2px solid white;
  border-radius: 5rem;
  margin-top: -60px;
`;
const EditBtn = styled.button`
  background: none;
  border: soild 1px #cfd9de;
  height: 24px;
  border-radius: 2rem;
`;
const NickName = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
`;
const JoinTime = styled.div`
  font-size: 0.8rem;
  color: #cfd9de;
`;
const FollowBox = styled.div`
  display: flex;
  flex-direction: row;

  div {
    margin-right: 1rem;
  }
`;

const Profile: React.FC = () => {
  const userInfo = useContext(AuthContext);
  const [userNweets, setUserNweets] = useState<nweetsType[]>([]);
  const [newdisplayName, setNewDisplayName] = useState(firebaseAuth.currentUser?.displayName);

  useEffect(() => {
    // 자신이 올린 Nweets 모아보기
    onSnapshot(fireCollection, snapShot => {
      const nweets: nweetsType[] = snapShot.docs
        .filter(ele => ele.data().userId === firebaseAuth.currentUser?.uid)
        .map(ele => {
          return {
            id: ele.id,
            createdAd: ele.data().createdAd,
            like: ele.data().like,
            relay: ele.data().relay,
            parent: ele.data().parent,
            ...ele.data()
          };
        });

      setUserNweets(nweets);
    });
  }, []);

  const handleNickSumbit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (newdisplayName === firebaseAuth.currentUser?.displayName) return;
    if (firebaseAuth.currentUser) {
      await updateProfile(firebaseAuth.currentUser, { displayName: newdisplayName });
      await userInfo?.updateUser(newdisplayName);
    }

    // 닉네임이 업데이트 되면 리스트 데이터의 닉네임도 다 같이 변경되어야함
    const userData = await where("userId", "==", firebaseAuth.currentUser?.uid);
    const _query = await query(fireCollection, userData);
    const querySnapshot = await getDocs(_query);
    querySnapshot.forEach(document => {
      updateDoc(doc(firestore, `nweets/${document.id}`), {
        userNickName: newdisplayName
      });
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;
    setNewDisplayName(value);
  };

  return (
    <Main>
      <TitleBox>
        <Title> Profile </Title>
      </TitleBox>

      <ProfileBox>
        <ProfileBackground> </ProfileBackground>

        <ProfileInfo>
          <ProfileImgBtn>
            <ProfileImg
              src={
                firebaseAuth.currentUser?.photoURL
                  ? firebaseAuth.currentUser?.photoURL
                  : "assets/default.png"
              }
              alt="photo"
            />
            <EditBtn>edit profile</EditBtn>
          </ProfileImgBtn>

          <NickName>{firebaseAuth.currentUser?.displayName}</NickName>
          <JoinTime>{firebaseAuth.currentUser?.metadata.creationTime}</JoinTime>
          <FollowBox>
            <div> 0 Following</div>
            <div> 0 Followers</div>
          </FollowBox>
        </ProfileInfo>
      </ProfileBox>

      {/* <div>
        <nav>
          <ul>
            <li>Tweets</li>
            <li>Tweets &amp; replies</li>
            <li>Media</li>
            <li>Likes</li>
          </ul>
        </nav>

        <div>contents</div>
      </div> */}
      <ProfileDiv>
        <form onSubmit={handleNickSumbit}>
          <input
            placeholder="닉네임을 입력"
            value={newdisplayName ? newdisplayName : ""}
            onChange={handleChange}
          ></input>
          <button type={"submit"}>Edit NickName</button>
        </form>
      </ProfileDiv>

      <TitleBox>
        <Title> My Nweets </Title>
      </TitleBox>
      <div>
        {userNweets.length === 0 ? (
          <Msg>
            작성된 Nweets이 없습니다 <br />
          </Msg>
        ) : (
          userNweets
            .sort((a, b) => (b.createdAd > a.createdAd ? 1 : -1))
            .map((ele, idx) => {
              return (
                <Nweets
                  key={idx}
                  info={ele}
                  isOwner={ele.userId === firebaseAuth.currentUser?.uid}
                />
              );
            })
        )}
      </div>
    </Main>
  );
};

export default Profile;
