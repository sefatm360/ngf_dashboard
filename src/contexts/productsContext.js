import React, { useContext, useEffect, useReducer } from 'react';
import { io } from 'socket.io-client';
import {
  NEW_PRODUCT,
  NEW_UPDATE_PRODUCT,
  socket_url,
} from '../helpers/constants';
import reducer from '../reducers/productReducer';
const ProductContext = React.createContext();

const initialState = {
  products: {},
  approvedProducts: {},
  pendingProducts: {},
  rejectedProducts: {},
  disabledProducts: {},
  pendingUpdates: { total: 0, data: [] },
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const socket = io(socket_url, {
      path: '/api/socket',
      withCredentials: true,
    });

    socket.on('new_product', (data) => {
      dispatch({ type: NEW_PRODUCT, payload: data });
    });

    socket.on('new_update_product_request', (data) => {
      dispatch({ type: NEW_UPDATE_PRODUCT, payload: data.data });
    });
  }, []);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};

export default ProductContextProvider;
