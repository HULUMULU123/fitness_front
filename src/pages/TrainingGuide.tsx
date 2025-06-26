import React, { useState } from "react";
import styled from "styled-components";

// Пример данных
const initialExercises = [
  {
    id: 1,
    name: "Приседания",
    description: "Базовое упражнение для развития ног и ягодиц.",
    muscles: ["Ноги", "Ягодицы"],
    type: "Силовое",
    difficulty: "Среднее",
  },
  {
    id: 2,
    name: "Прыжки на скакалке",
    description: "Отличное кардио упражнение для выносливости.",
    muscles: ["Ноги", "Сердце"],
    type: "Кардио",
    difficulty: "Легкое",
  },
  {
    id: 3,
    name: "Жим штанги лёжа",
    description: "Основное упражнение для грудных мышц.",
    muscles: ["Грудь", "Руки"],
    type: "Силовое",
    difficulty: "Сложное",
  },
];

// === Стили ===

const PageContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
  color: #fff;
  text-align: center;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  margin: 0 auto 20px;
  width: 90%;
  max-width: 400px;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border-radius: 12px;
  border: 1px solid #444;
  background-color: #1e1e1e;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: #888;
    font-style: italic;
  }

  &:focus {
    border-color: #2196f3;
    background-color: #2a2a2a;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.2);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
  font-size: 16px;
`;

const FilterSortBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const SortButton = styled.button<{ active?: boolean }>`
  flex: 1 1 auto;
  min-width: 120px;
  max-width: 45%;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => (props.active ? "#2196f3" : "#1e1e1e")};
  color: ${(props) => (props.active ? "#fff" : "#ccc")};
  font-size: 14px;
  cursor: pointer;

  /* Отключение всех видов обводки */
  outline: none;
  box-shadow: none;
  -webkit-tap-highlight-color: transparent;

  &:active,
  &:focus {
    outline: none;
    box-shadow: none;
    transform: none;
  }

  @media (max-width: 400px) {
    max-width: 100%;
  }
`;

const FilterButton = styled(SortButton)`
  background-color: ${(props) =>
    props.active ? "#f2612b" : "#1e1e1e"} !important;
  color: ${(props) => (props.active ? "#fff" : "#ccc")};
`;

const ExercisesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ExerciseCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  padding: 12px;
`;

const ExerciseName = styled.h2`
  font-size: 16px;
  margin: 0 0 8px;
  color: #fff;
`;

const ExerciseInfo = styled.p`
  font-size: 13px;
  color: #aaa;
  margin: 0 0 8px;
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  background-color: ${(props) => {
    switch (props.difficulty) {
      case "Легкое":
        return "#d99c00";
      case "Среднее":
        return "#7853fb";
      case "Сложное":
        return "#f2612b";
      default:
        return "#444";
    }
  }};
  color: #fff;
`;

const DetailsButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  padding: 6px 12px;
  background-color: #2a2a2a;
  color: #2196f3;
  border: 1px solid #2196f3;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2196f3;
    color: #fff;
    border-color: #2196f3;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  /* Убираем системные эффекты */
  outline: none;
  -webkit-tap-highlight-color: transparent;
`;

export default function TrainingGuide() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [difficultyOrder, setDifficultyOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<"all" | "Силовое" | "Кардио">(
    "all"
  );

  // Фильтрация
  const filtered = initialExercises.filter((ex) => {
    const matchesSearch = ex.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || ex.type === filterType;
    return matchesSearch && matchesType;
  });

  // Сортировка по названию
  const sortedByName = [...filtered].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      : b.name.localeCompare(a.name, undefined, { sensitivity: "base" });
  });

  // Сортировка по сложности
  const getDifficultyValue = (diff: string) => {
    switch (diff) {
      case "Легкое":
        return 1;
      case "Среднее":
        return 2;
      case "Сложное":
        return 3;
      default:
        return 0;
    }
  };

  const sortedByDifficulty = [...sortedByName].sort((a, b) => {
    return difficultyOrder === "asc"
      ? getDifficultyValue(a.difficulty) - getDifficultyValue(b.difficulty)
      : getDifficultyValue(b.difficulty) - getDifficultyValue(a.difficulty);
  });

  return (
    <PageContainer>
      <Header>
        <Title>Справочник</Title>
      </Header>

      <SearchInputWrapper>
        <SearchIcon></SearchIcon>
        <SearchInput
          type="text"
          placeholder="Поиск упражнения..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchInputWrapper>

      <FilterSortBar>
        <SortButton
          active={true}
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          По названию {sortOrder === "asc" ? "↑" : "↓"}
        </SortButton>
        <SortButton
          active={true}
          onClick={() =>
            setDifficultyOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          По сложности {difficultyOrder === "asc" ? "↑" : "↓"}
        </SortButton>
        <FilterButton
          active={filterType === "Силовое"}
          onClick={() => setFilterType("Силовое")}
        >
          Силовые
        </FilterButton>
        <FilterButton
          active={filterType === "Кардио"}
          onClick={() => setFilterType("Кардио")}
        >
          Кардио
        </FilterButton>
        <FilterButton
          active={filterType === "all"}
          onClick={() => setFilterType("all")}
        >
          Все
        </FilterButton>
      </FilterSortBar>

      <ExercisesList>
        {sortedByDifficulty.map((exercise) => (
          <ExerciseCard key={exercise.id}>
            <ExerciseName>{exercise.name}</ExerciseName>
            <ExerciseInfo>{exercise.description}</ExerciseInfo>
            <DifficultyBadge difficulty={exercise.difficulty}>
              {exercise.difficulty}
            </DifficultyBadge>
            <DetailsButton>Подробнее</DetailsButton>
          </ExerciseCard>
        ))}
      </ExercisesList>
    </PageContainer>
  );
}
