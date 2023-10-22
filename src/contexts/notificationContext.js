import React, { useContext, useEffect, useReducer } from 'react';
import { io } from 'socket.io-client';
import {
  SET_ALL_NOTIFICATIONS,
  SET_NEW_NOTIFICATION,
  SET_UNREAD_NOTIFICATION_COUNT,
  url,
} from '../helpers/constants';
import fetcher from '../helpers/fetchApi';
import reducer from '../reducers/notificationReducer';

const NotificationsContext = React.createContext();

const NotificationContext = ({ children }) => {
  const initialState = {
    notifications: [],
    unreadNotifications: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.notifications.length) {
      (async () => {
        try {
          const { data } = await fetcher.get({
            url: '/api/admin/notification/get/all',
          });

          if (data.success) {
            dispatch({ type: SET_ALL_NOTIFICATIONS, payload: data.data });

            let count = 0;
            data.data.forEach((notification) => {
              if (notification.status === 'unread') {
                count++;
              }
            });
            dispatch({ type: SET_UNREAD_NOTIFICATION_COUNT, payload: count });
          }
        } catch (err) {
          window.alert(err.message);
        }
      })();
    }
    const socket = io(url, { withCredentials: true });
    socket.on('new_notification', (data) => {
      dispatch({ type: SET_NEW_NOTIFICATION, payload: data });
    });
  }, []);

  return (
    <NotificationsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationContext = () => {
  return useContext(NotificationsContext);
};

export default NotificationContext;
