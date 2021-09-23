import { firestore } from "firebase";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import React, { useState } from "react";

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
      console.log("delete");
    }
  };

  const handleToggle = () => {
    setIsEdit(prev => !prev);
  };

  const handleSumbit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(editText);

    handleToggle();

    await updateDoc(doc(firestore, `nweets/${info.id}`), {
      text: editText
    });
  };

  return (
    <div key={info.id}>
      <h4> {info.text} </h4>
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
        ""
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
