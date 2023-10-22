import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/traineeReducer';

const TraineeContext = React.createContext();

const TraineeContextProvider = ({ children }) => {
  const initialState = {
    trainee: {},
    approvedTrainee: { name: 'jobayer' },
    pendingTrainee: {},
    rejectedTrainee: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TraineeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TraineeContext.Provider>
  );
};

export default TraineeContextProvider;

export const useTraineeContext = () => {
  return useContext(TraineeContext);
};
