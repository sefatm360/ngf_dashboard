import {
  CLEAR_NOTIFICATIONS,
  SET_ALL_NOTIFICATIONS,
  SET_NEW_NOTIFICATION,
  SET_UNREAD_NOTIFICATION_COUNT,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ALL_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    case SET_NEW_NOTIFICATION:
      const restNotification = state.notifications.filter(
        (item) => item.id !== action.payload.id
      );

      const nowNotifications = [action.payload, ...restNotification];

      let count = 0;
      nowNotifications.forEach((notification) => {
        if (notification.status === 'unread') {
          count++;
        }
      });

      return {
        ...state,
        notifications: nowNotifications,
        unreadNotifications: count,
      };
    case SET_UNREAD_NOTIFICATION_COUNT:
      return { ...state, unreadNotifications: action.payload };

    case CLEAR_NOTIFICATIONS:
      return { ...state, unreadNotifications: 0, notifications: [] };

    default:
      throw new Error('no matching action type');
  }
};
export default reducer;
