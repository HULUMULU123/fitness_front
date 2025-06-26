import React from "react";
import styled from "styled-components";

const StyledItem = styled.li<{ bgColor: string }>`
  padding: 0.5rem 0.5rem;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => (props.bgColor == "#2196f3" ? "#fff" : "#000")};
  border-radius: 10px;
  width: 10rem;
  text-align: center;
`;
const StyledText = styled.p`
  font-size: 13px;
  margin: 0;
`;

const StyledInfo = styled.p`
  font-size: 20px;
  font-weight: 900 !important;
  margin: 0;
  text-align: center;
`;
export default function PanelItem({
  text,
  data,
  bgColor,
}: {
  text: string;
  data: string;
  bgColor: string;
}) {
  return (
    <StyledItem bgColor={bgColor}>
      <StyledText>{text}</StyledText>
      <StyledInfo>{data}</StyledInfo>
    </StyledItem>
  );
}
