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

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 0.1rem;
  font-size: 1.5rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1000;
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
      <CloseButton onClick={handleClose}>×</CloseButton>
      <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
    </Overlay>
  );
}
