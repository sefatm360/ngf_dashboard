import React from 'react';

const CustomerInvoiceForm = ({ orderDetails }) => {
  const {
    order_date,
    customer_name,
    customer_phone,
    delivery_address,
    order_details,
    order_id,
  } = orderDetails;
  const orderDate = new Date(order_date);

  const reducer = order_details?.reduce(
    (acc, curr) => {
      acc.netAmount = acc.netAmount + Number(curr.quantity);
      acc.netPrice = acc.netPrice + Number(curr.price) * Number(curr.quantity);

      return acc;
    },
    { netAmount: 0, netPrice: 0 }
  );
  return (
    <div className='form-wrapper'>
      <div>
        <div style={{ textAlign: 'center' }}>
          <img src='/assets/invoice_logo.png' alt='' />
        </div>
        <div className='queen-info-wrapper'>
          <div>
            <div>
              <p className='queen-info-title'>Customer info</p>
            </div>
            <div className='queen-info'>
              <p>
                <span>Date:</span> {orderDate.toDateString()}
              </p>
              <p>
                <span>Order id:</span> NGF-O{order_id}
              </p>
              <p>
                <span>Name:</span> {customer_name}
              </p>

              <p>
                <span>Address:</span> {delivery_address}
              </p>
              <p>
                <span>Phone No:</span> 0{customer_phone}
              </p>
            </div>
          </div>
          <div className='site-info'>
            <small>www.onthe-way.com</small>
            <small>Phone: +8809638336677</small>
            <small>Email: onthewayqueen@gmail.com</small>
          </div>
        </div>
        <div>
          <div>
            <p className='queen-invoice-title queen-info-title'>Order Info</p>
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
                  const { product_id, quantity, product_name, price } = order;
                  return (
                    <tr key={product_id}>
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
      </div>
      <div className='authority-sign-part'>
        <h3>Received with terms</h3>
        <h3>Authority</h3>
      </div>
    </div>
  );
};

export default CustomerInvoiceForm;
