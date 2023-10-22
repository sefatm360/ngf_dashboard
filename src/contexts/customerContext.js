import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/customerReducer';

const CustomerContext = React.createContext();

const initialState = {
  customers: [],
};

const CustomerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CustomerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  return useContext(CustomerContext);
};

export default CustomerContextProvider;
