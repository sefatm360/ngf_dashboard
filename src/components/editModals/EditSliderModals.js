import React from 'react';
import EditSlideImages from './EditSlideImages';

const EditSliderModals = ({ setUpdateSpinner, data }) => {
  const { modal, setSlideDetails, sliders, section } = data;

  if (modal === 'Edit Slider Images' || modal === 'Edit App Slider Images') {
    return (
      <EditSlideImages
        setUpdateSpinner={setUpdateSpinner}
        sliders={sliders}
        section={section}
        setSlideDetails={setSlideDetails}
      />
    );
  }
  return <div>Slider Edit Modal</div>;
};

export default EditSliderModals;
