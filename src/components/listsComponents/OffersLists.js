import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';

const OffersLists = ({ data, title, fetching, path }) => {
  return (
    <div className='orderpage-card'>
      <div className='projects'>
        <div className='card'>
          <div className='card-header'>
            <h3>{title} Offers</h3>
            <Link to={`/offers/${path}`}>See All</Link>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              {!fetching ? (
                data.length ? (
                  <table width='100%'>
                    <thead>
                      <tr>
                        <td>Offer Type</td>
                        <td>Product Name</td>
                        <td>Offer Desc</td>
                        <td>Expiry Date</td>
                        <td>&nbsp;</td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.slice(0, 5).map((item) => {
                        const {
                          id,
                          offer_desc,
                          offer_type,
                          product_name,
                          exp_date,
                        } = item;
                        return (
                          <tr key={id}>
                            <td>{offer_type}</td>
                            <td>{product_name}</td>
                            <td>{offer_desc}</td>
                            <td>{exp_date?.split('T')[0]}</td>
                            <td>
                              <Link to={`/offers/details/${id}`}>
                                <button className='view-button'>
                                  View{' '}
                                  <span className='las la-arrow-right'></span>
                                </button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <h3 className='spinner'>No {title} Offer</h3>
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

export default OffersLists;
