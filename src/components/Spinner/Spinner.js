import React from 'react';
import Loader from 'react-loader-spinner';

export function Spinner() {
  return (
    <>
      <Loader type="ThreeDots" color="#303f9f" height={50} width={50} />
    </>
  );
}
