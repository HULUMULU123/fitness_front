import React from "react";
import { IoScaleSharp } from "react-icons/io5";
import styled from "styled-components";
import { FaPills } from "react-icons/fa";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useGlobal from "../../hooks/global";
import { GiMagicLamp } from "react-icons/gi";
import { GoGoal } from "react-icons/go";
import { FaQuestion } from "react-icons/fa6";
const StyledMenuContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 2rem;
`;

const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  gap: 1rem;
`;

const StyledMenuLine = styled.span`
  display: block;
  width: 100%;
  height: 1px;
  background-color: #151515;
`;

const StyledMenuTextDiv = styled.div`
  text-align: center;
`;

const StyledMenuLabel = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400;
`;

const StyledMenuInfo = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 100;
`;
export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useGlobal((state) => state.userData);
  return (
    <StyledMenuContainer>
      <StyledMenuItem
        onClick={() => {
          const targetPath = "/measure";
          navigate(targetPath, {
            state: { from: location.pathname },
          });
        }}
      >
        {/* Children здесь */}

        <IoScaleSharp size={34} />
        <StyledMenuTextDiv>
          <StyledMenuLabel>Замеры тела</StyledMenuLabel>
          {/* <StyledMenuInfo>Изм. 3 дня назад</StyledMenuInfo> */}
        </StyledMenuTextDiv>
      </StyledMenuItem>
      <StyledMenuLine />
      <StyledMenuItem
        onClick={() => {
          navigate("/statistics", {
            state: { from: location.pathname },
          });
        }}
      >
        <BsFileEarmarkBarGraph size={34} />
        <StyledMenuTextDiv>
          <StyledMenuLabel>Статистика</StyledMenuLabel>
          {/* <StyledMenuInfo>За месяц -1.5 кг</StyledMenuInfo> */}
        </StyledMenuTextDiv>
      </StyledMenuItem>
      <StyledMenuLine />
      <StyledMenuItem
        onClick={() => {
          navigate("/vitamins", {
            state: { from: location.pathname },
          });
        }}
      >
        <FaPills size={34} />
        <StyledMenuTextDiv>
          <StyledMenuLabel>Витамины</StyledMenuLabel>
        </StyledMenuTextDiv>
      </StyledMenuItem>
      {/* <StyledMenuLine />
      <StyledMenuItem
        onClick={() => {
          navigate("/update_photo", {
            state: { from: location.pathname },
          });
        }}
      >
        <MdOutlinePhotoLibrary size={34} />
        <StyledMenuTextDiv>
          <StyledMenuLabel>Загрузить фото</StyledMenuLabel>
        </StyledMenuTextDiv>
      </StyledMenuItem> */}
      <StyledMenuLine />
      <StyledMenuItem
        onClick={() => {
          navigate("/photos", {
            state: { from: location.pathname },
          });
        }}
      >
        <MdOutlinePhotoLibrary size={34} />
        <StyledMenuTextDiv>
          <StyledMenuLabel>Фотографии</StyledMenuLabel>
        </StyledMenuTextDiv>
      </StyledMenuItem>
      <StyledMenuLine />
      <StyledMenuItem
        onClick={() => {
          navigate("/wish", {
            state: { from: location.pathname },
          });
        }}
      >
        <GoGoal size={34} />
        <StyledMenuTextDiv>
          <StyledMenuLabel>Цель</StyledMenuLabel>
        </StyledMenuTextDiv>
      </StyledMenuItem>
      <StyledMenuLine />
      <StyledMenuLine />
      <StyledMenuItem
        onClick={() => {
          navigate("/question", {
            state: { from: location.pathname },
          });
        }}
      >
        <FaQuestion size={34} />
        <StyledMenuTextDiv>
          <StyledMenuLabel>Анкета</StyledMenuLabel>
        </StyledMenuTextDiv>
      </StyledMenuItem>
      <StyledMenuLine />
    </StyledMenuContainer>
  );
}
