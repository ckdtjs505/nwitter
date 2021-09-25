import { updateProfile } from "@firebase/auth";
// import { getDocs, query, where } from "@firebase/firestore";
// import { fireCollection } from "firebase";
import React, { useState } from "react";

// type User = {
//   email: string;
//   displayName: string;
//   uid: string;
//   photoURL: string;
// };

const Profile = ({ user, updateUser }: any) => {
  // const [userInfo] = useState({
  //   email: user.email,
  //   displayName: user.displayName,
  //   uid: user.uid,
  //   photoURL: user.photoURL
  // });

  const [newdisplayName, setNewDisplayName] = useState(user.displayName);

  // const getMyNweets = async () => {
  //   const userInfo = await where("userId", "==", user.uid);
  //   const _query = await query(fireCollection, userInfo);
  //   const data = await getDocs(_query);
  //   data.docs.map(doc => {
  //     console.log(doc.data());
  //   });
  // };

  const handleNickSumbit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (newdisplayName === user.displayName) return;
    await updateProfile(user, { displayName: newdisplayName });
    await updateUser(newdisplayName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;
    setNewDisplayName(value);
  };

  // useEffect(() => {
  //   getMyNweets();
  // }, []);

  return (
    <form onSubmit={handleNickSumbit}>
      <input placeholder="닉네임을 입력" value={newdisplayName} onChange={handleChange}></input>
      <button type={"submit"}>닉네임 변경</button>
    </form>
  );
};

export default Profile;
