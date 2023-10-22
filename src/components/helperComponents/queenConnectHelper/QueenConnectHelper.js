import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QueenConnect from '../../../pages/categoryPage/QueenConnect';
import QueenConnectUserDetails from '../../../pages/detailsPage/queenConnect/QueenConnectUserDetails';
import SeeAllSocialUsers from '../../SeeAllComponent/SeeAllSocialUsers';

const QueenConnectHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<QueenConnect />} />
        <Route path='/all' element={<SeeAllSocialUsers />} />
        <Route path='/details/:id' element={<QueenConnectUserDetails />} />
      </Routes>
    </>
  );
};

export default QueenConnectHelper;
