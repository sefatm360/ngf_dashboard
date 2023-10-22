import React from 'react';
import { url } from '../../helpers/constants';

const TraineesPage = ({ trainee, serial }) => {
  return (
    <>
      <div className='queen-info'>
        <div className='d-flex align-items-center'>
          <span style={{ marginRight: '10px' }}>{serial}</span>
          <div className='img-media'>
            <img
              src={`${url}/get/image/training_trainee_files/${trainee.photo}`}
              alt=''
              className='img-fluid'
            />
          </div>
          <div className='ml-2 d-flex flex-column'>
            <div className='d-flex queen-all-info'>
              <p>
                <b>{trainee.name}</b>
              </p>
              <p className='pl-1 pr-1 main-color'>
                <b>OTWT-T{trainee.id}</b>
              </p>
              <p>(0{trainee.phone})</p>
            </div>
            <div className='d-flex'>
              <p>
                <b>Division:</b> {trainee.division}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className='pl-4  queens-note-area'>
            <b>Status: </b>
            <span
              className={`${
                trainee.status === 'Approved'
                  ? 'approve-status'
                  : 'rejected-status'
              }`}
            >
              {trainee.status}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default TraineesPage;
