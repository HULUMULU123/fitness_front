import React from "react";
import styled from "styled-components";
import GridContainer from "./GridContainer";

const StyledDiv = styled.div`
  margin: auto;
  margin-top: 3rem;
  width: 90%;
  height: 250px;
`;

const StyledH1 = styled.h1`
  font-size: 24px;
  font-weight: 900;
`;

export default function Plan({
  nextTraining,
  wish,
}: {
  nextTraining: any;
  wish: any;
}) {
  return (
    <StyledDiv>
      <StyledH1>Твой план</StyledH1>
      <GridContainer nextTraining={nextTraining} wish={wish} />
    </StyledDiv>
  );
}
