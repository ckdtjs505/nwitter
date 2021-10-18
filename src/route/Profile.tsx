import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { doc, getDocs, onSnapshot, query, updateDoc, where } from "@firebase/firestore";
import { firebaseAuth, fireCollection, firestore } from "firebase";
import { signOut, updateProfile } from "@firebase/auth";
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

const Profile: React.FC = () => {
  const userInfo = useContext(AuthContext);
  const [userNweets, setUserNweets] = useState<nweetsType[]>([]);
  const [newdisplayName, setNewDisplayName] = useState(firebaseAuth.currentUser?.displayName);

  const history = useHistory();
  const handleLogout = () => {
    signOut(firebaseAuth);
    history.push("/");
  };

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
      <ProfileDiv>
        <form onSubmit={handleNickSumbit}>
          <input
            placeholder="닉네임을 입력"
            value={newdisplayName ? newdisplayName : ""}
            onChange={handleChange}
          ></input>
          <button type={"submit"}>Edit NickName</button>
        </form>
        <button onClick={handleLogout}> Logout </button>
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
