import {
  FETCH_APPROVED_SELLER,
  FETCH_PENDING_SELLER,
  FETCH_SELLERS_SUCCESS,
  FETCH_REJECTED_SELLER,
  NEW_SELLER,
  SET_UPDATED_SELLER,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_SELLERS_SUCCESS:
      return { ...state, queens: action.payload };
    case FETCH_PENDING_SELLER:
      return { ...state, pendingSeller: action.payload };
    case FETCH_APPROVED_SELLER:
      return { ...state, approvedSeller: action.payload };
    case FETCH_REJECTED_SELLER:
      return { ...state, rejectedSeller: action.payload };

    case NEW_SELLER:
      if (state.queens.total && state.pendingSeller.total) {
        const newSellers = [action.payload, ...state.queens.data];
        const newPendingSellers = [action.payload, ...state.pendingSeller.data];
        return {
          ...state,
          queens: { data: newSellers, total: state.queens.total + 1 },
          pendingSeller: {
            data: newPendingSellers,
            total: state.pendingSeller.total + 1,
          },
        };
      } else if (state.queens.total) {
        const newSellers = [action.payload, ...state.queens.data];
        return {
          ...state,
          queens: { data: newSellers, total: state.queens.total + 1 },
        };
      } else if (state.pendingSeller.total) {
        const newPendingSellers = [action.payload, ...state.pendingSeller.data];
        return {
          ...state,
          pendingSeller: {
            data: newPendingSellers,
            total: state.pendingSeller.total + 1,
          },
        };
      } else {
        return state;
      }

    case SET_UPDATED_SELLER:
      let upQueList;
      if (action.payload.status === 'Pending') {
        upQueList = state.pendingSeller.data.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }

          return item;
        });
      } else if (action.payload.status === 'Approved') {
        upQueList = state.approvedSeller.data.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }

          return item;
        });
      } else if (action.payload.status === 'Rejected') {
        upQueList = state.rejectedSeller.data.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        });
      }

      return {
        ...state,
        queens: upQueList,
      };
    default:
      break;
  }
};

export default reducer;
