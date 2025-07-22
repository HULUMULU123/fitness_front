import React from "react";
import { useLocation } from "react-router-dom";
import { PlayCircle } from "lucide-react";
import { useExercise } from "../../hooks/useExercise";
import { BASE_MEDIA_URL } from "../../utils/constants";
import styled from "styled-components";

const Card = styled.div`
  padding-bottom: 10rem;
`;

const Image = styled.img`
  width: 100vw;
  height: 60vh;
  object-fit: contain;
  border-radius: 12px;
  background-color: #2b2b2b;
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  color: #f0f0f0;
  margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
  color: #bbbbbb;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
`;

const Difficulty = styled.span<{ level: string }>`
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${({ level }) =>
    level === "easy" ? "#a8fe51" : level === "medium" ? "#ffbd11" : "#f2612b"};
  color: ${({ level }) =>
    level === "easy" ? "#000" : level === "medium" ? "#000" : "#fff"};
  border-radius: 20px;
  padding: 0.25rem 0.5rem;
`;

const VideoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #2196f3;
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
export default function Exercise() {
  const location = useLocation();
  const id = location.state?.id;
  const { exercise } = useExercise(id);
  console.log(exercise);
  return (
    <Card>
      {exercise?.photo ? (
        <Image src={`${BASE_MEDIA_URL}${exercise.photo}`} alt={exercise.name} />
      ) : (
        <Image as="div" />
      )}
      <Content>
        <Difficulty level={exercise?.difficulty}>
          {exercise?.difficulty === "easy"
            ? "Лёгко"
            : exercise?.difficulty === "medium"
            ? "Средне"
            : "Сложно"}
        </Difficulty>
        <Title>{exercise?.name}</Title>
        <Description>{exercise?.description}</Description>

        {exercise?.video_url && (
          <VideoLink
            href={exercise?.video_url}
            target="_blank"
            rel="noreferrer"
          >
            <PlayCircle size={18} />
            Смотреть видео
          </VideoLink>
        )}
      </Content>
    </Card>
  );
}
