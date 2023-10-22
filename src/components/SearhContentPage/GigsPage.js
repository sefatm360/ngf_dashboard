import React from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../helpers/constants';

const GigsPage = ({ gig, serial }) => {
  const { gig_id, id, seller_id, title, status, name, price, ft_img } = gig;
  return (
    <>
      <tr className='tableRow'>
        <td className='fw-bold'>{serial}</td>
        <td>
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
              <span className='product-list-page-name primary'>{title}</span>
              <span className='product-list-page-name primary ml-2'>
                OTWF-G{gig_id || id}
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
                <Link to={`/sellers/details/${seller_id}`}> {name} </Link>
              </span>
              <br />
            </div>
          </div>
        </td>
        <td>
          <span className='product-list-page-name primary'>
            <span className='product-list-page-name secondary'>
              <span
                className={`${
                  status === 'Approved' ? 'approve-status' : 'rejected-status'
                }`}>
                {status}
              </span>
            </span>
          </span>
        </td>
        <td>
          <Link to={`/gigs/details/${gig_id || id}`}>
            <button className='view-button'>
              View <span className='las la-arrow-right'></span>
            </button>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default GigsPage;
