import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SellerGigDetails from '../../../pages/detailsPage/sellerDetails/SellerGigDetails';
import SeeAllGigOrdrers from '../../SeeAllComponent/SeeAllGigOrdrers';
import SingleGigOrders from '../../SeeAllComponent/SingleGigOrders';
import SeeAllSellerGigs from '../../SeeAllComponent/SeeAllSellerGigs';
import SeeAllSingleOrders from '../../SeeAllComponent/SeeAllSingleOrders';

const SellerDetailsHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/gigs' element={<SellerGigDetails />} />

        {/* <Route path='/products/:status' element={<SingleQueenAllProducts />} /> */}
        <Route path='/gigs/all' element={<SeeAllSellerGigs />} />
        <Route path='/gig-orders' element={<SingleGigOrders />} />
        <Route path='/gig-orders/all' element={<SeeAllSingleOrders />} />
      </Routes>
    </>
  );
};

export default SellerDetailsHelper;
