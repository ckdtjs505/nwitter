import styled from "styled-components";

const Main = styled.aside`
  height: 100%;
  background-color: #f7f9f9;
  margin: 1rem;
  padding: 0.5rem;
  width: 288px;
  border-radius: 1rem;
`;

const Title = styled.h3`
  font-size: 19px;
  font-weight: 800;
  line-height: 23px;
  text-decoration: none solid rgb(15, 20, 25);
  white-space: pre-wrap;
`;

const Aside = () => {
  return (
    <Main>
      <Title>Who to follow</Title>
      <section>
        <img src="" alt="" />

        <div>
          <div>Name</div>

          <button>Follow</button>
        </div>
      </section>

      <button>Show more</button>
    </Main>
  );
};

export default Aside;
