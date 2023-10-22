import {
  GET_ACTIVE_QUEENSOFFER,
  GET_ALL_QUEENSOFFER,
  GET_DELETED_QUEENSOFFER,
  GET_EXPIRED_QUEENSOFFER,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_QUEENSOFFER:
      return { ...state, queensOffer: action.payload };
    case GET_ACTIVE_QUEENSOFFER:
      return { ...state, activeQueensOffer: action.payload };
    case GET_EXPIRED_QUEENSOFFER:
      return { ...state, expiredQueensOffer: action.payload };
    case GET_DELETED_QUEENSOFFER:
      return { ...state, deletedQueensOffer: action.payload };
    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
