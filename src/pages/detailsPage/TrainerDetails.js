import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAdminContext } from '../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../helpers/constants';

const TrainerDetails = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState({});
  const { dispatch: adminDispatch } = useAdminContext();

  useEffect(() => {
    fetch(`${url}/otw-training/api/trainer/get/single/${id}`)
      .then((res) => res.json())
      .then((data) => setTrainer(data.data));
  }, [id]);

  const {
    inst_id,
    inst_name,
    inst_logo,
    name,
    phone,
    nid_back,
    nid_front,
    address,
    cv,
    photo,
    application_id,
    email,
    status,
    specialist,
    image,
  } = trainer;

  const handleClick = () => {
    adminDispatch({
      type: SHOW_MODAL,
      payload: { trainer, modal: 'Edit Trainer Modal', setTrainer },
    });
  };
  return (
    <div className=''>
      <h1 className='page-header-title'>Trainer Details</h1>
      <h2>{name}'s Trainer Application</h2>
      <div className='profile-page-container'>
        <div className='profile-img-slot'>
          {image ? (
            <img
              className=' queen-pic'
              src={URL.createObjectURL(photo)}
              alt=''
            />
          ) : (
            <img
              className='queen-pic'
              src={`${url}/get/image/training_trainer_files/${photo}`}
              alt=''
            />
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
                Phone:<span>{phone}</span>
              </p>
            </span>
            <span>
              <p>
                Email:<span>{email}</span>
              </p>
            </span>
            <span>
              <p>
                institute logo:
                <span style={{ display: 'block' }}>
                  {inst_logo && (
                    <img
                      className=''
                      src={`${url}/get/image/training_institutes/${inst_logo}`}
                      alt=''
                      width={100}
                      height={100}
                    />
                  )}
                </span>
              </p>
            </span>
          </div>
          <div className='items-right'>
            <span>
              <p>
                Address:<span>{address}</span>
              </p>
            </span>
            <span>
              <p>
                Specialist:<span>{specialist}</span>
              </p>
            </span>
            <span>
              <p>
                Status:<span>{status}</span>
              </p>
            </span>
          </div>

          <div>
            <h4>NID</h4>
            <div>
              {nid_front && (
                <img
                  className='show-nid'
                  src={`${url}/get/image/training_trainer_files/${nid_front}`}
                  alt=''
                />
              )}
              {nid_back && (
                <img
                  className='show-nid'
                  src={`${url}/get/image/training_trainer_files/${nid_back}`}
                  alt=''
                />
              )}
            </div>
          </div>
        </div>

        <div>
          {cv && (
            <button
              className='button'
              onClick={() =>
                window.open(
                  `${url}/download/files/freelancing_trainer_files/${cv}`,
                  'Data',
                  'height=500, width=500'
                )
              }
            >
              View CV
            </button>
          )}
        </div>

        <button className='edit-btn mt-5' type='button' onClick={handleClick}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default TrainerDetails;
