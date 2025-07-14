import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import styled from "styled-components";
import { useStatistics } from "../../hooks/useStatistic";
import bodySrc from "../../assets/bodyMeasure.png";
import LoadingSpinner from "../LoadingSpinner";
import NotFound from "../NotFound";
// Стили для вкладок
const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#0088FE" : "#eee")};
  color: ${({ active }) => (active ? "white" : "black")};
  border: none;
  border-radius: 4px;
`;

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}-${month}`;
};

const BodyChart = () => {
  const {
    statistics,
    weight_difference,
    start_weight,
    wish_weght,
    time_interval,
    isLoading,
    error,
  } = useStatistics();
  const [activeTab, setActiveTab] = useState<"main" | "limbs" | "weight">(
    "weight"
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <NotFound />;
  if (!Array.isArray(statistics)) return <NotFound />;

  // Добавляем форматированную дату в каждый объект (для оси X)
  const dataWithFormattedDate = statistics.map((item) => ({
    ...item,
    formattedDate: formatDate(item.created_at),
  }));

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        marginTop: "5rem",
      }}
    >
      <TabsContainer>
        <TabButton
          active={activeTab === "main"}
          onClick={() => setActiveTab("main")}
        >
          Тело
        </TabButton>
        <TabButton
          active={activeTab === "limbs"}
          onClick={() => setActiveTab("limbs")}
        >
          Конечности
        </TabButton>
        <TabButton
          active={activeTab === "weight"}
          onClick={() => setActiveTab("weight")}
        >
          Вес
        </TabButton>
      </TabsContainer>

      {activeTab === "weight" && (
        <>
          <h3 style={{ textAlign: "center" }}>График: Основные метрики</h3>
          <div style={{ marginLeft: "-2rem", width: "99%" }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataWithFormattedDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="formattedDate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#0088FE"
                  name="Вес"
                />
                <Line
                  type="monotone"
                  y={start_weight}
                  stroke="#82ca9d"
                  name="Нач. вес"
                />
                <ReferenceLine
                  y={start_weight}
                  stroke="#82ca9e"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  y={wish_weght}
                  stroke="#ff7300"
                  name="Жел. вес"
                />
                <ReferenceLine
                  y={wish_weght}
                  stroke="#ff7300"
                  strokeDasharray="3 3"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {activeTab === "main" && (
        <>
          <h3 style={{ textAlign: "center" }}>График: Основные метрики</h3>
          <div style={{ marginLeft: "-2rem", width: "99%" }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataWithFormattedDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="formattedDate" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="waist"
                  stroke="#82ca9d"
                  name="Талия"
                />
                <Line
                  type="monotone"
                  dataKey="chest"
                  stroke="#ffc658"
                  name="Грудь"
                />
                <Line
                  type="monotone"
                  dataKey="hips"
                  stroke="#ff7300"
                  name="Таз"
                />
                <Line
                  type="monotone"
                  dataKey="buttock"
                  stroke="#0088FE"
                  name="Ягодицы"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {activeTab === "limbs" && (
        <>
          <h3 style={{ textAlign: "center" }}>График: Конечности</h3>
          <div style={{ marginLeft: "-2rem", width: "99%" }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataWithFormattedDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="formattedDate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bicep_left"
                  stroke="#0088FE"
                  name="Бицепс (лев)"
                />
                <Line
                  type="monotone"
                  dataKey="bicep_right"
                  stroke="#00C49F"
                  name="Бицепс (прав)"
                />
                <Line
                  type="monotone"
                  dataKey="thigh_left"
                  stroke="#FFBB28"
                  name="Бедро (лев)"
                />
                <Line
                  type="monotone"
                  dataKey="thigh_right"
                  stroke="#FF8042"
                  name="Бедро (прав)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
      {activeTab === "weight" ? (
        <p style={{ padding: "0 1rem" }}>
          За все время вес изменился на {weight_difference} кг
        </p>
      ) : null}
      <p style={{ padding: "0 1rem" }}>
        На графике представлены замеры с {time_interval.first_date} по{" "}
        {time_interval.last_date}
      </p>
      <img
        src={bodySrc}
        style={{
          width: "80%",
          margin: "auto 0 ",
          position: "absolute",
          transform: "translateX(-50%)",
          left: "50%",
          paddingBottom: "6rem",
        }}
      />
    </div>
  );
};
export default BodyChart;
