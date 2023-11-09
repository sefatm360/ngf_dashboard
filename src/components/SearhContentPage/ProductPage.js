import React from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../helpers/constants';

const ProductPage = ({ product, serial }) => {
  const {
    id,
    product_name,
    queen_phone,
    category,
    product_picture_1,
    queen_name,
    price,
    status,
    queen_id,
  } = product;

  return (
    <>
      <tr className='tableRow'>
        <td className='fw-bold'>{serial}</td>
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
              <span className='product-list-page-name primary ml-2'>
                NGF-P{id}
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
                <Link to={`/me/details/${queen_id}`}> {queen_name} </Link>
              </span>
              <br />
              <span className='product-list-page-name secondary'>
                {queen_phone}
              </span>
            </div>
          </div>
        </td>
        <td>
          <span className='product-list-page-name primary'>{category}</span>
        </td>
        <td>
          <span className='product-list-page-name primary'>
            <span className='product-list-page-name secondary'>
              <span
                className={`${
                  status === 'Approved' ? 'approve-status' : 'rejected-status'
                }`}
              >
                {status}
              </span>
            </span>
          </span>
        </td>

        <td>
          <Link to={`/products/details/${id}`}>
            <button className='view-button'>
              View <span className='las la-arrow-right'></span>
            </button>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default ProductPage;
