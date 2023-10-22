import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  SET_ALL_MESSAGES,
  SET_NEW_MESSAGE,
  SET_UNREAD_COUNT,
  url,
} from '../helpers/constants';
import fetcher from '../helpers/fetchApi';
import { io } from 'socket.io-client';
import reducer from '../reducers/inboxReducer';

const InboxContext = createContext();

const InboxContextPrivider = ({ children }) => {
  const initialState = {
    messages: [],
    unreadCount: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.messages.length) {
      (async () => {
        try {
          const { data } = await fetcher.get({
            url: '/api/client/get/all/contact/msg',
          });

          if (data.success) {
            dispatch({ type: SET_ALL_MESSAGES, payload: data.data });
            let count = 0;
            data.data.forEach((msg) => {
              if (msg.status === 'unread') {
                count++;
              }
            });
            dispatch({ type: SET_UNREAD_COUNT, payload: count });
          }
        } catch (err) {
          window.alert(err.messages);
        }
      })();
    }
    const socket = io(url, { withCredentials: true });
    socket.on('new_contact_msg', (data) => {
      dispatch({ type: SET_NEW_MESSAGE, payload: data });
    });
  }, []);

  return (
    <InboxContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InboxContext.Provider>
  );
};

export const useInboxContext = () => {
  return useContext(InboxContext);
};

export default InboxContextPrivider;
