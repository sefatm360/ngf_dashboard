import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/sellerReducer';

const SellerContext = React.createContext();
const initialState = {
  sellers: {},
  approvedSeller: {},
  pendingSeller: {},
  rejectedSeller: {},
};

const SellerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SellerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SellerContext.Provider>
  );
};

export const useSellerContext = () => {
  return useContext(SellerContext);
};

export default SellerContextProvider;
