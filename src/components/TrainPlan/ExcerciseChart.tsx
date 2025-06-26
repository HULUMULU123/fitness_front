import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import styled from "styled-components";
import { buildWeekData } from "../../utils/helpers";
import LoadingSpinner from "../LoadingSpinner";

const data = [
  { day: "Пн", exercises: 3 },
  { day: "Вт", exercises: 5 },
  { day: "Ср", exercises: 4 },
  { day: "Чт", exercises: 2 },
  { day: "Пт", exercises: 8 },
  { day: "Сб", exercises: 1 },
  { day: "Вс", exercises: 7 },
];

// Определение цвета в зависимости от количества
const getBarColor = (count: number) => {
  if (count <= 3) return "#f2612b";
  if (count >= 8) return "#2196f3";
  return "#ffbd11";
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 280px;
  background-color: #2a2a2a;
  border-radius: 16px;
  padding: 12px;

  @media (max-width: 480px) {
    padding: 10px;
    height: 250px;
  }

  @media (max-width: 375px) {
    height: 230px;
    padding: 8px;
  }

  @media (max-width: 320px) {
    height: 210px;
    padding: 6px;
  }
`;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#1e1e1e",
          padding: "8px 12px",
          border: "1px solid #444",
          borderRadius: 8,
          fontSize: 14,
          color: "#fff",
        }}
      >
        <strong>{payload[0].payload.day}:</strong> {payload[0].value} упражнений
      </div>
    );
  }
  return null;
};

export default function ExerciseChart({ weekTrainings, isLoading }) {
  if (isLoading) return <LoadingSpinner />;
  const data = buildWeekData(weekTrainings);
  console.log(data, "ddddd");
  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          barCategoryGap={12}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#ccc",
              fontSize: 12,
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#ccc",
              fontSize: 12,
            }}
            allowDecimals={false}
            width={20}
            label={{
              value: "Упражнения",
              angle: -90,
              position: "insideLeft",
              style: {
                textAnchor: "middle",
                fill: "#ccc",
                fontSize: 12,
              },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="exercises"
            radius={[6, 6, 0, 0]}
            barSize={26}
            isAnimationActive={false}
          >
            {data.map((item, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(item.exercises)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
