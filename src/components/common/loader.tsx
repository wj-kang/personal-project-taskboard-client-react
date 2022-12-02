import React from 'react';
import Dimmer from './dimmer';
import styled from '@emotion/styled';
import { useAppSelector } from '../../app/hooks';

function Loader() {
  const { isLoading } = useAppSelector((state) => state.loader);
  return (
    <>
      {isLoading && (
        <Dimmer>
          <LoaderItem />
        </Dimmer>
      )}
    </>
  );
}

export default Loader;

const LoaderItem = styled.div`
  z-index: 999;
  border: 0.5rem solid #f3f3f3;
  border-radius: 50%;
  border-top: 0.5rem solid #447ff3;
  width: 4rem;
  height: 4rem;

  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
