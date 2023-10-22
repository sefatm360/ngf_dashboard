import React, { useContext, useEffect, useReducer, useState } from 'react';
import { io } from 'socket.io-client';
import { NEW_OFFER, url } from '../helpers/constants';
import reducer from '../reducers/offerReducer';

const OfferContext = React.createContext();

const initialState = {
  offers: [],
  setOffer: undefined,
};

const OfferContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [forceRender] = useState({});

  useEffect(() => {
    const socket = io(url, {
      withCredentials: true,
    });

    socket.on('new_offer', (data) => {
      dispatch({ type: NEW_OFFER, payload: data });

      forceRender({});
    });
  }, []);

  return (
    <OfferContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OfferContext.Provider>
  );
};

export const useOfferContext = () => {
  return useContext(OfferContext);
};

export default OfferContextProvider;
