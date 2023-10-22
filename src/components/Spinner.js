import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

const Spinner = ({ size }) => {
  return (
    <div className='spinner'>
      <BeatLoader color={'#CA205F'} loading={true} size={size || 15} />
    </div>
  );
};

export default Spinner;
