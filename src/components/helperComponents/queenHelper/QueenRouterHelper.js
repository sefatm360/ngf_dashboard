import React from 'react';
import { Route, Routes } from 'react-router';
import Queens from '../../../pages/categoryPage/Queens';
import SeeAllQueens from '../../SeeAllComponent/SeeAllQueens';
import QueenDetailsRouterHelper from './QueenDetailsRouterHelper';
import QueenRefList from '../../../pages/detailsPage/queenDetails/QueenRefList';
import SeeAllSingleQueenOrder from '../../SeeAllComponent/SeeAllSingleQueenOrder';

const QueenRouterHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Queens />} />
        <Route path='/details/:id/*' element={<QueenDetailsRouterHelper />} />
        <Route path='/all' element={<SeeAllQueens />} />
        <Route path='/refs/me/:id' element={<QueenRefList />} />
        <Route path='/orders' element={<SeeAllSingleQueenOrder />} />
      </Routes>
    </>
  );
};

export default QueenRouterHelper;
