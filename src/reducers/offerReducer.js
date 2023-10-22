import {
  FETCH_OFFERS_SUCCESS,
  NEW_OFFER,
  SET_OFFER,
  SET_UPDATED_OFFER,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_OFFERS_SUCCESS:
      return { ...state, offers: action.payload };

    case SET_OFFER:
      return {
        ...state,
        setOffer: action.payload,
      };

    case NEW_OFFER:
      // forceRender is rendering the context twice
      // which is causing the dispatch to call twice
      // check here if the offers has alrady been pushed to the offers array
      const isExists = state.offers.find(
        (item) => item.id === action.payload.id
      );
      !isExists && state.offers.push(action.payload);
      return state;

    case SET_UPDATED_OFFER:
      const upOffList = state.offers.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return item;
      });

      return {
        ...state,
        offers: upOffList,
      };

    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
