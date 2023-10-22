import { FETCH_BLOGS } from '../helpers/constants';

const blogReducer = (state, action) => {
  switch (action.type) {
    case FETCH_BLOGS:
      return { ...state, [action.dataType]: action.payload };
    default:
      break;
  }
};
export default blogReducer;
