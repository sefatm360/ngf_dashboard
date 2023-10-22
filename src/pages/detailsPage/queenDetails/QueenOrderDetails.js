import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Cards from '../../../components/Cards';
import Links from '../../../components/helperComponents/linkHelper/Links';
import OrderLists from '../../../components/listsComponents/OrderLists';
import QueenOrderList from '../../../components/listsComponents/QueenOrderList';
import fetcher from '../../../helpers/fetchApi';
import lib from '../../../helpers/utils';

const QueenOrderDetails = () => {
  const { id } = useParams();
  const queen = useLocation().search;
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const query = new URLSearchParams(queen);
  const name = query.get('queen');

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/orders/get/all/queen/${id}`,
      });
      setOrders(data.data);
      setIsLoading(false);
    })();
  }, [id]);

  const { approved, pending, shipped, delivered, rejected } =
    lib.orderSeparate(orders);

  const cards = [
    {
      id: 1,
      data: pending,
      field: 'Pending Orders',
      path: `/me/orders?status=pending&&queen=${id}`,
      length: pending.length,
    },
    {
      id: 2,
      data: approved,
      field: 'Approved Orders',
      path: `/me/orders?status=approved&&queen=${id}`,
      length: approved.length,
    },
    {
      id: 3,
      data: shipped,
      field: 'Shipped Orders',
      path: `/me/orders?status=shipped&&queen=${id}`,
      length: shipped.length,
    },
    {
      id: 4,
      data: delivered,
      field: 'Delivered Orders',
      path: `/me/orders?status=delivered&&queen=${id}`,
      length: delivered.length,
    },
    {
      id: 5,
      data: rejected,
      field: 'Rejected Orders',
      path: `/me/orders?status=rejected&&queen=${id}`,
      length: rejected.length,
    },
  ];

  const lists = [
    {
      data: pending,
      title: 'Pending',
      path: `status=pending&&queen=${id}`,
    },
    {
      data: approved,
      title: 'Approved',
      path: `status=approved&&queen=${id}`,
    },
    {
      data: shipped,
      title: 'Shipped',
      path: `status=shipped&&queen=${id}`,
      length: pending.length,
    },
    {
      data: delivered,
      title: 'Delivered',
      path: `status=delivered&&queen=${id}`,
      length: pending.length,
    },
    {
      data: rejected,
      title: 'Rejected',
      path: `status=rejected&&queen=${id}`,
      length: pending.length,
    },
  ];

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <Links id={id} name={name} category='orders' />
          <h1 className='queen-title'>
            {name && `${name}'s`} <span>Orders Page</span>
          </h1>
          <div className='cards orderpage'>
            <Cards cards={cards} fetching={isLoading} />
          </div>
          {lists.map((item) => {
            return (
              <QueenOrderList
                data={item.data}
                title={item.title}
                key={item.title}
                fetching={isLoading}
                path={item.path}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default QueenOrderDetails;
