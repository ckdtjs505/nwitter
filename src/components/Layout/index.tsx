import React, { ReactNode } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Main, Title, TitleBox, ArrowIcon } from "./style";

interface Props {
  children: ReactNode;
  titleName: string;
}

export const LayoutContents: React.FC<Props> = ({ children, titleName }) => {
  const history = useHistory();

  return (
    <Main>
      <TitleBox>
        {titleName !== "Home" ? (
          <ArrowIcon
            size={15}
            onClick={() => {
              history.goBack();
            }}
          />
        ) : (
          ""
        )}

        <Title> {titleName} </Title>
      </TitleBox>
      <div>{children}</div>
    </Main>
  );
};

export const CenteredFlex = styled.div``;
