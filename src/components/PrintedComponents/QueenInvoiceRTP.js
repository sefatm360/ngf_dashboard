import moment from 'moment';
import React from 'react';
import './invoice.css';
const QueenInvoiceRTP = ({ orderDetails, queenDetails, orderCommision }) => {
  const { order_date, order_details, order_id } = orderDetails;
  const { id, name, address, city, post_code, phone } = queenDetails;

  const reducer = order_details?.reduce(
    (acc, curr) => {
      acc.netAmount = acc.netAmount + Number(curr.quantity);
      acc.netPrice = acc.netPrice + Number(curr.price) * Number(curr.quantity);

      return acc;
    },
    { netAmount: 0, netPrice: 0 }
  );
  const orderDate = new Date(order_date).toUTCString();

  return (
    <div className='form-wrapper'>
      <div>
        <div style={{ textAlign: 'center' }}>
          <img src='/assets/invoice_logo.png' alt='' />
        </div>
        <div className='queen-info-wrapper'>
          <div>
            <div>
              <p className='queen-info-title'>ME info</p>
            </div>
            <div className='queen-info'>
              <p>
                <span>Date:</span>{' '}
                {orderDate.split(':')[0] + ':' + orderDate.split(':')[1]}
              </p>
              <p>
                <span>Name:</span> {name}
              </p>
              <p>
                <span>ME id:</span> NGF-ME{id}
              </p>
              <p>
                <span>Address:</span> {address},{city} {post_code}
              </p>
              <p>
                <span>Phone No:</span> 0{phone}
              </p>
            </div>
          </div>
          <div className='site-info'>
            <small>www.sunderbanmart.com</small>
            <small>Phone: +8809638336677</small>
            <small>Email: onthewayqueen@gmail.com</small>
          </div>
        </div>
        <div>
          <div>
            <p className='queen-invoice-title queen-info-title'>ME Invoice</p>
          </div>
          <div className='invoice-order-id'>
            <span className='queen-info'>
              <span>Order id:</span> NGF-O{order_id}
            </span>
          </div>
          <div>
            <table className='invoice-table'>
              <thead className='invoice-table-head table_data'>
                <tr>
                  <td>Id</td>
                  <td>Product/Service</td>
                  <td>Unit Price</td>
                  <td>Quantity</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tfoot className='invoice-table-foot table_data'>
                <tr>
                  <td colSpan='4'>Thank you for your business</td>
                  <td className='queen-info'>
                    <span>Total:</span> {reducer?.netPrice}tk
                  </td>
                </tr>
              </tfoot>
              <tbody className='table_data'>
                {order_details?.map((order) => {
                  const { id, product_id, quantity, product_name, price } =
                    order;
                  return (
                    <tr key={id}>
                      <td>NGF-P{product_id}</td>
                      <td>{product_name}</td>
                      <td>{price}tk</td>
                      <td>{quantity}</td>
                      <td>{price * quantity}tk</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className='payment-received-title'>
            <span className='queen-info'>
              <span>Date: </span>
              {moment(order_date).format('MMM Do YY')}
            </span>
            <h3>Payment Received</h3>
            <span className='queen-info'>
              <span>Order id:</span> NGF-O{order_id}
            </span>
          </div>
          <div className='received-paragraph'>
            <p>
              I, Miss/Mrs <u>{name}</u>, received BDT{' '}
              <u style={{ backgroundColor: 'yellow' }}>
                {reducer?.netPrice - (reducer?.netPrice * orderCommision) / 100}
                tk
              </u>{' '}
              from "On The Way" for selling of order id <b>NGF-O{order_id}</b>.
              Which is the total after <b>{orderCommision}%</b> service
              charge/commision of "On The Way"
            </p>
          </div>
        </div>
      </div>
      <div className='authority-sign-part'>
        <h3>Received with terms</h3>
        <h3>Authority</h3>
      </div>
    </div>
  );
};

export default QueenInvoiceRTP;
