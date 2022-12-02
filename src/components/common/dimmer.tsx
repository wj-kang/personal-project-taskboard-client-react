import styled from '@emotion/styled';
import React from 'react';

interface DimmerProps {
  children: React.ReactNode;
  handleClose: () => void;
}
function Dimmer({ children, handleClose }: DimmerProps) {
  function handleClickBackground(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // prevent excution from event bubbling
    if (e.currentTarget === e.target) {
      handleClose();
    }
  }

  return <Background onMouseDown={handleClickBackground}>{children}</Background>;
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Dimmer;
