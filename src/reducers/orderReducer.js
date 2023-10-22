import {
  FETCH_APPROVED_ORDER,
  FETCH_DELIVERED_ORDER,
  FETCH_ORDERS_SUCCESS,
  FETCH_PENDING_ORDER,
  FETCH_REJECTED_ORDER,
  FETCH_SHIPPED_ORDER,
  NEW_ORDER,
  SET_ORDER,
  SET_UPDATED_ORDER,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.payload };
    case SET_ORDER:
      return { ...state, setOrder: action.payload };

    case NEW_ORDER:
      if (state.orders.total && state.pendingOrder.total) {
        const newOrders = [action.payload, ...state.orders.data];
        const newPendingOrder = [action.payload, ...state.pendingOrder.data];
        return {
          ...state,
          orders: { data: newOrders, total: state.orders.total + 1 },
          pendingOrder: {
            data: newPendingOrder,
            total: state.pendingOrder.total + 1,
          },
        };
      } else if (state.orders.total) {
        const newOrders = [action.payload, ...state.orders.data];
        return {
          ...state,
          orders: { data: newOrders, total: state.orders.total + 1 },
        };
      } else if (state.pendingOrder.total) {
        const newPendingOrder = [action.payload, ...state.pendingOrder.data];
        return {
          ...state,
          pendingOrder: {
            data: newPendingOrder,
            total: state.pendingOrder.total + 1,
          },
        };
      } else {
        return state;
      }
    case SET_UPDATED_ORDER:
      const upOrdList = state.orders.map((item) => {
        if (item.order_id === action.payload.order_id) {
          item = action.payload;
        }

        return item;
      });

      return {
        ...state,
        orders: upOrdList,
      };

    case FETCH_APPROVED_ORDER:
      return { ...state, approvedOrder: action.payload };
    case FETCH_PENDING_ORDER:
      return { ...state, pendingOrder: action.payload };
    case FETCH_SHIPPED_ORDER:
      return { ...state, shippedOrder: action.payload };
    case FETCH_DELIVERED_ORDER:
      return { ...state, deliveredOrder: action.payload };
    case FETCH_REJECTED_ORDER:
      return { ...state, rejectedOrder: action.payload };

    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
