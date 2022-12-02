import styled from '@emotion/styled';
import React from 'react';
import IconClose from '../icons/icon-close';

interface ModalProps {
  children: React.ReactNode;
  handleClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function ModalWrapper({ children, handleClose }: ModalProps) {
  return (
    <ModalContainer>
      <ButtonContainer onClick={handleClose}>
        <IconClose />
      </ButtonContainer>
      {children}
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: relative;
  padding: 1.5rem 1rem;
  background: #f5f5f5;
  border-radius: 0.25rem;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.02);
  min-width: 20rem;
  overflow: hidden;
`;

const ButtonContainer = styled.button`
  width: 3rem;
  outline: none;
  border: none;
  background: none;
  font: inherit;

  position: absolute;
  padding: 0.5rem;
  top: 0;
  right: 0;
  cursor: pointer;

  :hover {
    color: #555555;
  }
`;

export default ModalWrapper;
