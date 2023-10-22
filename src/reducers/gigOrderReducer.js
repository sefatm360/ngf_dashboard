import {
  GET_APPROVED_GIG_ORDERS,
  GET_DELIVERED_GIG_ORDERS,
  GET_PENDING_GIG_ORDERS,
  GET_RECENT_GIG_ORDERS,
  GET_REJECTED_GIG_ORDERS,
  GET_REPORTED_GIG_ORDERS,
  GET_SINGLE_APPROVED_GIG_ORDERS,
  GET_SINGLE_DELIVERED_GIG_ORDERS,
  GET_SINGLE_PENDING_GIG_ORDERS,
  GET_SINGLE_REJECTED_GIG_ORDERS,
  GET_SINGLE_REPORTED_GIG_ORDERS,
} from '../helpers/constants';

const reducer = (state, action) => {
  switch (action.type) {
    case GET_RECENT_GIG_ORDERS:
      return { ...state, gigOrders: action.payload };
    case GET_PENDING_GIG_ORDERS:
      return { ...state, pendingGigOrder: action.payload };
    case GET_APPROVED_GIG_ORDERS:
      return { ...state, approvedGigOrder: action.payload };
    case GET_DELIVERED_GIG_ORDERS:
      return { ...state, deliveredGigOrder: action.payload };
    case GET_REJECTED_GIG_ORDERS:
      return { ...state, rejectedGigOrder: action.payload };
    case GET_REPORTED_GIG_ORDERS:
      return { ...state, reportedGigOrder: action.payload };
    // single gig orders
    case GET_SINGLE_PENDING_GIG_ORDERS:
      return { ...state, singlePendingGigOrder: action.payload };
    case GET_SINGLE_APPROVED_GIG_ORDERS:
      return { ...state, singleApprovedGigOrder: action.payload };
    case GET_SINGLE_DELIVERED_GIG_ORDERS:
      return { ...state, singleDeliveredGigOrder: action.payload };
    case GET_SINGLE_REJECTED_GIG_ORDERS:
      return { ...state, singleRejectedGigOrder: action.payload };
    case GET_SINGLE_REPORTED_GIG_ORDERS:
      return { ...state, singleReportedGigOrder: action.payload };
    default:
      throw new Error(`No matching action type - ${action.type}`);
  }
};

export default reducer;
