import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { ProfileDiv } from "route/profile/style";
import { CloseBtn, Dim, Input, Modal, ModalBtnBox, ModalTitle, SaveBtn } from "./style";

interface Props {
  setIsEditMode: any;
  updateUserProfile: any;
}

export const ProfileModal: React.FC<Props> = ({ setIsEditMode, updateUserProfile }) => {
  const [newDisplayName, setNewDisplayName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;
    setNewDisplayName(value);
  };

  const handleNickSumbit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    updateUserProfile(newDisplayName);
    setIsEditMode(false);
  };

  return (
    <>
      <Dim></Dim>
      <Modal onSubmit={handleNickSumbit}>
        <div>
          <ModalBtnBox>
            <CloseBtn
              onClick={() => {
                setIsEditMode(false);
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
                value={newDisplayName ? newDisplayName : ""}
                onChange={handleChange}
              ></Input>
            </ProfileDiv>
          </div>
        </div>
      </Modal>
    </>
  );
};
