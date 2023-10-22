import {
  FETCH_QUESTION_ANSWER_SUCCESS,
  FETCH_QUESTION_DELETED_SUCCESS,
  FETCH_QUESTION_NOT_ANSWER_SUCCESS,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_QUESTION_NOT_ANSWER_SUCCESS:
      return { ...state, questionsNotAnswer: action.payload };
    case FETCH_QUESTION_ANSWER_SUCCESS:
      return { ...state, questionsAnswered: action.payload };
    case FETCH_QUESTION_DELETED_SUCCESS:
      return { ...state, questionsDeleted: action.payload };
    default:
      throw new Error(`${action.type} wrong`);
  }
};

export default reducer;
