import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/queenOfferReducer';

const QueensOfferContext = React.createContext();

const initialState = {
  queensOffer: {},
  activeQueensOffer: {},
  expiredQueensOffer: {},
  deletedQueensOffer: {},
};

const QueensOfferContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QueensOfferContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QueensOfferContext.Provider>
  );
};

export const useQueensOfferContext = () => {
  return useContext(QueensOfferContext);
};

export default QueensOfferContextProvider;
