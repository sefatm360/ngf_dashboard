import {
  SET_ALL_MESSAGES,
  SET_NEW_MESSAGE,
  SET_UNREAD_COUNT,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ALL_MESSAGES:
      return { ...state, messages: action.payload };
    case SET_NEW_MESSAGE:
      const nowmsgs = [action.payload, ...state.messages];
      return {
        ...state,
        messages: nowmsgs,
        unreadCount: state.unreadCount + 1,
      };
    case SET_UNREAD_COUNT:
      return { ...state, unreadCount: action.payload };
    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
