import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAdminContext } from '../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../helpers/constants';

const TraineeDetails = () => {
  const { id } = useParams();
  const [trainee, setTrainee] = useState({});
  const { dispatch: adminDispatch } = useAdminContext();

  useEffect(() => {
    (() => {
      fetch(`${url}/otw-training/api/trainee/get/single/${id}`)
        .then((res) => res.json())
        .then((data) => setTrainee(data.data));
    })();
  }, [id]);

  const {
    name,
    address,
    nid_back,
    nid_front,
    phone,
    photo,
    email,
    about_occupation,
    city,
    division,
    occupation,
    post_code,
    queen_id,
    note,
    reg_at,
    status,
  } = trainee;

  const handleClick = () => {
    adminDispatch({
      type: SHOW_MODAL,
      payload: { trainee, modal: 'Edit Trainee Modal', setTrainee },
    });
  };
  return (
    <div>
      <div className='content'>
        <main>
          <h1 className='page-header-title'>Trainee Details</h1>

          <h2>{name}'s Trainer Application</h2>

          <div className='profile-page-container'>
            <div className='profile-img-slot'>
              {queen_id ? (
                <Link className='button' to={`/me/details/${queen_id}`}>
                  Queen Profile
                </Link>
              ) : (
                ''
              )}
              {photo ? (
                <img
                  className='queen-pic'
                  src={`${url}/get/image/training_trainee_files/${photo}`}
                  alt=''
                />
              ) : (
                <img className='queen-pic' src='/assets/avatar.jpg' alt='' />
              )}
              <br />
            </div>
            <div className='profile-details'>
              <div className='items-left'>
                <span>
                  <p>
                    Name: <span>{name}</span>
                  </p>
                </span>
                <span>
                  <p>
                    Phone:<span>{'0' + phone}</span>
                  </p>
                </span>
                <span>
                  <p>
                    Address:<span>{address}</span>
                  </p>
                </span>
                <span>
                  <p>
                    About Occupation:<span>{about_occupation}</span>
                  </p>
                </span>
                <span>
                  <p>
                    Reg. Date :<span>{moment(reg_at).format('DD/MM/YY')}</span>
                  </p>
                </span>
                <span>
                  <p>
                    Status:<span>{status}</span>
                  </p>
                </span>
              </div>
              <div className='items-right'>
                <span>
                  <p>
                    City: <span>{city}</span>{' '}
                  </p>
                </span>
                <span>
                  <p>
                    Email:<span>{email}</span>
                  </p>
                </span>
                <span>
                  <p>
                    Division:<span>{division}</span>
                  </p>
                </span>
                <span>
                  <p>
                    Occupation:<span>{occupation}</span>
                  </p>
                </span>
                <span>
                  <p>
                    Post Code:<span>{post_code}</span>
                  </p>
                </span>
                <span>
                  <p>
                    Note:<span>{note}</span>
                  </p>
                </span>
              </div>
              <div>
                <h4>NID</h4>
                <div>
                  {nid_front && (
                    <img
                      className='show-nid'
                      src={`${url}/get/image/nids/${nid_front}`}
                      alt=''
                    />
                  )}
                  {nid_back && (
                    <img
                      className='show-nid'
                      src={`${url}/get/image/nids/${nid_back}`}
                      alt=''
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              className='edit-btn mt-5'
              type='button'
              onClick={handleClick}
            >
              Edit
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TraineeDetails;
