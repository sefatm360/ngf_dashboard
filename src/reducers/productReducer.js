import {
  FETCH_APPROVED_PRODUCT,
  FETCH_DISABLED_PRODUCT,
  FETCH_PENDING_PRODUCT,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_UPDATE_REQUEST,
  FETCH_REJECTED_PRODUCT,
  NEW_PRODUCT,
  NEW_UPDATE_PRODUCT,
  SET_PRODUCT,
  SET_UPDATED_PRODUCT,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };

    case SET_PRODUCT:
      return {
        ...state,
        setProduct: action.payload,
      };
    case FETCH_PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        pendingUpdates: action.payload,
      };

    case NEW_PRODUCT:
      if (state.products.total && state.pendingProducts.total) {
        const newPendingProducts = [
          action.payload,
          ...state.pendingProducts.data,
        ];
        const newProducts = [action.payload, ...state.products.data];
        return {
          ...state,
          products: { data: newProducts, total: state.products.total + 1 },
          pendingProducts: {
            data: newPendingProducts,
            total: state.pendingProducts.total + 1,
          },
        };
      } else if (state.products.total) {
        const newProducts = [action.payload, ...state.products.data];
        return {
          ...state,
          products: { data: newProducts, total: state.products.total + 1 },
        };
      } else if (state.pendingProducts.total) {
        const newPendingProducts = [
          action.payload,
          ...state.pendingProducts.data,
        ];
        return {
          ...state,
          pendingProducts: {
            data: newPendingProducts,
            total: state.pendingProducts.total + 1,
          },
        };
      } else {
        return state;
      }

    case NEW_UPDATE_PRODUCT:
      let found = state.pendingUpdates.data.find(
        (item) => Number(item.product_id) === Number(action.payload.product_id)
      );

      if (found) {
        const newUpdate = state.pendingUpdates.data.map((item) => {
          if (Number(item.product_id) === Number(action.payload.product_id)) {
            return action.payload;
          } else {
            return item;
          }
        });

        return {
          ...state,
          pendingUpdates: { ...state.pendingUpdates, data: newUpdate },
        };
      } else {
        return {
          ...state,
          pendingUpdates: {
            ...state.pendingUpdates,
            data: [...state.pendingUpdates.data, action.payload],
            total: state.pendingUpdates.total + 1,
          },
        };
      }

    case SET_UPDATED_PRODUCT:
      const upProList = state.products.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return item;
      });

      return {
        ...state,
        products: upProList,
      };

    case FETCH_APPROVED_PRODUCT:
      return { ...state, approvedProducts: action.payload };
    case FETCH_PENDING_PRODUCT:
      return { ...state, pendingProducts: action.payload };
    case FETCH_REJECTED_PRODUCT:
      return { ...state, rejectedProducts: action.payload };
    case FETCH_DISABLED_PRODUCT:
      return { ...state, disabledProducts: action.payload };

    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
