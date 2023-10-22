import React from 'react';
import { url } from '../../helpers/constants';

const SocialUserBlock = ({ socialUser, serial }) => {
  return (
    <>
      <div className='queen-info'>
        <div className='d-flex align-items-center'>
          <span style={{ marginRight: '10px' }}>{serial}</span>
          <div className='img-media'>
            {socialUser.photo ? (
              <img
                src={`${url}/get/image/social_users_files/${socialUser.photo}`}
                alt=''
                className='img-fluid'
              />
            ) : (
              <img
                src='/assets/avatar.jpg'
                width='40px'
                height='40px'
                alt='Queen'
              />
            )}
          </div>
          <div className='ml-2 d-flex flex-column'>
            <div className='d-flex queen-all-info'>
              <p>
                <b>{socialUser.name}</b>
              </p>
              <p className='pl-1 pr-1 main-color'>
                <b>NGF-ME{socialUser.id}</b>
              </p>
              <p>(0{socialUser.phone})</p>
            </div>
            <div className='d-flex'>
              <p>
                <b>Joined:</b> {socialUser.apply_date}
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
                socialUser.status === 'Approved'
                  ? 'approve-status'
                  : 'rejected-status'
              }`}
            >
              {socialUser.status}
            </span>
          </p>
          {socialUser.note ? (
            <p className='pl-4 queens-note-area'>
              <b>Note: </b>
              {socialUser.note}
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default SocialUserBlock;
