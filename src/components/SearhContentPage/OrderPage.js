import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetcher from '../../helpers/fetchApi';

const OrderPage = ({ order, serial }) => {
  const { order_date, id, status, note, customer_name, order_id } = order;

  const [products, seProducts] = useState([]);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if ((id || order_id) && expand && !products.length) {
      (async () => {
        const { data } = await fetcher.get({
          url: `/api/orders/get/products/${id || order_id}`,
        });
        if (data.success) {
          seProducts(data.data);
        }
      })();
    }
  }, [expand, id, order_id]);

  return (
    <>
      <tr className='tableRow'>
        <td>{serial}</td>
        <td>NGF-O{id || order_id}</td>
        <td>{customer_name}</td>
        <td>{moment(order_date).format('MMM Do YY')}</td>
        <td> {status}</td>
        <td>{note}</td>
        <td>
          <button className='view-button' onClick={() => setExpand(!expand)}>
            Expand
          </button>
        </td>

        <td>
          <Link to={`/orders/details/${id || order_id}`}>
            <button className='view-button'>
              View <span className='las la-arrow-right'></span>
            </button>
          </Link>
        </td>
      </tr>
      {/* <span
        className={`${
          status === 'Rejected' ? 'rejected-status' : 'approve-status '
        }`}>
        {status}
      </span> */}

      <tr>
        <td colSpan={12}>
          <table class='table w-100'>
            <thead>
              <tr></tr>
            </thead>
            <tbody class='table-group-divider'>
              {expand && (
                <div
                  style={{
                    marginBottom: '10px',
                    padding: '0px 20px',
                    backgroundColor: 'white',
                  }}
                >
                  <table width='100%'>
                    <thead>
                      <tr>
                        <td>Serial</td>
                        <td>Product</td>
                        <td>ME</td>
                        <td>Category</td>
                        <td>Price</td>
                        <td>Quantity </td>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length &&
                        products.map((item, index) => {
                          const {
                            product_name,
                            product_id,
                            price,
                            queen_name,
                            queen_id,
                            quantity,
                            product_category,
                          } = item;
                          return (
                            <tr key={product_id}>
                              <td className='fw-bold'>{index + 1}</td>
                              <td>
                                <Link to={`/products/details/${product_id}`}>
                                  {product_name}
                                </Link>
                              </td>
                              <td>
                                <Link to={`/me/details/${queen_id}`}>
                                  {queen_name}
                                </Link>
                              </td>

                              <td>{product_category}</td>
                              <td>&#2547;{price}</td>
                              <td>{quantity}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </tbody>
          </table>
        </td>
      </tr>
    </>
  );
};

export default OrderPage;
