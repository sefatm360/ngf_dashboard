import React from 'react';
import { url } from '../../helpers/constants';

const QueensOfferPage = ({ offer }) => {
  return (
    <>
      <div className='table-info'>
        <div className='d-flex'>
          <div className='img-media'>
            <img
              src={`${url}/get/image/queens_offer/${offer.banner}`}
              alt=''
              className='img-fluid'
            />
          </div>
          <div className='ml-2 d-flex flex-column'>
            <div className='d-flex queen-all-info'>
              <p>
                <b>{offer.title}</b>
              </p>
              <p className='pl-1 pr-1 main-color'>
                <b>OTW-QO{offer.id}</b>
              </p>
              {/* <p>(0{queen.phone})</p> */}
            </div>
            <div className='d-flex'>
              <p>
                <b>created Date:</b> {offer.created_date.split('T')[0]}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className='pl-4 queens-note-area'>
            <b>End Date: </b>
            {offer.end_date.split('T')[0]}
          </p>
          <p className='pl-4  queens-note-area'>
            <b>Status: </b>
            <span
              className={`${
                offer.status === 'Activr' ? 'active-status' : 'rejected-status'
              }`}
            >
              {offer.status}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default QueensOfferPage;
