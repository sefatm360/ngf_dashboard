import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Questions from '../../../pages/categoryPage/Questions';
import SeeAllQuestions from '../../SeeAllComponent/SeeAllQuestions';

const QuestionsRouterHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Questions />} />
        <Route path='/all' element={<SeeAllQuestions />} />
      </Routes>
    </>
  );
};

export default QuestionsRouterHelper;
