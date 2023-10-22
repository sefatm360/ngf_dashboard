import { SET_INITIAL_STATE, SET_SINGLE_VALUE } from '../editModalConstants';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return action.payload;

    case SET_SINGLE_VALUE:
      return { ...state, [action.payload.field]: action.payload.value };

    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
