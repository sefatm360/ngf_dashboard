import { FETCH_CUSTOMER_SUCCESS } from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_CUSTOMER_SUCCESS:
      return { ...state, customers: action.payload, test: 'test' };

    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
