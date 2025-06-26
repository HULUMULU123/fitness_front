import React from "react";
import PanelItem from "./PanelItem";
import styled from "styled-components";
import { useProfile } from "../../hooks/useProfile";

const StyledList = styled.ul`
  margin: 0 auto;
  width: 90%;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
`;
export default function PanelList() {
  const { wish_weight, start_weight, exercises, isLoading, error } =
    useProfile();

  const startWeight = `${start_weight} кг`;
  const wishWeight = `${wish_weight} кг`;
  const exericesLen = `${exercises} упр`;
  return (
    <StyledList>
      <PanelItem text="Нач. вес" data={startWeight} bgColor="#a8fe55" />
      <PanelItem text="Ваша цель" data={wishWeight} bgColor="#2196f3" />
      <PanelItem text="Упражнения" data={exercises} bgColor="#ffbd11" />
    </StyledList>
  );
}
