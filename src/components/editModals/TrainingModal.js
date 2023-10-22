import React from 'react';
import AddNewCourseModal from './TrainingModalComponents/AddNewCourseModal';
import AddNewInstituteModal from './TrainingModalComponents/AddNewInstituteModal';
import AddNewTrainerModal from './TrainingModalComponents/AddNewTrainerModal';
import EditCourseModal from './TrainingModalComponents/EditCourseModal';
import EditTrainerModal from './TrainingModalComponents/EditTrainerModal';

const TrainingModal = ({ data, setUpdateSpinner }) => {
  const { modal } = data;

  if (modal === 'Add New Course') {
    return (
      <AddNewCourseModal data={data} setUpdateSpinner={setUpdateSpinner} />
    );
  } else if (modal === 'Edit Course') {
    return <EditCourseModal data={data} setUpdateSpinner={setUpdateSpinner} />;
  } else if (modal === 'Add New Trainer') {
    return (
      <AddNewTrainerModal data={data} setUpdateSpinner={setUpdateSpinner} />
    );
  } else if (modal === 'Add New Institute') {
    return (
      <AddNewInstituteModal data={data} setUpdateSpinner={setUpdateSpinner} />
    );
  } else if (modal === 'Edit Trainer Modal') {
    return <EditTrainerModal data={data} setUpdateSpinner={setUpdateSpinner} />;
  } else {
    return <p>invalid modal</p>;
  }
};

export default TrainingModal;
