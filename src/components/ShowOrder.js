import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetcher from '../helpers/fetchApi';

const ShowOrder = ({ order, serial }) => {
  const { id, customer_name, order_date, delivery_address, order_id } = order;
  const [products, seProducts] = useState([]);
  const [accordion, setAccordion] = useState(false);

  useEffect(() => {
    if ((order_id || id) && accordion && !products.length) {
      (async () => {
        const { data } = await fetcher.get({
          url: `/api/orders/get/products/${id || order_id}`,
        });

        if (data.success) {
          seProducts(data.data);
        }
      })();
    }
  }, [accordion]);

  return (
    <div
      style={{ backgroundColor: '#E5E6E4', padding: '5px 0', margin: '5px 0' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          marginBottom: '5px',
          gap: '5px',
        }}
      >
        <span className='fw-bold'>{serial}</span>
        <span>OTW-O{id || order_id}</span>
        <span>{customer_name}</span>
        <span>{moment(order_date).format('MMM Do YY')}</span>
        <span>{delivery_address.split(',')[0]}</span>
        <span>
          <button
            className='view-button'
            onClick={() => setAccordion(!accordion)}
          >
            Expand
          </button>
        </span>
        <span>
          <Link to={`/orders/details/${id || order_id}`}>
            <button className='view-button'>
              View <span className='las la-arrow-right'></span>
            </button>
          </Link>
        </span>
      </div>
      {accordion && (
        <div style={{ marginBottom: '10px', padding: '0px 20px' }}>
          <table width='100%'>
            <thead>
              <tr>
                <td>Product</td>
                <td>Queen</td>
                <td>Category</td>
                <td>Price</td>
                <td>Quantity </td>
              </tr>
            </thead>
            <tbody>
              {products.length &&
                products.map((item) => {
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
                      <td>
                        <Link to={`/products/details/${product_id}`}>
                          {product_name}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/me/details/${queen_id}`}>{queen_name}</Link>
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
    </div>
  );
};

export default ShowOrder;
