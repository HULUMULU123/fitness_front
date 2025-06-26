import React from "react";
import WeekItem from "./WeekItem";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  width: 90%;
  margin: auto;
  justify-content: space-between;
`;

export default function WeekList({ weekData }: { weekData: any }) {
  return (
    <StyledList>
      {weekData ? (
        weekData.map((item) => {
          let dotColor = "none";
          if (item.has_workout && item.is_today) {
            dotColor = "black";
          } else if (item.has_workout) {
            dotColor = "green";
          }

          return (
            <WeekItem
              key={item.date}
              today={item.is_today}
              dotColor={dotColor}
              item={item}
            />
          );
        })
      ) : (
        <p>null</p>
      )}
    </StyledList>
  );
}
