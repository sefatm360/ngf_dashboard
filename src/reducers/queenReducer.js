import {
  FETCH_APPROVED_QUEEN,
  FETCH_PENDING_QUEEN,
  FETCH_QUEENS_SUCCESS,
  FETCH_REJECTED_QUEEN,
  NEW_QUEEN,
  SET_UPDATED_QUEEN,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_QUEENS_SUCCESS:
      return { ...state, queens: action.payload };
    case FETCH_PENDING_QUEEN:
      return { ...state, pendingQueen: action.payload };
    case FETCH_APPROVED_QUEEN:
      return { ...state, approvedQueen: action.payload };
    case FETCH_REJECTED_QUEEN:
      return { ...state, rejectedQueen: action.payload };

    case NEW_QUEEN:
      if (state.queens.total && state.pendingQueen.total) {
        const newQueens = [action.payload, ...state.queens.data];
        const newPendingQueens = [action.payload, ...state.pendingQueen.data];
        return {
          ...state,
          queens: { data: newQueens, total: state.queens.total + 1 },
          pendingQueen: {
            data: newPendingQueens,
            total: state.pendingQueen.total + 1,
          },
        };
      } else if (state.queens.total) {
        const newQueens = [action.payload, ...state.queens.data];
        return {
          ...state,
          queens: { data: newQueens, total: state.queens.total + 1 },
        };
      } else if (state.pendingQueen.total) {
        const newPendingQueens = [action.payload, ...state.pendingQueen.data];
        return {
          ...state,
          pendingQueen: {
            data: newPendingQueens,
            total: state.pendingQueen.total + 1,
          },
        };
      } else {
        return state;
      }

    case SET_UPDATED_QUEEN:
      let upQueList;
      if (action.payload.status === 'Pending') {
        upQueList = state.pendingQueen.data.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }

          return item;
        });
      } else if (action.payload.status === 'Approved') {
        upQueList = state.approvedQueen.data.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }

          return item;
        });
      } else if (action.payload.status === 'Rejected') {
        upQueList = state.rejectedQueen.data.map((item) => {
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
