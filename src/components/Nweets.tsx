const Nweets = ({ info, isOwner }: any) => {
  return (
    <div key={info.id}>
      <h4> {info.text} </h4>
      {isOwner && (
        <>
          <button>delete</button>
          <button>edit</button>
        </>
      )}
    </div>
  );
};

export default Nweets;
