import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/gigOrderReducer';

const GigOrderContext = React.createContext();
const initialState = {
  gigOrders: {},
  pendingGigOrder: {},
  approvedGigOrder: {},
  deliveredGigOrder: {},
  rejectedGigOrder: {},
  reportedGigOrder: {},
  singleGigOrders: {},
  singlePendingGigOrder: {},
  singleApprovedGigOrder: {},
  singleDeliveredGigOrder: {},
  singleRejectedGigOrder: {},
  singleReportedGigOrder: {},
};

const GigOrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GigOrderContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GigOrderContext.Provider>
  );
};

export const useGigOrderContext = () => {
  return useContext(GigOrderContext);
};

export default GigOrderContextProvider;
