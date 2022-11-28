import styled from '@emotion/styled';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  handleClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function ModalWrapper({ children, handleClose }: ModalProps) {
  return (
    <ModalContainer>
      <CloseButton onClick={handleClose}>{`x`}</CloseButton>
      {children}
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: relative;
  padding: 2rem 1rem;
  background: #f5f5f5;
  border-radius: 0.25rem;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.02);
  min-width: 20rem;
  overflow: hidden;
`;

const CloseButton = styled.button`
  outline: none;
  border: none;
  background: none;
  font: inherit;

  position: absolute;
  padding: 0.5rem 1rem;
  top: 0;
  right: 0;
  cursor: pointer;

  :hover {
    color: #555555;
  }
`;

export default ModalWrapper;
