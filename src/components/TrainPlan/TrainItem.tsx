import React, { useState } from "react";
import styled, { css } from "styled-components";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const StyledTrainItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid #444;
`;

const TrainHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 8px 0;
`;

const StyledTrinLabel = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #fff;
`;

const ArrowButton = styled.button<{ isOpen: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: transform 0.3s ease;
  outline: none;

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s ease-out, opacity 0.3s ease-out;
  opacity: 0;
  padding: 0.5rem 0;

  ${(props) =>
    props.isOpen &&
    css`
      max-height: 200px;
      opacity: 1;
      transition: max-height 0.5s ease-in-out, opacity 0.3s ease-in-out;
    `}
`;

const DropdownText = styled.span`
  display: block;
  font-size: 14px;
  color: #ccc;
  padding: 4px 0;
`;

const ExerciseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  width: 98%;
`;

const ExerciseLabel = styled.span`
  font-size: 14px;
  color: #ccc;
`;

const StatusIndicator = styled.span<{ completed: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.completed ? "#4caf50" : "#666")};
  margin-left: 12px;
  transition: background-color 0.3s ease;
`;

const DetailsButton = styled(Link)`
  background: #3a3a3a;
  color: #fff;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 8px;
  align-self: flex-start;
  outline: none;

  &:focus {
    outline: none;
  }

  &:hover {
    background: #4a4a4a;
  }
`;

export default function TrainItem({ training }: { training: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  // Статичные данные упражнений с флагом выполнено/не выполнено
  const exercises = [
    { name: "Упражнение 1", completed: true },
    { name: "Упражнение 2", completed: false },
    { name: "Упражнение 3", completed: true },
  ];

  return (
    <StyledTrainItem>
      <TrainHeader onClick={() => setIsOpen((prev) => !prev)}>
        <StyledTrinLabel>{training?.weekday}</StyledTrinLabel>
        <ArrowButton isOpen={isOpen} aria-expanded={isOpen}>
          {isOpen ? (
            <IoIosArrowDown size={24} />
          ) : (
            <IoIosArrowForward size={24} />
          )}
        </ArrowButton>
      </TrainHeader>

      <DropdownContent isOpen={isOpen}>
        {training?.exercises && training.exercises.length > 0 ? (
          <>
            {training.exercises.slice(0, 3).map((item) => (
              <ExerciseItem key={`exercise-${item?.exercise.id}`}>
                <ExerciseLabel>{item?.exercise.name}</ExerciseLabel>
                <StatusIndicator completed={item?.is_completed} />
              </ExerciseItem>
            ))}
            {training.exercises.length > 3 && (
              <ExerciseItem>
                <ExerciseLabel style={{ opacity: 0.7 }}>…</ExerciseLabel>
              </ExerciseItem>
            )}
          </>
        ) : (
          <p style={{ color: "#fff" }}>
            В этот день тренировка не запланирована
          </p>
        )}

        {training?.id ? (
          <DetailsButton
            to="/train"
            state={{ workoutId: training?.id, from: location.pathname }}
          >
            Подробнее →
          </DetailsButton>
        ) : null}
      </DropdownContent>
    </StyledTrainItem>
  );
}
