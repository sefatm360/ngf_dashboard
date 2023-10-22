import {
  FETCH_APPROVED_TRAINEE,
  FETCH_PENDING_TRAINEE,
  FETCH_REJECTED_TRAINEE,
  FETCH_TRAINEE_SUCCESS,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_TRAINEE_SUCCESS:
      return { ...state, trainee: action.payload };
    case FETCH_PENDING_TRAINEE:
      return { ...state, pendingTrainee: action.payload };
    case FETCH_APPROVED_TRAINEE:
      return { ...state, approvedTrainee: action.payload };
    case FETCH_REJECTED_TRAINEE:
      return { ...state, rejectedTrainee: action.payload };

    default:
      throw Error(`Unknown ${action.type}`);
  }
};

export default reducer;
