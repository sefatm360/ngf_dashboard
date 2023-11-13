import React, { useContext, useEffect, useReducer } from 'react';
import { io } from 'socket.io-client';
import { NEW_QUEEN, socket_url, url } from '../helpers/constants';
import reducer from '../reducers/queenReducer';

const QueenContext = React.createContext();
const initialState = {
  queens: {},
  approvedQueen: {},
  pendingQueen: {},
  rejectedQueen: {},
};

const QueenContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const socket = io(socket_url, {
      path: '/api/socket',
      withCredentials: true,
    });
    socket.on('new_queen', (data) => {
      dispatch({ type: NEW_QUEEN, payload: data });
    });
  }, []);

  return (
    <QueenContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QueenContext.Provider>
  );
};

export const useQueenContext = () => {
  return useContext(QueenContext);
};

export default QueenContextProvider;
