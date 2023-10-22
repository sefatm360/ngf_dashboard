import {
  FETCH_ALL_GIG_SUCCESS,
  FETCH_APPROVED_GIG_SUCCESS,
  FETCH_PENDING_GIG_SUCCESS,
  FETCH_REJECTED_GIG_SUCCESS,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_ALL_GIG_SUCCESS:
      return { ...state, gigs: action.payload };
    case FETCH_APPROVED_GIG_SUCCESS:
      return { ...state, approvedGigs: action.payload };
    case FETCH_PENDING_GIG_SUCCESS:
      return { ...state, pendingGigs: action.payload };
    case FETCH_REJECTED_GIG_SUCCESS:
      return { ...state, rejectedGigs: action.payload };
    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
