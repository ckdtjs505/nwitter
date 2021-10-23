import styled from "styled-components";

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
