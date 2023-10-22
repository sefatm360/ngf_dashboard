import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Content from '../../../pages/categoryPage/Content';

const ContentRouterHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Content />} />
      </Routes>
    </>
  );
};

export default ContentRouterHelper;
