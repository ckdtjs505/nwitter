import styled from "styled-components";

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 53px;
  width: 100%;
  border-bottom: rgb(239, 243, 244) 1px solid;
`;

export const ArrowLeftbtn = styled.button`
  background: none;
  border: none;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-decoration: none solid rgb(15, 20, 25);
  white-space: nowrap;
  padding: 16px 16px 0 0px;
  padding-bottom: 16px;
`;

export const UserBox = styled.div`
  display: flex;
`;

export const ImgBox = styled.div`
  width: 50px;
  height: 50px;
`;

export const Img = styled.img`
  width: 100%;
  border-radius: 5rem;
`;

export const Content = styled.div`
  padding: 10px;
  border-bottom: rgb(239, 243, 244) 1px solid;
`;

export const UserValue = styled.div`
  margin-left: 0.5rem;
`;

export const NickName = styled.h2`
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
`;

export const Text = styled.p`
  margin-top: 1rem;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
`;

export const Time = styled.span`
  font-size: 14px;
  color: rgb(83, 100, 113);
`;
