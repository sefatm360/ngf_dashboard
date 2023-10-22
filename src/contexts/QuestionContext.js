import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/questionReducer';

const QuestionContext = React.createContext();

const initialState = {
  questionsNotAnswer: {},
  questionsAnswered: {},
  questionsDeleted: {},
};

const QuestionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QuestionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;

export const useQuestionContext = () => {
  return useContext(QuestionContext);
};
