import moment from 'moment';
import React from 'react';
import { url } from '../../helpers/constants';

const QueensPages = ({ queen, serial }) => {
  return (
    <>
      <div className='queen-info'>
        <div className='d-flex align-items-center'>
          <span style={{ marginRight: '10px' }}>{serial}</span>
          <div className='img-media'>
            <img
              src={`${url}/get/image/me/${queen.photo}`}
              alt=''
              className='img-fluid'
            />
          </div>
          <div className='ml-2 d-flex flex-column'>
            <div className='d-flex queen-all-info'>
              <p>
                <b>{queen.name}</b>
              </p>
              <p className='pl-1 pr-1 main-color'>
                <b>NGF-ME{queen.id}</b>
              </p>
            </div>
            <div className='d-flex'>
              <p>
                <b>Joined:</b> {moment(queen.reg_at).format('MMM Do YY')}
              </p>
            </div>
            {queen.queen_category ? <p>({queen.queen_category})</p> : ''}
          </div>
        </div>
        <div>
          <p className='pl-4  queens-note-area'>
            <p>
              <b>Phone:</b>
              {queen.phone}
            </p>
            <b>Status: </b>
            <span
              className={`${
                queen.status === 'Approved'
                  ? 'approve-status'
                  : 'rejected-status'
              }`}
            >
              {queen.status}
            </span>
          </p>
          {queen.note ? (
            <p className='pl-4 queens-note-area'>
              <b>Note: </b>
              {queen.note}
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default QueensPages;
