import React from "react";
import StyledHeader from "./Header";
import { styled } from "styled-components";
import StyledMain from "./Main";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Main = styled.div`
  width: 900px;
  height: 700px;
  background: white;
  margin: 0 auto;
  border-radius: 12px 12px 0px 0px;
`;

const Separator = styled.hr`
  border: none;
  border: 1px solid rgba(0, 0, 0, 0.08);
  margin: 20px 2.2%;
  width: 95%; /* Set the width to 90% of the container */
`;

function StartPage() {
  return (
    <Container>
      <Main>
        <StyledHeader />
        <Separator />
        <StyledMain />
      </Main>
    </Container>
  );
}

export default StartPage;
