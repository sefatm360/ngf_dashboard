import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Gigs from '../../../pages/categoryPage/Gigs';
import GigDetails from '../../../pages/detailsPage/GigDetails';
import AddSkills from '../../../pages/otherPages/AddSkills';
import SeeAllGigs from '../../SeeAllComponent/SeeAllGigs';

const GigsRouterHelper = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Gigs />} />
        <Route path='/add-skills' element={<AddSkills />} />
        <Route path='/details/:id' element={<GigDetails />} />
        <Route path='/all' element={<SeeAllGigs />} />
      </Routes>
    </div>
  );
};

export default GigsRouterHelper;
