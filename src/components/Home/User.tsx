import React, { useState } from "react";
import ava from "../../assets/ava.jpg";
import styled from "styled-components";
import { FaBell } from "react-icons/fa6";
import useGlobal from "../../hooks/global";
import { getTodayFormatted } from "../../utils/helpers";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0 0 0;
  width: 85%;
  margin: auto;
`;

const StyledImg = styled.img`
  border-radius: 100px;
`;

const StyledTextDiv = styled.div`
  width: 90%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledP = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
`;

const StyledDate = styled.p`
  margin: 0;
  font-size: 10px;
  text-align: center;
  font-weight: 100;
`;

const StyledNotDiv = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
`;

const StyledSpan = styled.span`
  background: red;
  border-radius: 100px;
  position: absolute;
  z-index: 2;
  bottom: 0;
  right: -20%;
  width: 10px;
  height: 10px;
  padding: 0;
`;
// 💬 Список уведомлений
const NotificationList = styled.ul`
  position: absolute;
  top: 30px;
  right: 0;
  width: 200px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 0.5rem;
  list-style: none;
  z-index: 10;
`;

const NotificationItem = styled.li`
  font-size: 12px;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  color: #000;
  &:last-child {
    border-bottom: none;
  }
`;

export default function User() {
  const userData = useGlobal((state) => state.userData);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    "Новое сообщение от тренера",
    "Обновлённое расписание",
    "Добавлена новая тренировка",
  ];

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <StyledDiv>
      <StyledImg src={userData?.photo_url || ava} width={54} height={54} />
      <StyledTextDiv>
        <StyledP>
          Привет, <b>{userData?.first_name}</b>
        </StyledP>
        <StyledDate>Сегодня {getTodayFormatted()}</StyledDate>
      </StyledTextDiv>

      {/* <StyledNotDiv onClick={toggleNotifications}>
        <FaBell size={24} />
        <StyledSpan />
        {showNotifications && (
          <NotificationList>
            {notifications.map((n, i) => (
              <NotificationItem key={i}>{n}</NotificationItem>
            ))}
          </NotificationList>
        )}
      </StyledNotDiv> */}
    </StyledDiv>
  );
}
