import React from "react";
import ExerciseChart from "../components/TrainPlan/ExcerciseChart";
import styled, { css } from "styled-components";
import TrainList from "../components/TrainPlan/TrainList";
import { useTrainPlan } from "../hooks/useTrainPlan";
import { getTodayFormatted } from "../utils/helpers";

// Контейнер для всей страницы
const PageContainer = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 0 10px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 0 8px;
  }

  @media (max-width: 375px) {
    padding: 0 6px;
  }

  @media (max-width: 320px) {
    padding: 0 4px;
  }
`;

// Заголовок страницы
const StyledScreenH1 = styled.h1`
  font-size: 20px;
  text-align: center;
  margin: 1.5rem 0 1rem;

  @media (max-width: 375px) {
    font-size: 18px;
    margin: 1.2rem 0 0.8rem;
  }

  @media (max-width: 320px) {
    font-size: 16px;
    margin: 1rem 0 0.6rem;
  }
`;

// Дата
const StyledDate = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 375px) {
    font-size: 13px;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 320px) {
    font-size: 12px;
    margin-bottom: 1rem;
  }
`;

// Контейнер для графика
const ChartContainer = styled.div`
  width: 90%;

  @media (max-width: 480px) {
    width: 96%;
  }

  @media (max-width: 375px) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 320px) {
    margin-bottom: 1.2rem;
  }
`;

export default function TrainPlan() {
  const { trainings, isLoading, error, refetch } = useTrainPlan();
  console.log(trainings);
  return (
    <PageContainer>
      <StyledScreenH1>Тренировочный план</StyledScreenH1>
      <StyledDate>Сегодня {getTodayFormatted()}</StyledDate>
      <ChartContainer>
        <ExerciseChart weekTrainings={trainings} isLoading={isLoading} />
      </ChartContainer>
      <TrainList weekTraings={trainings} />
    </PageContainer>
  );
}
