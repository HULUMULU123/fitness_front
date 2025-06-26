import React from "react";
import styled from "styled-components";
import ava from "../assets/ava.jpg"; // with import
import PanelList from "../components/Profile/PanelList";
import Menu from "../components/Profile/Menu";
import useGlobal from "../hooks/global";
const StyledScreenContainer = styled.div`
  width: 100vw;
`;
const StyledDiv = styled.div`
  display: flex;
  align-items: center;

  padding: 1.5rem;
  width: 85%;
  margin: auto;
`;
const StyledScreenH1 = styled.h1`
  font-size: 20px;
  text-align: center;
  margin: 2rem 0;
`;
const StyledImg = styled.img`
  border-radius: 100px;
`;

const StyledTextDiv = styled.div`
  width: 70%;

  align-items: center;
`;

const StyledP = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  margin-left: 1.5rem;
`;
export default function Profile() {
  const userData = useGlobal((state) => state.userData);
  return (
    <StyledScreenContainer>
      <StyledScreenH1>Профиль</StyledScreenH1>
      <StyledDiv>
        <StyledImg src={userData?.photo_url || ava} width={54} height={54} />

        <StyledP>
          <b>{userData?.first_name}</b>
        </StyledP>
      </StyledDiv>
      <PanelList />
      <Menu />
    </StyledScreenContainer>
  );
}
