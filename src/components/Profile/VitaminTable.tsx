import React from "react";
import styled from "styled-components";
import { Check } from "lucide-react"; // npm i lucide-react
import { useVitamins } from "../../hooks/useVitamins";
import { BASE_MEDIA_URL } from "../../utils/constants";
import LoadingSpinner from "../LoadingSpinner";
import NotFound from "../NotFound";

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 4rem;
`;

const Table = styled.table`
  min-width: 600px; /* можно больше, если много колонок */
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #212121;
  padding: 0.75rem;
  border: 1px solid #202020;
  white-space: nowrap;
`;

const Td = styled.td`
  text-align: center;
  padding: 0.75rem;
  border: 1px solid #1e1e1e;
  white-space: nowrap;
`;

const VitaminName = styled.td`
  padding: 0.75rem;
  border: 1px solid #181818;
  font-weight: 600;
  text-align: center;
`;

const VitaminImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

const VitaminTable = () => {
  const { vitamins, isLoading, error } = useVitamins();

  const TIME_KEYS = [
    { key: "morning", label: "утро" },
    { key: "afternoon", label: "обед" },
    { key: "evening", label: "вечер" },
    { key: "workout", label: "трен." },
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <NotFound />;

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <Th>Фото</Th>
            <Th>Витамин</Th>
            {TIME_KEYS.map(({ label }) => (
              <Th key={label}>{label}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vitamins?.map((vitamin) => (
            <tr key={vitamin.vitamin.name}>
              <Td>
                <VitaminImage
                  src={`${BASE_MEDIA_URL}${vitamin.vitamin.photo}`}
                  alt={vitamin.vitamin.name}
                />
              </Td>
              <VitaminName>{vitamin.vitamin.name}</VitaminName>
              {TIME_KEYS.map(({ key }) => (
                <Td key={key}>
                  {vitamin.intake_time.includes(key) && (
                    <Check size={20} color="green" />
                  )}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default VitaminTable;
