import styled from "styled-components";

export const Contents = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 0.5rem;
`;

export const BtnBox = styled.button`
  border: none;
  background: none;
  width: 25px;
  height: 25px;

  &:hover {
    cursor: pointer;
    border-radius: 5rem;
    background-color: #e1eef6;
  }
`;
