import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Overlay = styled.div`
  inset: 0;
  background: black;
`;

const Content = styled.div`
  position: relative;
`;

const Header = styled.div`
  display: flex;

  padding: 0.5rem;
  position: absolute;
  top: 0;
  z-index: 99999999;
  width: 100%;
  background: #222;
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
      <Header>
        <CloseButton onClick={handleClose}>×</CloseButton>
      </Header>
      <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
    </Overlay>
  );
}
