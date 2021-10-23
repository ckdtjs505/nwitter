import React, { useContext, useEffect, useState } from "react";
import { doc, getDocs, onSnapshot, query, updateDoc, where } from "@firebase/firestore";
import { firebaseAuth, fireCollection, firestore } from "firebase";
import { updateProfile } from "@firebase/auth";
import Nweets from "components/Nweet/Nweets";
import { AuthContext } from "context/context";
import { GrFormClose } from "react-icons/gr";
import { NweetsType } from "models/nweetType";
import {
  CloseBtn,
  Dim,
  EditBtn,
  FollowBox,
  Input,
  JoinTime,
  Modal,
  ModalBtnBox,
  ModalTitle,
  Msg,
  NickName,
  ProfileBackground,
  ProfileBox,
  ProfileDiv,
  ProfileImg,
  ProfileImgBtn,
  ProfileInfo,
  SaveBtn
} from "./style";
import { LayoutContents } from "components/Layout";

const Profile: React.FC = () => {
  const userInfo = useContext(AuthContext);
  const [userNweets, setUserNweets] = useState<NweetsType[]>([]);
  const [newdisplayName, setNewDisplayName] = useState(firebaseAuth.currentUser?.displayName);
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
        <>
          <Dim></Dim>
          <Modal onSubmit={handleNickSumbit}>
            <div>
              <ModalBtnBox>
                <CloseBtn
                  onClick={() => {
                    setIsEditMode(!isEditMode);
                  }}
                >
                  <GrFormClose size={"20px"} />
                </CloseBtn>
                <ModalTitle> Edit Profile </ModalTitle>
                <SaveBtn type={"submit"}> Save </SaveBtn>
              </ModalBtnBox>

              <div>
                <ProfileDiv>
                  <label>name</label>
                  <Input
                    placeholder="닉네임을 입력"
                    value={newdisplayName ? newdisplayName : ""}
                    onChange={handleChange}
                  ></Input>
                </ProfileDiv>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        ""
      )}
    </LayoutContents>
  );
};

export default Profile;
