import { signOut, updateProfile } from "@firebase/auth";
import { doc, getDocs, onSnapshot, query, updateDoc, where } from "@firebase/firestore";
import Nweets from "components/Nweets";
import { firebaseAuth, fireCollection, firestore } from "firebase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Main, Title, TitleBox } from "./Home";

// type User = {
//   email: string;
//   displayName: string;
//   uid: string;
//   photoURL: string;
// };

const ProfileDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: rgb(239, 243, 244) 1px solid;
`;

const Profile = ({ user, updateUser }: any) => {
  const [userNweets, setuserNweets] = useState([]);
  const [newdisplayName, setNewDisplayName] = useState(user.displayName);

  const history = useHistory();
  const handleLogout = () => {
    signOut(firebaseAuth);
    history.push("/");
  };

  useEffect(() => {
    // 자신이 올린 Nweets 모아보기
    onSnapshot(fireCollection, snapShot => {
      const nweets: any = snapShot.docs
        .filter((ele: any) => ele.data().userId === user.uid)
        .map((ele: any) => {
          return {
            id: ele.id,
            ...ele.data()
          };
        });

      setuserNweets(nweets);
    });
  }, []);

  const handleNickSumbit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (newdisplayName === user.displayName) return;
    await updateProfile(user, { displayName: newdisplayName });
    await updateUser(newdisplayName);

    // 닉네임이 업데이트 되면 리스트 데이터의 닉네임도 다 같이 변경되어야함
    const userInfo = await where("userId", "==", user.uid);
    const _query = await query(fireCollection, userInfo);
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
          <input placeholder="닉네임을 입력" value={newdisplayName} onChange={handleChange}></input>
          <button type={"submit"}>Edit NickName</button>
        </form>
        <button onClick={handleLogout}> Logout </button>
      </ProfileDiv>

      <TitleBox>
        <Title> My Nweets </Title>
      </TitleBox>
      <div>
        {userNweets
          .sort((a: any, b: any) => b.createdAd - a.createdAd)
          .map((ele: any, idx) => {
            return <Nweets key={idx} info={ele} isOwner={ele.userId === user.uid} />;
          })}
      </div>
    </Main>
  );
};

export default Profile;