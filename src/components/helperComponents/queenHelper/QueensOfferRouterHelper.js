import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QueensOffer from '../../../pages/categoryPage/QueensOffer';
import QueensOfferDetails from '../../../pages/detailsPage/QueensOfferDetails';
import SeeAllQueensOffer from '../../SeeAllComponent/SeeAllQueensOffer';

const QueensOfferRouterHelper = () => {
  return (
    <Routes>
      <Route path='/' element={<QueensOffer />} />
      <Route path='/all' element={<SeeAllQueensOffer />} />
      <Route path='/details/:id' element={<QueensOfferDetails />} />
    </Routes>
  );
};

export default QueensOfferRouterHelper;
