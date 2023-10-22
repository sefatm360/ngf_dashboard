import {
  BEFORE_DATE,
  FILTERED_DATE,
  FILTERED_DATE2,
  FILTERED_DATE3,
  FILTERED_LENGTH,
  TODAY_DATE,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case TODAY_DATE:
      return { ...state, todaysDate: action.payload };
    case FILTERED_DATE:
      return { ...state, filteredDate: action.payload };
    case FILTERED_DATE2:
      return { ...state, filteredDate2: action.payload };
    case FILTERED_DATE3:
      return { ...state, filteredDate3: action.payload };
    case BEFORE_DATE:
      return { ...state, beforeDate: action.payload };
    case FILTERED_LENGTH:
      return { ...state, filteredLength: action.payload };
    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
