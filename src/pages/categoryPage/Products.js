import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Cards from '../../components/Cards';
import ProductLists from '../../components/listsComponents/ProductLists';
import { useProductContext } from '../../contexts/productsContext';
import {
  FETCH_APPROVED_PRODUCT,
  FETCH_DISABLED_PRODUCT,
  FETCH_PENDING_PRODUCT,
  FETCH_PRODUCT_UPDATE_REQUEST,
  FETCH_REJECTED_PRODUCT,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const limit = 5;
const Products = () => {
  const { pathname } = useLocation();

  const {
    approvedProducts,
    pendingProducts,
    rejectedProducts,
    disabledProducts,
    pendingUpdates,
    dispatch: productsDispatch,
  } = useProductContext();

  const [fetching, setFetching] = useState(false);

  const urls = [
    {
      url: `/api/admin/product/get/all/approved/?limit=${limit}&skip=0`,
      data: approvedProducts,
      dispatch: productsDispatch,
      action: FETCH_APPROVED_PRODUCT,
    },
    {
      url: `/api/admin/product/get/all/pending/?limit=${limit}&skip=0`,
      data: pendingProducts,
      dispatch: productsDispatch,
      action: FETCH_PENDING_PRODUCT,
    },
    {
      url: `/api/admin/product/get/all/rejected/?limit=${limit}&skip=0`,
      data: rejectedProducts,
      dispatch: productsDispatch,
      action: FETCH_REJECTED_PRODUCT,
    },
    {
      url: `/api/admin/product/get/all/disabled/?limit=${limit}&skip=0`,
      data: disabledProducts,
      dispatch: productsDispatch,
      action: FETCH_DISABLED_PRODUCT,
    },
    {
      url: `/api/admin/product/get/all/update/pending/products`,
      dispatch: productsDispatch,
      data: pendingUpdates,
      action: FETCH_PRODUCT_UPDATE_REQUEST,
    },
  ];

  useEffect(() => {
    urls.forEach((item) => {
      (async function () {
        const { data, url, dispatch, action } = item;
        if (!data.total) {
          setFetching(true);
          const { data } = await fetcher.get({
            url: url,
          });
          if (data.success) {
            dispatch({
              type: action,
              payload: { data: data.data, total: data.total },
            });
          }
          setFetching(false);
        }
      })();
    });
  }, []);

  const cards = [
    {
      id: 1,
      length: pendingProducts.total,
      field: 'Pending Products',
      path: '/products/all?type=pending',
    },
    {
      id: 2,
      length: approvedProducts.total,
      field: 'Approved Products',
      path: '/products/all?type=approved',
    },
    {
      id: 3,
      length: rejectedProducts.total,
      field: 'Rejected Products',
      path: '/products/all?type=rejected',
    },

    {
      id: 4,
      length: disabledProducts.total,
      field: 'Disabled Products',
      path: '/products/all?type=disabled',
    },
  ];

  const lists = [
    {
      data: pendingProducts,
      title: 'Pending',
      path: 'all?type=pending',
    },
    { data: approvedProducts, title: 'Approved', path: 'all?type=approved' },
    { data: rejectedProducts, title: 'Rejected', path: 'all?type=rejected' },
    { data: disabledProducts, title: 'Disabled', path: 'all?type=disabled' },
  ];
  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div className='link-container'>
            <p className='dis-link'>{pathname}</p>
          </div>
          <div>
            <h1 className='page-header-title'>Products Page</h1>
          </div>
          <div className='cards orderpage'>
            <Cards cards={cards} fetching={fetching} />
            <div className='card-header'>
              <Link to='products-update-request'>
                <button className='view-button'>
                  {pendingUpdates.total} Update Request
                </button>
              </Link>
            </div>
            <div className='card-header'>
              <Link to='/products/all'>
                <button className='view-button'>See All Products</button>
              </Link>
            </div>
          </div>
          {lists.map((item) => {
            return (
              <ProductLists
                fetching={fetching}
                data={item.data.data}
                title={item.title}
                path={item.path}
                key={item.title}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default Products;
