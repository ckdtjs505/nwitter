import React, { useContext, useEffect, useState } from "react";
import { doc, getDocs, onSnapshot, query, updateDoc, where } from "@firebase/firestore";
import { firebaseAuth, fireCollection, firestore } from "firebase";
import { updateProfile } from "@firebase/auth";
import Nweets from "components/nweet/Nweets";
import { AuthContext } from "context/context";
import { NweetsType } from "models/nweetType";
import {
  EditBtn,
  FollowBox,
  JoinTime,
  Msg,
  NickName,
  ProfileBackground,
  ProfileBox,
  ProfileImg,
  ProfileImgBtn,
  ProfileInfo
} from "./style";
import { LayoutContents } from "components/layout";
import { ProfileModal } from "components/modal";

const Profile: React.FC = () => {
  const userInfo = useContext(AuthContext);
  const [userNweets, setUserNweets] = useState<NweetsType[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // 자신이 올린 Nweets 모아보기
    onSnapshot(fireCollection, snapShot => {
      const nweets: NweetsType[] = snapShot.docs
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

  const updateUserProfile = async (newDisplayName: string) => {
    if (newDisplayName === firebaseAuth.currentUser?.displayName) return;
    if (firebaseAuth.currentUser) {
      await updateProfile(firebaseAuth.currentUser, { displayName: newDisplayName });
      await userInfo?.updateUser(newDisplayName);
    }

    // 닉네임이 업데이트 되면 리스트 데이터의 닉네임도 다 같이 변경되어야함
    const userData = await where("userId", "==", firebaseAuth.currentUser?.uid);
    const _query = await query(fireCollection, userData);
    const querySnapshot = await getDocs(_query);
    querySnapshot.forEach(document => {
      updateDoc(doc(firestore, `nweets/${document.id}`), {
        userNickName: newDisplayName
      });
    });
  };

  return (
    <LayoutContents titleName={"Profile"}>
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
            <EditBtn onClick={() => setIsEditMode(!isEditMode)}>edit profile</EditBtn>
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

      {isEditMode ? (
        <ProfileModal setIsEditMode={setIsEditMode} updateUserProfile={updateUserProfile} />
      ) : (
        ""
      )}
    </LayoutContents>
  );
};

export default Profile;
