import React, { useEffect } from "react";
import styled from "styled-components";
import User from "../components/Home/User";
import Quote from "../components/Home/Quote";
import WeekList from "../components/Home/WeekList";
import Plan from "../components/Home/Plan";
import useGlobal from "../hooks/global";
import { useTrainings } from "../hooks/useDashboard";
import LoadingSpinner from "../components/LoadingSpinner";

const StyledBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 8rem;
`;
export default function Home() {
  const { quote, wish, nextTraining, week_data, isLoading, error, refetch } =
    useTrainings();

  const access = localStorage.getItem("access");

  if (!access) return <div>Нет доступа: авторизуйтесь</div>;
  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Ошибка загрузки данных</div>;

  return (
    <StyledBody>
      <User />
      <Quote quote={quote} wish={wish} />
      <WeekList weekData={week_data} />
      <Plan nextTraining={nextTraining} wish={wish} />
    </StyledBody>
  );
}
