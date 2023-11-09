import React from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../helpers/constants';
import Spinner from '../Spinner';

const ProductLists = ({ data, title, fetching, path }) => {
  return (
    <div className='product-page-card'>
      <div className='projects'>
        <div className='card'>
          <div className='card-header'>
            <h3>{title} Products</h3>
            <Link to={`${path}`}>See All</Link>
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              {!fetching ? (
                data ? (
                  <table width='100%'>
                    <thead>
                      <tr>
                        <td width='10%'>Serial</td>
                        <td width='30%'>Product</td>
                        <td width='30%'>ME</td>
                        <td width='10%'>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.slice(0, 5).map((item, index) => {
                        const {
                          id,
                          product_name,
                          queen_phone,
                          product_picture_1,
                          queen_name,
                          price,
                          queen_id,
                        } = item;
                        return (
                          <tr key={id}>
                            <td className='fw-bold'>{index + 1}</td>
                            <td>
                              <div className='box-container'>
                                <div className='image-box'>
                                  <span className='product-list-page-img'>
                                    <img
                                      src={`${url}/get/image/products/${product_picture_1}`}
                                      width='40px'
                                      height='40px'
                                      alt=''
                                    />
                                  </span>
                                </div>
                                <div className='box-content'>
                                  <span className='product-list-page-name primary'>
                                    {product_name}
                                  </span>
                                  <br />
                                  <span className='product-list-page-name secondary'>
                                    &#2547;{price}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className='box-container'>
                                <div className='box-content'>
                                  <span className='product-list-page-name primary'>
                                    <Link to={`/me/details/${queen_id}`}>
                                      {queen_name}
                                    </Link>
                                  </span>
                                  <br />
                                  <span className='product-list-page-name secondary'>
                                    {queen_phone}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td>
                              <Link to={`/products/details/${id}`}>
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
                  <h3 className='spinner'> No {title} Product</h3>
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

export default ProductLists;
