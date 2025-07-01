import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Overlay = styled.div`
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  position: relative;
  background: #222;
  border-radius: 8px;
  padding: 1rem;
  width: 90%;
  max-width: 600px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #444;
`;

const CloseButton = styled.button`
  background-color: #333;
  border: 1px solid #555;
  color: #fff;
  font-size: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover,
  &:focus {
    background-color: #444;
    border-color: #777;
    outline: none;
  }

  &:active {
    background-color: #222;
  }
`;

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => navigate(location.state?.from);

  return (
    <Overlay onClick={handleClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseButton onClick={handleClose}>Закрыть</CloseButton>
        </Header>
        {children}
      </Content>
    </Overlay>
  );
}
