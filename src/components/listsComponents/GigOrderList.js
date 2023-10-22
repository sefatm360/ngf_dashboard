import React from 'react';
import { Link } from 'react-router-dom';
import GigOrderPage from '../SearhContentPage/GigOrderPage';
import Spinner from '../Spinner';

const GigOrderList = ({ data, title, fetching, path }) => {
  return (
    <div className='orderpage-card'>
      <div className='projects'>
        <div className='card'>
          <div className='card-header'>
            <h3>{title} Orders</h3>
            <Link to={`/gig-orders/${path}`}>See All</Link>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              {!fetching ? (
                data.total ? (
                  <table width='100%'>
                    <thead>
                      <tr>
                        <td>Serial</td>
                        <td>Order Id</td>
                        <td>Gig</td>
                        <td>Order date</td>
                        <td>Status</td>
                        <td>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.slice(0, 5).map((item, index) => {
                        return (
                          <GigOrderPage
                            order={item}
                            key={item.id}
                            serial={index + 1}
                          />
                        );
                      })}
                    </tbody>
                  </table>
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

export default GigOrderList;
