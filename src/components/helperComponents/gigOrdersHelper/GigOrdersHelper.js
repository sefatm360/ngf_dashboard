import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GigOrders from '../../../pages/categoryPage/GigOrders';
import GigOrderDetails from '../../../pages/detailsPage/GigOrderDetails';
import SeeAllGigOrdrers from '../../SeeAllComponent/SeeAllGigOrdrers';

const GigOrdersHelper = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<GigOrders />} />
        <Route path='/all' element={<SeeAllGigOrdrers />} />
        <Route path='/details/:id' element={<GigOrderDetails />} />
      </Routes>
    </div>
  );
};

export default GigOrdersHelper;
