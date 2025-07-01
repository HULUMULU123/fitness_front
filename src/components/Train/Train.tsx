import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTrainings } from "../../hooks/useDashboard";
import { useWorkout } from "../../hooks/useWorkout";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

const Card = styled.div`
  background-color: #1e1e1e;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  margin: 4rem 0;
  color: #ffffff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const DateText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

const TypeTag = styled.span`
  background-color: #2c2c2c;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.85rem;
  color: #9e9e9e;
`;

const ExerciseList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ExerciseItem = styled.li<{ completed: boolean }>`
  display: grid;
  grid-template-columns: 2rem 1fr 5rem 5rem 2rem;
  align-items: center;
  padding: 0.6rem 0.2rem;
  background-color: ${(props) => (props.completed ? "#2196f3" : "transparent")};
  border-radius: 10px;
  margin-bottom: 0.4rem;
  transition: background-color 0.3s;
  color: ${(props) => (props.completed ? "#fff" : "#fff")};
  font-weight: 600;
`;

const SupersetExerciseItem = styled.li<{ completed: boolean }>`
  display: grid;
  grid-template-columns: 2rem 1fr 5rem 5rem;
  align-items: center;
  padding: 0.6rem 0.2rem;
  background-color: ${(props) => (props.completed ? "#2196f3" : "transparent")};
  border-radius: 10px;
  margin-bottom: 0.4rem;
  transition: background-color 0.3s;
  color: ${(props) => (props.completed ? "#fff" : "#fff")};
  font-weight: 600;
`;

const Index = styled.span<{ completed: boolean }>`
  font-weight: bold;
  color: ${(props) => (props.completed ? "#d4d4d4" : "#bbbbbb")};
  justify-self: center;
`;

const ExerciseName = styled.button<{ completed: boolean }>`
  font-size: 0.95rem;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: white;
  background: transparent;
  outline: none;
  border: none;
  &:active {
    outline: none;
    border: none;
  }
  &:hover {
    border: none;
  }
`;

const DetailItem = styled.span<{ completed: boolean }>`
  font-size: 0.85rem;
  color: ${(props) => (props.completed ? "#d4d4d4" : "#bbbbbb")};

  font-style: italic;
  text-align: center;
`;

const CheckboxWrapper = styled.div`
  justify-self: center;
`;

const Footer = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

const Progress = styled.span`
  font-size: 0.9rem;
  color: #aaaaaa;
`;

const SaveButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  margin: 1rem auto;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const SuperSetCard = styled.div<{ completed: boolean }>`
  background-color: ${(props) => (props.completed ? "#384d6c" : "#292929")};
  border-radius: 16px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  color: #f0f0f0;
  transition: background-color 0.3s ease;
`;

const SuperSetHeader = styled.h3`
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 1.3rem;
  border-bottom: 2px solid #2196f3;
  padding-bottom: 0.3rem;
`;

const Order = styled.span`
  color: #2196f3;
  font-weight: 600;
  justify-self: center;
`;

const Repetitions = styled.span`
  text-align: center;
  color: #b0b0b0;
  font-style: italic;
`;

const Weight = styled.span`
  text-align: center;
  color: #b0b0b0;
  font-style: italic;
`;
// const CheckboxWrapper = styled.div`
//   margin-left: 1rem;
// `;

