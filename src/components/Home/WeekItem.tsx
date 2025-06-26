import React from "react";
import styled from "styled-components";

const dot: {
  green: string;
  red: string;
  orange: string;
  black: string;
  none: string;
} = {
  green: "#a8fe51",
  red: "#f2612b",
  orange: "#ffbd11",
  black: "#000",
  none: "",
};

const StyledListItem = styled.li<{ today: boolean }>`
  border: 1px solid ${(props) => (props.today ? "#a8fe51" : "#ffffff")};
  background-color: ${(props) => (props.today ? "#a8fe51" : "")};
  width: 38px;
  height: 55px;
  border-radius: 8px;
  position: relative;
`;

const StyledSpan = styled.span<{ today: boolean; dotColor: string }>`
  background-color: ${(props) => dot[props.dotColor]};
  border-radius: 50%;
  width: 4px;
  height: 4px;
  display: inline-block;
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledDayP = styled.p<{ today: boolean }>`
  margin: 0;
  color: ${(props) => (props.today ? "#000" : "#fff")};
  font-size: 13px;
  text-align: center;
  font-weight: 500;
`;

const StyledNumP = styled.p<{ today: boolean }>`
  margin: 0;
  font-size: 12px;
  color: ${(props) => (props.today ? "#000" : "#fff")};
  text-align: center;
`;
const StyledDivText = styled.div`
  position: absolute;
  bottom: 0.2rem;
  left: 50%;
  transform: translateX(-50%);
`;
export default function WeekItem({
  today,
  dotColor,
  item,
}: {
  today: boolean;
  dotColor: string;
  item: any;
}) {
  return (
    <StyledListItem today={today}>
      <StyledSpan today={today} dotColor={dotColor}></StyledSpan>
      <StyledDivText>
        <StyledDayP today={today}>{item?.weekday}</StyledDayP>
        <StyledNumP today={today}>{item?.date?.slice(-2) || ""}</StyledNumP>
      </StyledDivText>
    </StyledListItem>
  );
}
