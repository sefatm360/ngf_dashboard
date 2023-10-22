import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Funds from '../../../pages/categoryPage/Funds';
import FundDetails from '../../../pages/detailsPage/FundDetails';
import SeeAllFunds from '../../SeeAllComponent/SeeAllFunds';

const FundRouterHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Funds />} />
        <Route path='/details/:id' element={<FundDetails />} />
        <Route path='/:type' element={<SeeAllFunds />} />
      </Routes>
    </>
  );
};

export default FundRouterHelper;
