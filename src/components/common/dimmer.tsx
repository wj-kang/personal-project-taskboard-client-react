import styled from '@emotion/styled';
import React from 'react';

interface DimmerProps {
  children: React.ReactNode;
}
function Dimmer({ children }: DimmerProps) {
  return <Background>{children}</Background>;
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Dimmer;
