import styled from "styled-components";

export const ProfileDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

export const Msg = styled.div`
  margin-top: 5rem;
  font-size: 1.2rem;
  text-align: center;
`;
export const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;

  div {
    padding-bottom: 0.5rem;
  }
`;
export const ProfileBackground = styled.div`
  height: 10rem;
  background-color: #cfd9de;
`;
export const ProfileInfo = styled.div`
  padding: 0.5rem;
`;
export const ProfileImgBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border: 2px solid white;
  border-radius: 5rem;
  margin-top: -60px;
`;
export const EditBtn = styled.button`
  background: none;
  border: soild 1px #cfd9de;
  height: 24px;
  border-radius: 2rem;
`;
export const NickName = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
`;
export const JoinTime = styled.div`
  font-size: 0.8rem;
  color: #cfd9de;
`;
export const FollowBox = styled.div`
  display: flex;
  flex-direction: row;

  div {
    margin-right: 1rem;
  }
`;

export const Modal = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  width: 50%;
  /* height: 5%; */
  border-radius: 1rem;
`;

export const ModalBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;

  text-align: center;
  height: 50px;
  border-bottom: solid 1px #cfd9de;
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  padding-left: 1rem;
  margin-top: auto;
  margin-bottom: auto;
  :hover {
    cursor: pointer;
  }
`;

export const ModalTitle = styled.div`
  font-size: 1rem;
  margin-left: 1rem;
  margin-top: auto;
  margin-bottom: auto;
  font-weight: 700;
`;

export const SaveBtn = styled.button`
  margin-left: auto;
  margin-right: 1rem;
  margin-top: auto;
  margin-bottom: auto;
  background: black;
  height: 25px;
  border: none;
  border-radius: 1rem;
  color: white;
  width: 4rem;

  :hover {
    cursor: pointer;
  }
`;

export const Dim = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

export const Input = styled.input`
  width: 80%;
`;
