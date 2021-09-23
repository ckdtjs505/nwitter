import { addDoc, onSnapshot } from "@firebase/firestore";
import Nweets from "components/Nweets";
import { fireCollection } from "firebase";
import React, { useEffect, useState } from "react";

const Home = ({ user }: any) => {
  const [text, setText] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    // use Effect 안에서 async를 사용하지못함..
    // 이유 알기..
    onSnapshot(fireCollection, snapShot => {
      const nweetsInfo: any = snapShot.docs.map((ele: any) => {
        return {
          id: ele.id,
          ...ele.data()
        };
      });
      setNweets(nweetsInfo);
    });
  }, []);

  // 텍스트 입력시
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;
    console.log(value);
    setText(value);
  };

  // form tag submit시
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // 값이 비어있는 경우 예외처리
    if (text === "") {
      return;
    }

    setText("");
    await addDoc(fireCollection, {
      text,
      createdAd: Date.now(),
      userId: user.uid
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={handleChange}
          type="text"
          placeholder="아무거나 입력해"
          maxLength={120}
        ></input>
        {/* value Nweet */}
        <button type="submit">제출</button>
      </form>
      {nweets.map((ele: any) => (
        <Nweets key={ele.id} info={ele} isOwner={ele.userId === user.uid} />
      ))}
    </div>
  );
};

export default Home;
