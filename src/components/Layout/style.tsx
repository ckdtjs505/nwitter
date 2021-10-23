import { FiArrowLeft } from "react-icons/fi";
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
  display: flex;
  height: 53px;
  width: 100%;
  border-bottom: rgb(239, 243, 244) 1px solid;
`;

export const ArrowIcon = styled(FiArrowLeft)`
  border-radius: 2rem;
  padding: 0.5rem;
  margin: auto 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: #f3f4f6;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: auto 0;
  padding-left: 1rem;
`;
