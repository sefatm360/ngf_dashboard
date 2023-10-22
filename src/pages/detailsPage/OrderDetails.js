import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useAdminContext } from '../../contexts/adminContext';
import { useOrderContext } from '../../contexts/orderContext';
import { SET_ORDER, SHOW_MODAL } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [invoiceData, setInvoiceData] = useState({
    commision: 20,
    delivery: 80,
  });
  const { dispatch: adminDispatch } = useAdminContext();
  const { dispatch: orderDispatch } = useOrderContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const { data } = await fetcher.get({
        url: `/api/orders/get/${id}`,
      });
      setOrderDetails(data.data);
      setIsLoading(false);
    })();
  }, [id]);

  const {
    customer_name,
    customer_phone,
    delivery_address,
    order_date,
    status,
    queen_id,
    note,
  } = orderDetails;

  const reducer = orderDetails.order_details?.reduce(
    (acc, curr) => {
      acc.netAmount = acc.netAmount + Number(curr.quantity);
      acc.netPrice = acc.netPrice + Number(curr.price) * Number(curr.quantity);

      return acc;
    },
    { netAmount: 0, netPrice: 0 }
  );

  const handleClick = () => {
    adminDispatch({ type: SHOW_MODAL, payload: orderDetails });
    orderDispatch({ type: SET_ORDER, payload: setOrderDetails });
  };

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          {isLoading ? (
            <>
              <div className='show-modal-back'></div>
              <Spinner />
            </>
          ) : (
            <div>
              <div className='link-container'>
                <p className='dis-link'>
                  <Link
                    to='/orders'
                    className='link'
                    style={{ color: 'darkblue' }}
                  >
                    /orders
                  </Link>
                </p>
              </div>
              <h2>Order Details Page</h2>
              <div className='order-details-container'>
                <div className='order-details-top-content'>
                  <div className='order-information mb-3'>
                    <p className='b-info'>
                      Order Id: <span>OTW-O{id}</span>
                    </p>
                    <p className='b-info'>
                      Customer Name: <span>{customer_name}</span>
                    </p>
                    <p className='b-info'>
                      Customer Number: <span>{customer_phone}</span>
                    </p>
                    <p className='b-info'>
                      Order Date:{' '}
                      <span>{moment(order_date).format('MMM Do YY')}</span>
                    </p>
                    <p className='b-info'>
                      Order Time: <span>{moment(order_date).format('LT')}</span>
                    </p>
                    <p className='b-info'>
                      Delivery Address: <span>{delivery_address}</span>
                    </p>
                    <p className='b-info'>
                      Status: <span>{status}</span>
                    </p>
                  </div>

                  {/* note section */}

                  <div>
                    <h3 className='b-info'>
                      Note: <span> {note} </span>{' '}
                    </h3>
                  </div>

                  <div>
                    <button
                      className='cmn-btn mt-3 mb-4'
                      style={{
                        padding: '0.5rem 1rem',
                        color: 'white',
                        borderRadius: '5px',
                      }}
                      onClick={handleClick}
                    >
                      Edit
                    </button>
                    <br />
                    {status !== 'Pending' && (
                      <span
                        style={{
                          marginLeft: '1.5rem',
                        }}
                      >
                        <div className='invoice-view-input'>
                          <label htmlFor='commision'>
                            <span>OTW Commision</span>
                            <br />
                            <select
                              defaultValue={20}
                              name='commision'
                              id='commision'
                              className='select-commision'
                              onChange={(e) =>
                                setInvoiceData({
                                  ...invoiceData,
                                  commision: e.target.value,
                                })
                              }
                            >
                              <option value={0}>0%</option>
                              <option value={5}>5%</option>
                              <option value={10}>10%</option>
                              <option value={15}>15%</option>
                              <option value={20}>20%</option>
                            </select>
                          </label>
                          <label htmlFor='delivery'>
                            <span>Delivery Charge</span>
                            <br />
                            <input
                              defaultValue={80}
                              className='select-commision'
                              id='delivery'
                              name='delivery'
                              type='text'
                              placeholder='Delivery charge'
                              onChange={(e) =>
                                setInvoiceData({
                                  ...invoiceData,
                                  delivery: e.target.value,
                                })
                              }
                            />
                          </label>
                        </div>
                        <div className='mb-4 invoice-buttons'>
                          <Link
                            className='cmn-btn'
                            style={{
                              padding: '0.5rem 1rem',
                              color: 'white',
                              borderRadius: '5px',
                            }}
                            to={`/me-invoice/${id}/${queen_id}/${invoiceData.commision}`}
                          >
                            View ME's Invoice
                          </Link>

                          <Link
                            className='cmn-btn view-customer-invoice ml-2'
                            style={{
                              padding: '0.5rem 1rem',
                              color: 'white',
                              borderRadius: '5px',
                              display: 'inline-block',
                            }}
                            to={`/customers-invoice/${id}/${invoiceData.delivery}`}
                          >
                            View Customers Invoice
                          </Link>
                        </div>
                      </span>
                    )}
                  </div>
                </div>
                <div className='order-details-card'>
                  <div className='projects'>
                    <div className='card'>
                      <div className='card-header'>
                        <h3>Order Details</h3>
                      </div>
                      <div className='card-body'>
                        <div className='table-responsive'>
                          <table width='100%'>
                            <thead>
                              <tr>
                                <td>Product Name</td>
                                <td>Category</td>
                                <td>Unit Price </td>
                                <td>Quantity </td>
                                <td>Net Amount </td>
                              </tr>
                            </thead>
                            <tbody>
                              {orderDetails.order_details &&
                                orderDetails.order_details.map((item) => {
                                  const {
                                    product_name,
                                    product_id,
                                    price,
                                    quantity,
                                    product_category,
                                  } = item;
                                  return (
                                    <tr key={product_id}>
                                      <td>
                                        <Link
                                          to={`/products/details/${product_id}`}
                                        >
                                          {product_name}
                                        </Link>
                                      </td>
                                      <td>{product_category}</td>
                                      <td>&#2547;{price}</td>
                                      <td>{quantity}</td>
                                      <td>&#2547;{price * quantity}</td>
                                    </tr>
                                  );
                                })}

                              <tr className='border-top'>
                                <td colSpan='3'>&nbsp;</td>
                                <td>{reducer && reducer.netAmount}</td>
                                <td>&#2547;{reducer && reducer.netPrice}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrderDetails;
