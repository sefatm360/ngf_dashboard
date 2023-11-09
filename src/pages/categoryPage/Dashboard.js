import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { useAdminContext } from '../../contexts/adminContext';
import { useCustomerContext } from '../../contexts/customerContext';
import { useGigContext } from '../../contexts/gigContext';
import { useGigOrderContext } from '../../contexts/gigOrderContext';
// import { useOfferContext } from '../../contexts/offerContext';
import { useOrderContext } from '../../contexts/orderContext';
import { useProductContext } from '../../contexts/productsContext';
import { useQueenContext } from '../../contexts/queenContext';
import { useSocketContext } from '../../contexts/socketContext';
import {
  FETCH_ALL_GIG_SUCCESS,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_ORDERS_SUCCESS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_QUEENS_SUCCESS,
  GET_RECENT_GIG_ORDERS,
  url,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
const limit = 10;

const Dashboard = () => {
  const { customers, dispatch: customerDispatch } = useCustomerContext();
  const { products, dispatch: productsDispatch } = useProductContext();
  const { orders, dispatch: ordersDispatch } = useOrderContext();
  const { queens, dispatch: queensDispatch } = useQueenContext();
  const { gigs, dispatch: gigsDispatch } = useGigContext();
  const { gigOrders, dispatch: gigOrdersDispatch } = useGigOrderContext();
  // const { offers, dispatch: offersDispatch } = useOfferContext();
  const { socketIo } = useSocketContext();
  const { fetched, dispatch: adminDispatch } = useAdminContext();
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  const cards = [
    { id: 1, length: customers.total, field: 'Customers', path: '/customers' },
    { id: 2, length: products.total, field: 'Products', path: '/products' },
    { id: 3, length: orders.total, field: 'Orders', path: '/orders' },
    // { id: 4, length: gigs.total, field: 'Gigs', path: '/gigs' },
    // {
    //   id: 5,
    //   length: gigOrders.total,
    //   field: 'Gig Orders',
    //   path: '/gig-orders',
    // },
    // { id: 4, data: offers, field: 'Offers', path: 'offers' },
    { id: 6, length: queens.total, field: "ME's", path: 'queens' },
  ];

  const urls = [
    {
      url: `/api/customer/get/all?limit=${limit}&skip=0`,
      dispatch: customerDispatch,
      action: FETCH_CUSTOMER_SUCCESS,
    },
    {
      url: `/api/admin/product/get/all/?limit=${limit}&skip=0`,
      dispatch: productsDispatch,
      action: FETCH_PRODUCTS_SUCCESS,
    },
    {
      url: `/api/orders/get/all/?limit=${limit}&skip=0`,
      dispatch: ordersDispatch,
      action: FETCH_ORDERS_SUCCESS,
    },
    {
      url: `/out/api/admin/gig/get/all?limit=${limit}&skip=0`,
      dispatch: gigsDispatch,
      action: FETCH_ALL_GIG_SUCCESS,
    },
    {
      url: `/out/api/gig-order/get/all?limit=${limit}&skip=0`,
      dispatch: gigOrdersDispatch,
      action: GET_RECENT_GIG_ORDERS,
    },
    {
      url: `/api/admin/queen/get/all?limit=${limit}&skip=0`,
      dispatch: queensDispatch,
      action: FETCH_QUEENS_SUCCESS,
    },

    {
      last: true,
    },
  ];

  const callBack = () => {
    urls.forEach(async (item) => {
      const { url, dispatch, action } = item;
      if (item.last === true) return adminDispatch({ type: 'ALL_FETCHED' });

      if (!fetched) {
        // call this fuction in every iteration
        setFetching(true);
        try {
          const { data } = await fetcher.get({
            url: url,
          });

          dispatch({ type: action, payload: data });

          setFetching(false);
        } catch (err) {
          setFetching(false);
        }
      } else {
        setFetching(false);
        return;
      }
    });
  };

  const looper = useCallback(callBack, []);

  useEffect(() => {
    looper();
  }, [looper]);

  return (
    <div className='content'>
      <main>
        <div className='cards'>
          <Cards cards={cards} fetching={fetching} />
        </div>

        <div className='recent-grid'>
          <div className='projects div-border'>
            <div
              style={{
                height: '100%',
              }}
              className='card'
            >
              <div className='card-header'>
                <h3>Recently added ME's</h3>
                <button className='seeAllBtn' onClick={() => navigate('/me')}>
                  See All
                </button>
              </div>
              <div className='card-body'>
                <div className='table-responsive'>
                  {queens.data ? (
                    <table width='100%'>
                      <thead>
                        <tr>
                          <td>Serial</td>
                          <td>Photo</td>
                          <td>ME Name</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        {queens.data.slice(0, 5).map((item, index) => {
                          const { name, status, id, photo } = item || {};
                          return (
                            <tr
                              className='tableRow pointer'
                              onClick={() => navigate(`/me/details/${id}`)}
                              key={item.id}
                            >
                              <td className='fw-bold'>{index + 1}</td>
                              <td>
                                {photo ? (
                                  <img
                                    src={`${url}/get/image/me/${photo}`}
                                    alt=''
                                    width='40px'
                                    height='40px'
                                    style={{ borderRadius: '50%' }}
                                  />
                                ) : (
                                  <img
                                    src='/assets/avatar.jpg'
                                    width='40px'
                                    height='40px'
                                    alt=''
                                    style={{ borderRadius: '50%' }}
                                  />
                                )}
                              </td>
                              <td>{name}</td>
                              <td className='statFlex'>
                                {status === 'Pending' && (
                                  <span className='status orange'></span>
                                )}
                                {status === 'Approved' && (
                                  <span className='status green'></span>
                                )}
                                {status === 'Rejected' && (
                                  <span className='status red'></span>
                                )}
                                <p>{status}</p>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='products div-border'>
            <div className='card'>
              <div className='card-header'>
                <h3>Recently added products</h3>
                <button
                  className='seeAllBtn'
                  onClick={() => navigate('/products')}
                >
                  See All
                </button>
              </div>
              <div className='card-body'>
                <div className='table-responsive'>
                  {queens.data ? (
                    <table width='100%'>
                      <thead>
                        <tr>
                          <td>Serial</td>
                          <td>Product Name</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        {products?.data?.slice(0, 5).map((item, index) => {
                          const {
                            id,
                            product_name,
                            category,
                            product_picture_1,
                            status,
                          } = item;

                          return (
                            <tr
                              className='tableRow'
                              onClick={() => navigate(`products/details/${id}`)}
                              key={item.id}
                            >
                              <td className='fw-bold'>{index + 1}</td>
                              <td>
                                {' '}
                                <div className='info'>
                                  <img
                                    src={`${url}/get/image/products/${product_picture_1}`}
                                    width='40px'
                                    height='40px'
                                    alt='Product'
                                  />
                                  <div>
                                    <h4>{product_name}</h4>
                                    <small>{category}</small>
                                  </div>
                                </div>
                              </td>

                              <td className='statFlex'>
                                {status === 'Pending' && (
                                  <span className='status orange'></span>
                                )}
                                {status === 'Approved' && (
                                  <span className='status green'></span>
                                )}
                                {status === 'Rejected' && (
                                  <span className='status red'></span>
                                )}
                                <p>{status}</p>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='products div-border'>
            <div className='card'>
              <div className='card-header'>
                <h3>Recent orders</h3>
                <button
                  className='seeAllBtn'
                  onClick={() => navigate('/orders')}
                >
                  See All
                </button>
              </div>

              <div className='card-body'>
                <div className='table-responsive'>
                  {queens.data ? (
                    <table width='100%'>
                      <thead>
                        <tr>
                          <td>Serial</td>
                          <td>Customer Name</td>
                          <td>Order Date</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        {orders?.data?.slice(0, 5).map((item, index) => {
                          const { customer_name, order_date, id, status } =
                            item;

                          return (
                            <tr
                              className='tableRow'
                              onClick={() => navigate(`orders/details/${id}`)}
                              key={item.id}
                            >
                              <td className='fw-bold'>{index + 1}</td>
                              <td>
                                <div className='info'>{customer_name}</div>
                              </td>
                              <td>
                                {' '}
                                <div className='info'>
                                  {moment(order_date).format('MMM Do YY')}
                                </div>
                              </td>

                              <td className='statFlex'>
                                {status === 'Pending' && (
                                  <span className='status orange'></span>
                                )}
                                {status === 'Approved' && (
                                  <span className='status green'></span>
                                )}
                                {status === 'Rejected' && (
                                  <span className='status red'></span>
                                )}
                                {status === 'Delivered' && (
                                  <span className='status purple'></span>
                                )}
                                <p>{status}</p>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <div className='products div-border'>
            <div className='card'>
              <div className='card-header'>
                <h3>Recently added Gigs</h3>
                <button
                  className='seeAllBtn'
                  onClick={() => navigate('/orders')}
                >
                  See All
                </button>
              </div>
              <div className='card-body'>
                <div className='table-responsive'>
                  {gigs.data ? (
                    <table width='100%'>
                      <thead>
                        <tr>
                          <td>Serial</td>
                          <td>Gig Title</td>
                          <td>ME</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        {gigs?.data?.slice(0, 5).map((item, index) => {
                          const { gig_id, title, name, status, ft_img } = item;

                          return (
                            <tr
                              className='tableRow'
                              onClick={() =>
                                navigate(`/gigs/details/${gig_id}`)
                              }
                              key={item.gig_id}
                            >
                              <td className='fw-bold'>{index + 1}</td>
                              <td>
                                <div className='info'>
                                  <img
                                    src={`${url}/get/image/freelancing_gig_files/${ft_img}`}
                                    width='40px'
                                    height='40px'
                                    alt='Gig'
                                  />
                                  <div>
                                    <span> {title.slice(0, 20)}..</span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div>
                                  <h4>{name}</h4>
                                </div>
                              </td>

                              <td className='statFlex'>
                                {status === 'Pending' && (
                                  <span className='status orange'></span>
                                )}
                                {status === 'Approved' && (
                                  <span className='status green'></span>
                                )}
                                {status === 'Rejected' && (
                                  <span className='status red'></span>
                                )}
                                <p>{status}</p>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className='products div-border'>
            <div className='card'>
              <div className='card-header'>
                <h3>Recent Gig Orders</h3>
                <button
                  className='seeAllBtn'
                  onClick={() => navigate('/gig-orders')}
                >
                  See All
                </button>
              </div>

              <div className='card-body'>
                <div className='table-responsive'>
                  {gigOrders.data ? (
                    <table width='100%'>
                      <thead>
                        <tr>
                          <td>Serial</td>
                          <td>Order Title</td>
                          <td>Offered Price</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        {gigOrders?.data?.slice(0, 5).map((item, index) => {
                          const { id, order_title, offered_price, status } =
                            item;
                          return (
                            <tr
                              className='tableRow'
                              onClick={() =>
                                navigate(`/gig-orders/details/${id}`)
                              }
                              key={item.id}
                            >
                              <td className='fw-bold'>{index + 1}</td>
                              <td>
                                <div>
                                  <span> {order_title.slice(0, 20)}..</span>
                                </div>
                              </td>
                              <td>
                                <div>
                                  <h4>{offered_price}&#2547;</h4>
                                </div>
                              </td>
                              <td className='statFlex'>
                                {status === 'Pending' && (
                                  <span className='status orange'></span>
                                )}
                                {status === 'Approved' && (
                                  <span className='status green'></span>
                                )}
                                {status === 'Rejected' && (
                                  <span className='status red'></span>
                                )}
                                <p>{status}</p>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
