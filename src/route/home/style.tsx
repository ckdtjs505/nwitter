import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 620px;
  border-right: rgb(239, 243, 244) 1px solid;

  @media (max-width: 860px) {
    width: 95%;
    margin-bottom: 3rem;
  }
`;

export const TitleBox = styled.div`
  height: 53px;
  width: 100%;
  border-bottom: rgb(239, 243, 244) 1px solid;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-decoration: none solid rgb(15, 20, 25);
  white-space: nowrap;
  margin: auto;
  padding: 16px 16px 0 16px;
  padding-bottom: 16px;
`;