export default function Train() {
  const location = useLocation();
  const workout_id = location.state?.workoutId;

  const [modified, setModified] = useState<Record<number, boolean>>({});
  const [showSave, setShowSave] = useState(false);
  const [savedSupersets, setSavedSupersets] = useState<Record<number, boolean>>(
    {}
  );
  const navigate = useNavigate();
  const { workout, updateWorkout } = useWorkout(workout_id);
  if (!workout) return <LoadingSpinner />;
  const handleCheckboxChange = (id: any) => {
    setModified((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      setShowSave(Object.values(updated).some((val) => val));
      return updated;
    });
  };
  const handleCheckboxSupersChange = (id: any) => {
    setSavedSupersets((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      setShowSave(Object.values(updated).some((val) => val));
      return updated;
    });
  };
  const {
    id,
    day,
    weekday,
    month,
    workout_type,
    exercise_count,
    completed_exercise_count,
    superset_count,
    completed_superset_count,
    exercises,
    supersets,
    previous_workout,
  } = workout;

  const handleSave = () => {
    const idsToUpdate = Object.entries(modified)
      .filter(([_, isChecked]) => isChecked)
      .map(([id]) => Number(id));
    const supersetsToUpdate = Object.entries(savedSupersets)
      .filter(([_, isChecked]) => isChecked)
      .map(([id]) => Number(id));
    if (idsToUpdate.length > 0) {
      const payload = { id, ids: idsToUpdate };
      updateWorkout.mutate(payload, {
        onSuccess: () => {
          setModified({});
          setShowSave(false);
        },
      });
    }
    if (supersetsToUpdate.length > 0) {
      const payload = { id, superset_ids: supersetsToUpdate };
      updateWorkout.mutate(payload, {
        onSuccess: () => {
          setModified({});
          setShowSave(false);
        },
      });
    }
  };

  const workoutTypeMap: Record<string, string> = {
    mixed: "Смешанная",
    cardio: "Кардио",
    strength: "Силовая",
  };

  console.log(previous_workout);

  return (
    <Card>
      <Header>
        <DateText>
          {weekday}, {day.split("-")[2]} {month}
        </DateText>
        <TypeTag>{workoutTypeMap[workout_type] || "Тренировка"}</TypeTag>
      </Header>

      <ExerciseList>
        <h3>Ваши упражнения в тренировке:</h3>
        {exercises.length > 0 ? (
          <>
            {exercises.map((item: any, index: number) => (
              <ExerciseItem key={index} completed={item.is_completed}>
                <Index completed={item.is_completed}>{index + 1}.</Index>
                <ExerciseName
                  completed={item.is_completed}
                  onClick={() => {
                    navigate("/exercise", {
                      state: {
                        from: location.state?.from,
                        id: item.exercise.id,
                      },
                    });
                  }}
                >
                  {item.exercise.name}
                </ExerciseName>

                <DetailItem completed={item.is_completed}>
                  {item.repetitions != null ? `${item.repetitions} повт.` : ""}
                </DetailItem>

                <DetailItem completed={item.is_completed}>
                  {item.weight != null ? `${item.weight} кг` : ""}
                </DetailItem>

                {!item.is_completed && (
                  <CheckboxWrapper>
                    <input
                      type="checkbox"
                      checked={!!modified[item.id]}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </CheckboxWrapper>
                )}
              </ExerciseItem>
            ))}
          </>
        ) : (
          <p>Упражнений нет</p>
        )}
      </ExerciseList>
      <Footer>
        <Progress>
          Выполнено:{" "}
          <strong>
            {completed_exercise_count}/{exercise_count}
          </strong>
        </Progress>
      </Footer>
      {supersets.length > 0 ? (
        <>
          <h3>Ваши упражнения в суперсете:</h3>
          {supersets.map((superset) => (
            <SuperSetCard completed={superset.is_completed} key={superset.id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minHeight: "32px", // на всякий случай, если нужно выровнять
                }}
              >
                {superset.is_completed ? (
                  <div style={{ width: "28px" }} /> // Пустой блок с шириной как у чекбокса
                ) : (
                  <CheckboxWrapper>
                    <input
                      type="checkbox"
                      checked={!!savedSupersets[superset.id]}
                      onChange={() => handleCheckboxSupersChange(superset.id)}
                    />
                  </CheckboxWrapper>
                )}
                <SuperSetHeader>{superset.superset_name}</SuperSetHeader>
              </div>
              <ExerciseList>
                {superset.exercises
                  .sort((a, b) => a.order - b.order)
                  .map(({ id, exercise_name, repetitions, weight, order }) => (
                    <SupersetExerciseItem key={id} completed={false}>
                      <Order>{order + 1}</Order>
                      <ExerciseName completed={false}>
                        {exercise_name}
                      </ExerciseName>
                      <DetailItem completed={superset.is_completed}>
                        {repetitions !== null ? `${repetitions} повтор` : "-"}
                      </DetailItem>
                      <DetailItem completed={superset.is_completed}>
                        {weight !== null ? `${weight} кг` : "-"}
                      </DetailItem>
                    </SupersetExerciseItem>
                  ))}
              </ExerciseList>
            </SuperSetCard>
          ))}
          <Footer>
            <Progress>
              Выполнено:{" "}
              <strong>
                {completed_superset_count}/{superset_count}
              </strong>
            </Progress>
          </Footer>
        </>
      ) : null}
      {showSave && <SaveButton onClick={handleSave}>Сохранить</SaveButton>}
      {previous_workout ? (
        <>
          <ExerciseList>
            <h3>Упражнения из предыдущей тренировки:</h3>
            {Array.isArray(previous_workout.exercises) &&
            previous_workout.exercises.length > 0 ? (
              previous_workout.exercises.map((item, index) => (
                <ExerciseItem key={index} completed={item.is_completed}>
                  <Index completed={item.is_completed}>{index + 1}.</Index>
                  <ExerciseName completed={item.is_completed}>
                    {item.exercise?.name || "Без названия"}
                  </ExerciseName>
                  <DetailItem completed={item.is_completed}>
                    {item.repetitions != null
                      ? `${item.repetitions} повт.`
                      : ""}
                  </DetailItem>
                  <DetailItem completed={item.is_completed}>
                    {item.weight != null ? `${item.weight} кг` : ""}
                  </DetailItem>
                </ExerciseItem>
              ))
            ) : (
              <p>Упражнений нет</p>
            )}
          </ExerciseList>

          {Array.isArray(previous_workout.supersets) &&
          previous_workout.supersets.length > 0 ? (
            <>
              <h3>Предыдущие суперсеты:</h3>
              {previous_workout.supersets.map((superset) => (
                <SuperSetCard
                  completed={superset.is_completed}
                  key={superset.id}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                      alignItems: "center",
                      minHeight: "32px",
                    }}
                  >
                    {superset.is_completed ? (
                      <div style={{ width: "28px" }} />
                    ) : (
                      // {/* Пустой блок с шириной как у чекбокса */}
                      <CheckboxWrapper>
                        <input
                          type="checkbox"
                          checked={!!savedSupersets[superset.id]}
                          onChange={() =>
                            handleCheckboxSupersChange(superset.id)
                          }
                        />
                      </CheckboxWrapper>
                    )}
                    <SuperSetHeader>{superset.superset_name}</SuperSetHeader>
                  </div>
                  <ExerciseList>
                    {superset.exercises
                      ?.sort((a, b) => a.order - b.order)
                      .map(
                        ({ id, exercise_name, repetitions, weight, order }) => (
                          <SupersetExerciseItem key={id} completed={false}>
                            <Order>{order + 1}</Order>
                            <ExerciseName completed={false}>
                              {exercise_name}
                            </ExerciseName>
                            <DetailItem completed={superset.is_completed}>
                              {repetitions !== null
                                ? `${repetitions} повтор`
                                : "-"}
                            </DetailItem>
                            <DetailItem completed={superset.is_completed}>
                              {weight !== null ? `${weight} кг` : "-"}
                            </DetailItem>
                          </SupersetExerciseItem>
                        )
                      )}
                  </ExerciseList>
                </SuperSetCard>
              ))}
            </>
          ) : null}
        </>
      ) : null}
    </Card>
  );
}
