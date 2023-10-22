import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sellers from '../../../pages/categoryPage/Sellers';
import SellerDetails from '../../../pages/detailsPage/sellerDetails/SellerDetails';
import SeeAllSellers from '../../SeeAllComponent/SeeAllSellers';
import SellerDetailsHelper from './SellerDetailsHelper';

const SellerHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Sellers />} />
        <Route path='/details/:id' element={<SellerDetails />} />
        <Route path='/details/:id/*' element={<SellerDetailsHelper />} />
        <Route path='/all' element={<SeeAllSellers />} />
      </Routes>
    </>
  );
};

export default SellerHelper;
