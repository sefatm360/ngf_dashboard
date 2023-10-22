import React from 'react';
import { Route, Routes } from 'react-router';
import Orders from '../../../pages/categoryPage/Orders';
import OrderDetails from '../../../pages/detailsPage/OrderDetails';
import SeeAllOrders from '../../SeeAllComponent/SeeAllOrders';
import SeeAllSingleQueenOrder from '../../SeeAllComponent/SeeAllSingleQueenOrder';

const OrderRouterHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Orders />} />
        <Route path='/details/:id' element={<OrderDetails />} />
        <Route path='/all' element={<SeeAllOrders />} />
      </Routes>
    </>
  );
};

export default OrderRouterHelper;
