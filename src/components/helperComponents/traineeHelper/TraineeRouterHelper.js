import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Trainee from '../../../pages/categoryPage/Trainee';
import TraineeDetails from '../../../pages/detailsPage/TraineeDetails';
import SeeAllTrainee from '../../SeeAllComponent/SeeAllTrainee';

const TraineeRouterHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Trainee />} />
        <Route path='/all' element={<SeeAllTrainee />} />
        <Route path='/details/:id' element={<TraineeDetails />} />
      </Routes>
    </>
  );
};

export default TraineeRouterHelper;
