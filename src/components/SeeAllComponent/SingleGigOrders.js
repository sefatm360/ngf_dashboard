import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Cards from '../Cards';
import GigOrderList from '../listsComponents/GigOrderList';
import { useGigOrderContext } from '../../contexts/gigOrderContext';
import {
  GET_APPROVED_GIG_ORDERS,
  GET_DELIVERED_GIG_ORDERS,
  GET_PENDING_GIG_ORDERS,
  GET_REJECTED_GIG_ORDERS,
  GET_REPORTED_GIG_ORDERS,
  GET_SINGLE_APPROVED_GIG_ORDERS,
  GET_SINGLE_DELIVERED_GIG_ORDERS,
  GET_SINGLE_PENDING_GIG_ORDERS,
  GET_SINGLE_REJECTED_GIG_ORDERS,
  GET_SINGLE_REPORTED_GIG_ORDERS,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const limit = 5;
const SeeAllSellerGigOrders = () => {
  const { id } = useParams();

  const { pathname } = useLocation();

  const {
    pendingGigOrder,
    approvedGigOrder,
    deliveredGigOrder,
    rejectedGigOrder,
    reportedGigOrder,
    singlePendingGigOrder,
    singleApprovedGigOrder,
    singleDeliveredGigOrder,
    singleRejectedGigOrder,
    singleReportedGigOrder,
    dispatch: gigOrderDispatch,
  } = useGigOrderContext();

  console.log({ singleApprovedGigOrder });

  const [isLoading, setIsLoading] = useState(false);

  const urls = [
    {
      url: `/out/api/gig-order/get/all/by/seller/and/status/${id}/Approved?limit=${limit}&skip=0`,
      dispatch: gigOrderDispatch,
      action: GET_SINGLE_APPROVED_GIG_ORDERS,
      data: singleApprovedGigOrder,
    },
    {
      url: `/out/api/gig-order/get/all/by/seller/and/status/${id}/Pending?limit=${limit}&skip=0`,
      dispatch: gigOrderDispatch,
      action: GET_SINGLE_PENDING_GIG_ORDERS,
      data: singlePendingGigOrder,
    },
    {
      url: `/out/api/gig-order/get/all/by/seller/and/status/${id}/Rejected?limit=${limit}&skip=0`,
      dispatch: gigOrderDispatch,
      action: GET_SINGLE_REJECTED_GIG_ORDERS,
      data: singleRejectedGigOrder,
    },
    {
      url: `/out/api/gig-order/get/all/by/seller/and/status/${id}/Reported?limit=${limit}&skip=0`,
      dispatch: gigOrderDispatch,
      action: GET_SINGLE_REPORTED_GIG_ORDERS,
      data: singleReportedGigOrder,
    },
    {
      url: `/out/api/gig-order/get/all/by/seller/and/status/${id}/Delivered?limit=${limit}&skip=0`,
      dispatch: gigOrderDispatch,
      action: GET_SINGLE_DELIVERED_GIG_ORDERS,
      data: singleDeliveredGigOrder,
    },
  ];

  useEffect(() => {
    urls.forEach((item) => {
      const { data, url, action, dispatch } = item;
      (async () => {
        if (!data.total) {
          setIsLoading(true);
          const { data } = await fetcher.get({ url: url });
          console.log(data);
          dispatch({
            type: action,
            payload: { data: data.data, total: data.total },
          });
          setIsLoading(false);
        }
      })();
    });
  }, []);

  const cards = [
    {
      id: 1,
      length: singlePendingGigOrder.total,
      field: 'Pending Gig Orders',
      path: `/sellers/details/${id}/gig-orders/all?type=pending`,
    },
    {
      id: 2,
      length: singleApprovedGigOrder.total,
      field: 'Approved Gig Orders',
      path: `/sellers/details/${id}/gig-orders/all?type=approved`,
    },
    {
      id: 3,
      length: singleDeliveredGigOrder.total,
      field: 'Deliveried Gig Orders',
      path: `/sellers/details/${id}/gig-orders/all?type=delivered`,
    },
    {
      id: 4,
      length: singleRejectedGigOrder.total,
      field: 'Rejected Gig Orders',
      path: `/sellers/details/${id}/gig-orders/all?type=rejected`,
    },
    {
      id: 5,
      length: singleReportedGigOrder.total,
      field: 'Reported Gig Orders',
      path: `/sellers/details/${id}/gig-orders/all?type=reported`,
    },
  ];

  const lists = [
    { data: singlePendingGigOrder, title: 'Pending', path: 'all?type=pending' },
    {
      data: singleApprovedGigOrder,
      title: 'Approved',
      path: 'all?type=approved',
    },
    {
      data: singleDeliveredGigOrder,
      title: 'Delivered',
      path: 'all?type=delivered',
    },
    {
      data: singleRejectedGigOrder,
      title: 'Rejected',
      path: 'all?type=rejected',
    },
    {
      data: singleReportedGigOrder,
      title: 'Reported',
      path: 'all?type=reported',
    },
  ];

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div className='link-container'>
            <p className='dis-link'>{pathname}</p>
          </div>
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className='page-header-title'>Gig Orders Page</h1>
            <Link className='button' to='/gig-orders/all'>
              All Gig Orders
            </Link>
          </div> */}
          <div className='cards orderpage'>
            <Cards cards={cards} fetching={isLoading} />
          </div>
          {lists.map((item) => {
            return (
              <GigOrderList
                fetching={isLoading}
                data={item.data}
                title={item.title}
                key={item.title}
                path={item.path}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default SeeAllSellerGigOrders;
