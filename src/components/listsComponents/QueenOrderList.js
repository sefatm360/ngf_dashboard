import React from 'react';
import { Link } from 'react-router-dom';
import ShowOrder from '../ShowOrder';
import Spinner from '../Spinner';

const QueenOrderList = ({ data, title, fetching, path }) => {
  return (
    <div className='orderpage-card'>
      <div className='projects'>
        <div className='card'>
          <div className='card-header'>
            <h3>{title} Orders</h3>
            <Link to={`/me/orders?${path}`}>See All</Link>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              {!fetching ? (
                data ? (
                  <div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        textAlign: 'center',
                      }}
                    >
                      <span className='fw-bold'>Serial</span>
                      <span className='fw-bold'>Order Id</span>
                      <span className='fw-bold'>Customer Name</span>
                      <span className='fw-bold'>Order Date</span>
                      <span className='fw-bold'>Delivery Address</span>
                      <span className='fw-bold'>Expand</span>
                      <span className='fw-bold'>Show</span>
                    </div>
                    <div>
                      {data.slice(0, 10).map((item, index) => (
                        <ShowOrder
                          key={item.id}
                          order={item}
                          serial={index + 1}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <h3 className='spinner'>No {title} Order</h3>
                )
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueenOrderList;
