import {
  ADMIN_LOGOUT,
  FETCH_ADMIN_FAIL,
  FETCH_ADMIN_START,
  FETCH_ADMIN_SUCCESS,
  HAMBURGER_SHOW,
  HIDE_MODAL,
  RESET_FORM_DATA,
  SHOW_MODAL,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_ADMIN_START:
      return { ...state, adminFetching: true };

    case FETCH_ADMIN_SUCCESS:
      return { ...state, admin: action.payload, adminFetching: false };

    case FETCH_ADMIN_FAIL:
      return { ...state, error: action.payload, adminFetching: false };

    case ADMIN_LOGOUT:
      return { ...state, admin: false };

    case SHOW_MODAL:
      return {
        ...state,
        modalEditData: action.payload,
        showModal: true,
      };

    case RESET_FORM_DATA:
      return {
        ...state,
        modalEditData: {},
      };

    case HIDE_MODAL:
      return { ...state, showModal: false };
    case 'ALL_FETCHED':
      return { ...state, fetched: true };
    case HAMBURGER_SHOW:
      return { ...state, hamburger: action.payload };

    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
