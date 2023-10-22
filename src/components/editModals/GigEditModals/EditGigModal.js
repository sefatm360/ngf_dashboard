import React from 'react';
import EditGigDetails from './EditGigDetails';
import EditGigImages from './EditGigImages';

const EditGigModal = ({ setUpdateSpinner, data }) => {
  const { gigDetails, modal, setGigDetails, slideDetails } = data;

  if (modal === 'Edit Gig Details') {
    return (
      <EditGigDetails
        setUpdateSpinner={setUpdateSpinner}
        gigDetails={gigDetails}
        setGigDetails={setGigDetails}
      />
    );
  } else if (modal === 'Edit Gig Images') {
    return (
      <EditGigImages
        setUpdateSpinner={setUpdateSpinner}
        gigDetails={gigDetails}
        setGigDetails={setGigDetails}
      />
    );
  } else if (modal === 'Edit slide Images') {
    return (
      <EditGigImages
        setUpdateSpinner={setUpdateSpinner}
        slideDetails={slideDetails}
      />
    );
  }
  return <div>Gig Edit Modal</div>;
};

export default EditGigModal;
