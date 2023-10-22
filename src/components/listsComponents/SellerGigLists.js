import React from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../helpers/constants';
import Spinner from '../Spinner';

const SellerGigLists = ({ data, title, fetching, path }) => {
  return (
    <div className='product-page-card'>
      <div className='projects'>
        <div className='card'>
          <div className='card-header'>
            <h3>{title} Gigs</h3>
            <Link to={`${path}`}>See All</Link>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              {!fetching ? (
                data.total ? (
                  <table width='100%'>
                    <thead>
                      <tr>
                        <td colSpan='3'>Serial</td>
                        <td>Gig</td>
                        <td>Seller</td>
                        <td>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.slice(0, 5).map((item, index) => {
                        const { gig_id, id, title, ft_img, seller_id, name } =
                          item;
                        return (
                          <tr key={gig_id || id}>
                            <td className='fw-bold'>{index + 1}</td>
                            <td colSpan='3'>
                              <div className='box-container'>
                                <div className='image-box'>
                                  <span className='product-list-page-img'>
                                    <img
                                      src={`${url}/get/image/freelancing_gig_files/${ft_img}`}
                                      width='40px'
                                      height='40px'
                                      alt=''
                                    />
                                  </span>
                                </div>
                                <div className='box-content'>
                                  <span>{title}</span>
                                  <br />
                                  {/* <span className='product-list-page-name secondary'>
                                    &#2547;{price}
                                  </span> */}
                                </div>
                              </div>
                            </td>

                            <td>
                              <Link to={`/sellers/details/${seller_id}`}>
                                {name}
                              </Link>
                            </td>
                            <td>
                              <Link to={`/gigs/details/${gig_id || id}`}>
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
                  <h3 className='spinner'> No {title} Gigs</h3>
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

export default SellerGigLists;
