import React from "react";
import styled from "styled-components";
import trainer from "../../assets/trainer.jpg";
import { Link } from "react-router-dom";
import { useStatistics } from "../../hooks/useStatistic";
const StyledGridContainer = styled.div`
  display: grid;
  gap: 10px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  grid-template-areas:
    "a a c c"
    "a a c c"
    "a a c c"
    "a a c c";
`;

const Card = styled.div`
  background-color: #eee;
  border-radius: 12px;
  padding: 1rem;
  font-family: "Roboto", sans-serif;
  position: relative;

  &.big-card {
    grid-area: a;
    background-color: #ffbd11;
  }

  &.vita-card {
    grid-area: b;
    background-color: #2196f3;
  }

  &.weight-card {
    grid-area: c;
    background-color: #f2612b;
    color: white;
    padding: 0.3rem 1rem;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const StyledTrainType = styled.span`
  padding: 0.2rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  font-size: 13px;
  color: #000;
`;

const StyledH3 = styled.h3<{ color: string }>`
  font-size: 24px;

  color: ${(props) => props.color};
  margin: 0.4rem 0;
  line-height: 1.8rem;
`;

const StyledTrainInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTrainInfoP = styled.p`
  margin: 0;
  color: #000;
  font-size: 13px;
`;

const StyledTrainerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const StyledTrainerIMG = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 100px;
`;

const StyledLink = styled(Link)<{ bottom: string }>`
  border: 1px solid #fff;
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  position: absolute;
  right: 0.6rem;
  bottom: ${(props) => props.bottom};
  font-size: 13px;
`;

const trainingType = {
  mixed: "Смешанная",
  cardio: "Кардио",
  strength: "Силовая",
};
export default function GridContainer({
  nextTraining,
  wish,
}: {
  nextTraining: any;
  wish: any;
}) {
  const {
    weight_difference,

    isLoading,
    error,
  } = useStatistics();
  return (
    <StyledGridContainer>
      <Card className="big-card">
        <StyledTrainType>
          {trainingType[nextTraining?.workout_type] || "-"}
        </StyledTrainType>
        <StyledH3 color={"#000"}>Твоя тренировка</StyledH3>
        {nextTraining?.day ? (
          <>
            <StyledTrainInfo>
              <StyledTrainInfoP>{`${nextTraining.day.slice(-2)} ${
                nextTraining.month
              }`}</StyledTrainInfoP>
            </StyledTrainInfo>
            <StyledTrainerInfo>
              <StyledTrainerIMG src={trainer} />
              <div style={{ marginLeft: ".5rem" }}>
                <p style={{ margin: 0, color: "#383838", fontSize: "9px" }}>
                  Тренер
                </p>
                <p
                  style={{
                    margin: 0,
                    color: "#000",
                    fontWeight: 600,
                    marginTop: "-.2rem",
                  }}
                >
                  Денис
                </p>
              </div>
            </StyledTrainerInfo>
            <StyledLink
              to="/train"
              state={{ workoutId: nextTraining.id, from: location.pathname }}
              bottom="1rem"
            >
              Подробнее →
            </StyledLink>
          </>
        ) : (
          <p style={{ color: "black" }}>
            Похоже, у тебя нет ближайшей тренировки :(
          </p>
        )}
      </Card>

      {/* <Card className="vita-card">
        <StyledTrainType>Утро</StyledTrainType>
        <StyledH3 color={"#fff"}>Прием витаминов</StyledH3>
        <div style={{ fontSize: "13px", width: "75%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Название</span>
            <span>БЦА</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Время</span>
            <span>До еды</span>
          </div>
        </div>
        <StyledLink to="/train" bottom="1.2rem">
          Y
        </StyledLink>
      </Card> */}
      <Card className="weight-card">
        {weight_difference ? (
          <>
            {wish.weight && wish.latest_weight ? (
              <div style={{ width: "100%" }}>
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    textAlign: "justify",
                    fontSize: "14px",
                  }}
                >
                  Цель: {wish.weight} кг
                </p>
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    textAlign: "justify",
                    fontSize: "14px",
                  }}
                >
                  Вес: {wish.latest_weight} кг
                </p>
              </div>
            ) : (
              ""
            )}
            <h3
              style={{ fontSize: "40px", margin: "0.5rem 0", fontWeight: 700 }}
            >
              {weight_difference}кг
            </h3>
            <p
              style={{
                margin: 0,
                marginTop: "-.7rem",
                fontSize: "13px",
                width: "90%",
              }}
            >
              За вcе время
            </p>
            <StyledLink to="/statistics" bottom="1rem">
              Y
            </StyledLink>
          </>
        ) : (
          <p>Не хватает данных по замерам :(</p>
        )}
      </Card>
    </StyledGridContainer>
  );
}
