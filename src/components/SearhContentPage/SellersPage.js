import moment from 'moment';
import React from 'react';
import { url } from '../../helpers/constants';

const SellersPage = ({ seller, serial }) => {
  return (
    <>
      <div className='queen-info'>
        <div className='d-flex align-items-center'>
          <span style={{ marginRight: '10px' }}>{serial}</span>
          <div className='img-media'>
            <img
              src={`${url}/get/image/freelancing_seller_files/${seller.photo}`}
              alt=''
              className='img-fluid'
            />
          </div>
          <div className='ml-2 d-flex flex-column'>
            <div className='d-flex queen-all-info'>
              <p>
                <b>{seller.name}</b>
              </p>
              <p className='pl-1 pr-1 main-color'>
                <b>NGF-ME{seller.id}</b>
              </p>
              <p>(0{seller.phone})</p>
            </div>
            <div className='d-flex'>
              <p>
                <b>Joined:</b>
                {moment(seller.apply_date).format('MMM Do YY')}
              </p>
            </div>
          </div>
        </div>
        <div>
          {/* <p className='pl-4 queens-note-area'>
            <b>Note: </b>
            {queen.note}
          </p> */}
          <p className='pl-4  queens-note-area'>
            <b>Status: </b>
            <span
              className={`${
                seller.status === 'Approved'
                  ? 'approve-status'
                  : 'rejected-status'
              }`}
            >
              {seller.status}
            </span>
          </p>
          {seller.note ? (
            <p className='pl-4 queens-note-area'>
              <b>Note: </b>
              {seller.note}
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default SellersPage;
