import React from 'react';
import { Route, Routes } from 'react-router';
import Offers from '../../../pages/categoryPage/Offers';
import OfferDetails from '../../../pages/detailsPage/OfferDetails';
import SeeAllOffers from '../../SeeAllComponent/SeeAllOffers';

const OfferRouterHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Offers />} />
        <Route path='/details/:id/*' element={<OfferDetails />} />
        <Route path='/:type' element={<SeeAllOffers />} />
      </Routes>
    </>
  );
};

export default OfferRouterHelper;
