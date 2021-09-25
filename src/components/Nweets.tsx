import { fireStoage, firestore } from "firebase";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import React, { useState } from "react";
import { deleteObject, ref } from "@firebase/storage";

const Nweets = ({ info, isOwner }: any) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(info.text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;
    setEditText(value);
  };

  const handleDelete = () => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      deleteDoc(doc(firestore, `nweets/${info.id}`));
      deleteObject(ref(fireStoage, info.fileUrl));
    }
  };

  const handleToggle = () => {
    setIsEdit(prev => !prev);
  };

  const handleSumbit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    handleToggle();

    await updateDoc(doc(firestore, `nweets/${info.id}`), {
      text: editText
    });
  };

  return (
    <div key={info.id}>
      {isEdit ? (
        <form onSubmit={handleSumbit}>
          <input
            type="text"
            placeholder={"수정할 데이터를 입력해주세요"}
            onChange={handleChange}
            value={editText}
          ></input>
          <button type="submit">완료</button>
        </form>
      ) : (
        <>
          <h4> {info.text} </h4>
          {info.fileUrl && <img src={info.fileUrl} width="50px" height="50px" />}
        </>
      )}
      {isOwner && (
        <>
          <button onClick={handleDelete}>삭제</button>
          <button onClick={handleToggle}>{isEdit ? "수정 종료" : "수정"}</button>
        </>
      )}
    </div>
  );
};

export default Nweets;
