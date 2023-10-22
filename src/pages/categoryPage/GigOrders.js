import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cards from '../../components/Cards';
import GigOrderList from '../../components/listsComponents/GigOrderList';
import { useGigOrderContext } from '../../contexts/gigOrderContext';
import {
  GET_APPROVED_GIG_ORDERS,
  GET_DELIVERED_GIG_ORDERS,
  GET_PENDING_GIG_ORDERS,
  GET_REJECTED_GIG_ORDERS,
  GET_REPORTED_GIG_ORDERS,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const limit = 5;
const GigOrders = () => {
  const { pathname } = useLocation();

  const {
    pendingGigOrder,
    approvedGigOrder,
    deliveredGigOrder,
    rejectedGigOrder,
    reportedGigOrder,
    dispatch: gigOrderDispatch,
  } = useGigOrderContext();

  const [isLoading, setIsLoading] = useState(false);

  const urls = [
    {
      url: `/out/api/gig-order/get/all/by-status/approved/?limit=${limit}&skip=0`,
      dispatch: gigOrderDispatch,
      action: GET_APPROVED_GIG_ORDERS,
      data: approvedGigOrder,
    },
    {
      url: `/out/api/gig-order/get/all/by-status/pending/?limit=${limit}&skip=0`,
      dispatch: gigOrderDispatch,
      action: GET_PENDING_GIG_ORDERS,
      data: pendingGigOrder,
    },
    {
      url: `/out/api/gig-order/get/all/by-status/rejected/?limit=${limit}&skip=0`,
      dispatch: gigOrderDispatch,
      action: GET_REJECTED_GIG_ORDERS,
      data: rejectedGigOrder,
    },
    {
      url: `/out/api/gig-order/get/all/by-status/reported/?limit=${limit}&skip=0`,
      dispatch: gigOrderDispatch,
      action: GET_REPORTED_GIG_ORDERS,
      data: reportedGigOrder,
    },
    {
      url: `/out/api/gig-order/get/all/by-status/delivered/?limit=${limit}&skip=0`,
      dispatch: gigOrderDispatch,
      action: GET_DELIVERED_GIG_ORDERS,
      data: deliveredGigOrder,
    },
  ];

  useEffect(() => {
    urls.forEach((item) => {
      const { data, url, action, dispatch } = item;
      (async () => {
        if (!data.total) {
          setIsLoading(true);
          const { data } = await fetcher.get({ url: url });
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
      length: pendingGigOrder.total,
      field: 'Pending Gig Orders',
      path: '/gig-orders/all?type=pending',
    },
    {
      id: 2,
      length: approvedGigOrder.total,
      field: 'Approved Gig Orders',
      path: '/gig-orders/all?type=approved',
    },
    {
      id: 3,
      length: deliveredGigOrder.total,
      field: 'Delivired Gig Orders',
      path: '/gig-orders/all?type=delivered',
    },
    {
      id: 4,
      length: rejectedGigOrder.total,
      field: 'Rejected Gig Orders',
      path: '/gig-orders/all?type=rejected',
    },
    {
      id: 5,
      length: reportedGigOrder.total,
      field: 'Reported Gig Orders',
      path: '/gig-orders/all?type=reported',
    },
  ];

  const lists = [
    { data: pendingGigOrder, title: 'Pending', path: 'all?type=pending' },
    { data: approvedGigOrder, title: 'Approved', path: 'all?type=approved' },
    { data: deliveredGigOrder, title: 'Delivered', path: 'all?type=delivered' },
    { data: rejectedGigOrder, title: 'Rejected', path: 'all?type=rejected' },
    { data: reportedGigOrder, title: 'Reported', path: 'all?type=reported' },
  ];

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div className='link-container'>
            <p className='dis-link'>{pathname}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className='page-header-title'>Orders Page</h1>
            <Link className='button' to='/gig-orders/all'>
              All Gig Orders
            </Link>
          </div>
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

export default GigOrders;
