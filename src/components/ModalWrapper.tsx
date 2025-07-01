import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Плавное появление оверлея
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Полноэкранный полупрозрачный фон с анимацией
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.25s ease forwards;
  z-index: 999;
`;

// Контейнер с модальным контентом
const Content = styled.div`
  position: relative;
  background: #222;
  padding: 2rem;
  border-radius: 12px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
  color: white;
`;

// Кнопка закрытия с hover-эффектом и aria-label для доступности
const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem; // Сделал справа, это привычнее для UX
  font-size: 1.8rem;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover,
  &:focus {
    color: #f44336; // красный оттенок при наведении и фокусе
    outline: none;
  }
`;

interface ModalWrapperProps {
  children: React.ReactNode;
}

export default function ModalWrapper({ children }: ModalWrapperProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    // Если from не передан — вернуться на корень
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  };

  return (
    <Overlay onClick={handleClose} role="dialog" aria-modal="true">
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose} aria-label="Close modal" autoFocus>
          ×
        </CloseButton>
        {children}
      </Content>
    </Overlay>
  );
}
