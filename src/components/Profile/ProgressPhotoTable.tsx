import React from "react";
import styled from "styled-components";
import { usePhotos } from "../../hooks/usePhotos";
import { BASE_MEDIA_URL } from "../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

// Стили
const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  margin-top: 3rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 90vw;
`;

const Title = styled.h2`
  color: #f0f0f0;
  font-size: 1.5rem;
`;

const AddButton = styled.button`
  background-color: #1e88e5;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(30, 136, 229, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1565c0;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  min-width: 600px;
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  background-color: #222222;
  border-bottom: 2px solid #000000;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #222222;
  vertical-align: top;
`;

const Tr = styled.tr``;

const Img = styled.img`
  height: 160px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

// Компонент
const ProgressPhotoTable = () => {
  const { photos, isLoading, error } = usePhotos();
  const navigate = useNavigate();
  const location = useLocation();
  const handleAddPhoto = () => {
    // Открытие модального окна, переход на форму, и т.п.
    console.log("Добавить фото");
  };

  if (!photos || photos.length === 0) return <LoadingSpinner />;

  return (
    <Wrapper>
      <Header>
        <Title>Фото прогресса</Title>
        <AddButton
          onClick={() => {
            navigate("/update_photo", {
              state: { from: location.state?.from },
            });
          }}
        >
          +
        </AddButton>
      </Header>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Дата</Th>
              <Th>Фото спереди</Th>
              <Th>Фото сзади</Th>
            </tr>
          </thead>
          <tbody>
            {photos.map((item) => (
              <Tr key={item.id}>
                <Td>{item.date}</Td>
                <Td>
                  <Img
                    src={`${BASE_MEDIA_URL}${item.photo_front}`}
                    alt={`Фото спереди от ${item.date}`}
                  />
                </Td>
                <Td>
                  <Img
                    src={`${BASE_MEDIA_URL}${item.photo_side}`}
                    alt={`Фото сбоку от ${item.date}`}
                  />
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Wrapper>
  );
};

export default ProgressPhotoTable;
