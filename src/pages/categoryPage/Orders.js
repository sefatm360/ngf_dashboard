import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cards from '../../components/Cards';
import OrderLists from '../../components/listsComponents/OrderLists';
import { useOrderContext } from '../../contexts/orderContext';
import {
  FETCH_APPROVED_ORDER,
  FETCH_DELIVERED_ORDER,
  FETCH_PENDING_ORDER,
  FETCH_REJECTED_ORDER,
  FETCH_SHIPPED_ORDER,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const limit = 5;

const Orders = () => {
  const { pathname } = useLocation();

  const {
    approvedOrder,
    pendingOrder,
    shippedOrder,
    deliveredOrder,
    rejectedOrder,
    dispatch: ordersDispatch,
  } = useOrderContext();

  const [fetching, setFetching] = useState(false);

  const urls = [
    {
      url: `/api/orders/get/all/approved/?limit=${limit}&skip=0`,
      dispatch: ordersDispatch,
      action: FETCH_APPROVED_ORDER,
      data: approvedOrder,
    },
    {
      url: `/api/orders/get/all/pending/?limit=${limit}&skip=0`,
      dispatch: ordersDispatch,
      action: FETCH_PENDING_ORDER,
      data: pendingOrder,
    },
    {
      url: `/api/orders/get/all/rejected/?limit=${limit}&skip=0`,
      dispatch: ordersDispatch,
      action: FETCH_REJECTED_ORDER,
      data: rejectedOrder,
    },
    {
      url: `/api/orders/get/all/shipped/?limit=${limit}&skip=0`,
      dispatch: ordersDispatch,
      action: FETCH_SHIPPED_ORDER,
      data: shippedOrder,
    },
    {
      url: `/api/orders/get/all/delivered/?limit=${limit}&skip=0`,
      dispatch: ordersDispatch,
      action: FETCH_DELIVERED_ORDER,
      data: deliveredOrder,
    },
  ];

  useEffect(() => {
    urls.forEach((item) => {
      (async function () {
        const { data, url, action, dispatch } = item;
        if (!data.total) {
          setFetching(true);
          const { data } = await fetcher.get({
            url: url,
          });
          dispatch({ type: action, payload: data });
          setFetching(false);
        }
      })();
    });
  }, []);

  const cards = [
    {
      id: 1,
      length: pendingOrder.total,
      field: 'Pending Orders',
      path: '/orders/all?type=pending',
    },
    {
      id: 2,
      length: approvedOrder.total,
      field: 'Approved Orders',
      path: '/orders/all?type=approved',
    },
    {
      id: 3,
      length: shippedOrder.total,
      field: 'Shipped Orders',
      path: '/orders/all?type=shipped',
    },
    {
      id: 4,
      length: deliveredOrder.total,
      field: 'Delivered Orders',
      path: '/orders/all?type=delivered',
    },
    {
      id: 5,
      length: rejectedOrder.total,
      field: 'Rejected Orders',
      path: '/orders/all?type=rejected',
    },
  ];

  const lists = [
    { data: pendingOrder, title: 'Pending', path: 'all?type=pending' },
    { data: approvedOrder, title: 'Approved', path: 'all?type=approved' },
    { data: shippedOrder, title: 'Shipped', path: 'all?type=shipped' },
    { data: deliveredOrder, title: 'Delivered', path: 'all?type=delivered' },
    { data: rejectedOrder, title: 'Rejected', path: 'all?type=rejected' },
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
            <Link className='button' to='/orders/all'>
              All Orders
            </Link>
          </div>
          <div className='cards orderpage'>
            <Cards cards={cards} fetching={fetching} />
          </div>
          {lists.map((item) => {
            return (
              <OrderLists
                fetching={fetching}
                data={item.data.data}
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

export default Orders;
