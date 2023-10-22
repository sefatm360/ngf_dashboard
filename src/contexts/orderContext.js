import React, { useContext, useEffect, useReducer, useState } from 'react';
import { io } from 'socket.io-client';
import { NEW_ORDER, url } from '../helpers/constants';
import reducer from '../reducers/orderReducer';

const OrderContext = React.createContext();

const initialState = {
  orders: {},
  pendingOrder: {},
  approvedOrder: {},
  shippedOrder: {},
  deliveredOrder: {},
  rejectedOrder: {},
};

const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const socket = io(url, {
      withCredentials: true,
    });

    socket.on('new_order', (data) => {
      dispatch({ type: NEW_ORDER, payload: data.data });
    });
  }, []);

  return (
    <OrderContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};

export default OrderContextProvider;
