import React from 'react';
import { Route, Routes } from 'react-router';
import QueenDetails from '../../../pages/detailsPage/queenDetails/QueenDetails';
import QueenOfferDetails from '../../../pages/detailsPage/queenDetails/QueenOfferDetails';
import QueenOrderDetails from '../../../pages/detailsPage/queenDetails/QueenOrderDetails';
import QueenProductDetails from '../../../pages/detailsPage/queenDetails/QueenProductDetails';
import SingleQueenAllProducts from '../../SeeAllComponent/SingleQueenAllProducts';

const QueenDetailsRouterHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<QueenDetails />} />
        <Route path='/products' element={<QueenProductDetails />} />
        <Route path='/products/:status' element={<SingleQueenAllProducts />} />
        <Route path='/orders' element={<QueenOrderDetails />} />
        <Route path='/offers' element={<QueenOfferDetails />} />
      </Routes>
    </>
  );
};

export default QueenDetailsRouterHelper;
