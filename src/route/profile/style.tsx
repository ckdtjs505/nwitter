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
