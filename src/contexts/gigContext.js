import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/gigReducer';

const GigContext = React.createContext();

const initialState = {
  gigs: {},
  pendingGigs: {},
  approvedGigs: {},
  rejectedGigs: {},
};

const GigContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GigContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GigContext.Provider>
  );
};

export const useGigContext = () => {
  return useContext(GigContext);
};

export default GigContextProvider;
