import {
  FETCH_SOCIAL_USERS_SUCCESS,
  FETCH_PENDING_SOCIAL_USERS,
  FETCH_APPROVED_SOCIAL_USERS,
  NEW_SOCIAL_USERS,
  SET_UPDATED_SOCIAL_USERS,
  FETCH_REJECTED_SOCIAL_USERS,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_SOCIAL_USERS_SUCCESS:
      return { ...state, socialUsers: action.payload };
    case FETCH_PENDING_SOCIAL_USERS:
      return { ...state, pendingSocialUsers: action.payload };
    case FETCH_APPROVED_SOCIAL_USERS:
      return { ...state, approvedSocialUsers: action.payload };
    case FETCH_REJECTED_SOCIAL_USERS:
      return { ...state, rejectedSocialUsers: action.payload };

    case NEW_SOCIAL_USERS:
      if (state.socialUsers.total && state.pendingSocialUsers.total) {
        const newSocialUsers = [action.payload, ...state.socialUsers.data];
        const newPendingSocialUsers = [
          action.payload,
          ...state.pendingSocialUsers.data,
        ];
        return {
          ...state,
          socialUsers: { data: newSocialUsers, total: state.queens.total + 1 },
          pendingSeller: {
            data: newPendingSocialUsers,
            total: state.pendingSocialUsers.total + 1,
          },
        };
      } else if (state.socialUsers.total) {
        const newSocialUsers = [action.payload, ...state.socialUsers.data];
        return {
          ...state,
          socialUsers: {
            data: newSocialUsers,
            total: state.socialUsers.total + 1,
          },
        };
      } else if (state.pendingSeller.total) {
        const newPendingSocialUsers = [
          action.payload,
          ...state.pendingSocialUsers.data,
        ];
        return {
          ...state,
          pendingSeller: {
            data: newPendingSocialUsers,
            total: state.pendingSocialUsers.total + 1,
          },
        };
      } else {
        return state;
      }

    case SET_UPDATED_SOCIAL_USERS:
      let updateSocialUserList;
      if (action.payload.status === 'Pending') {
        updateSocialUserList = state.pendingSocialUsers.data.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }

          return item;
        });
      } else if (action.payload.status === 'Approved') {
        updateSocialUserList = state.approvedSocialUsers.data.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }

          return item;
        });
      } else if (action.payload.status === 'Rejected') {
        updateSocialUserList = state.rejectedSocialUsers.data.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        });
      }

      return {
        ...state,
        socialUsers: updateSocialUserList,
      };
    default:
      break;
  }
};

export default reducer;
