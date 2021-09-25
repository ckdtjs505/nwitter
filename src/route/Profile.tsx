import { updateProfile } from "@firebase/auth";
import { getDocs, query, where } from "@firebase/firestore";
import { fireCollection } from "firebase";
import React, { useEffect, useState } from "react";

// type User = {
//   email: string;
//   displayName: string;
//   uid: string;
//   photoURL: string;
// };

const Profile = ({ user }: any) => {
  // const [userInfo] = useState({
  //   email: user.email,
  //   displayName: user.displayName,
  //   uid: user.uid,
  //   photoURL: user.photoURL
  // });

  const [displayName, setDisplayName] = useState(user.displayName || "");

  const getMyNweets = async () => {
    const userInfo = await where("userId", "==", user.uid);
    const _query = await query(fireCollection, userInfo);
    const data = await getDocs(_query);
    data.docs.map(doc => {
      console.log(doc.data());
    });
  };

  const handleNickSumbit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    updateProfile(user, { displayName });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;
    setDisplayName(value);
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <form onSubmit={handleNickSumbit}>
      <input placeholder="닉네임을 입력" value={displayName} onChange={handleChange}></input>
      <button type={"submit"}>닉네임 변경</button>
    </form>
  );
};

export default Profile;
