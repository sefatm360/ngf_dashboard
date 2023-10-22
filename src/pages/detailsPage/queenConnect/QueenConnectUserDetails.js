import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { useAdminContext } from '../../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../../helpers/constants';
import fetcher from '../../../helpers/fetchApi';

const QueenConnectUserDetails = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [socialUsers, setSocialUsers] = useState({});
  const { dispatch: adminDispatch } = useAdminContext();

  const {
    address,
    city,
    division,
    designation,
    cover_photo,
    post_code,
    name,
    phone,
    photo,
    status,
    email,
    note,
    last_update,
  } = socialUsers;

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: `/otw-social/user/get/for-admin/${id}`,
      });
      console.log({ data });
      if (data.success) {
        setSocialUsers(data.data);
      }
      setLoading(false);
    })();
  }, [id]);

  return (
    <div className='content'>
      <div className='center-info'>
        {loading ? (
          <div className='queen-loading'>
            <Spinner />
          </div>
        ) : (
          <main>
            <div
              style={{ display: 'flex', justifyContent: 'space-between' }}
              className='link-container'
            >
              <p className='dis-link'>
                <Link
                  to='/sellers'
                  className='link'
                  style={{ color: 'darkblue' }}
                >
                  /queen-connect
                </Link>
                /{name}
              </p>
            </div>
            <h1 className='page-header-title'>{name}'s Profile Page</h1>
            <div className='profile-page-container'>
              <div className='profile-img-slot'>
                {id ? (
                  <Link className='button' to={`/queen-connect/details/${id}`}>
                    Social User Profile
                  </Link>
                ) : (
                  ''
                )}
                <div className='d-flex'>
                  <img
                    className='queen-pic'
                    src={`${url}/get/image/social_users_files/${photo}`}
                    alt=''
                  />
                </div>
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
                      Address:<span>{address}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      City:<span>{city}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Division:<span>{division}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Post code:<span>{post_code}</span>
                    </p>
                  </span>
                </div>
                <div className='items-right'>
                  <span>
                    <p>
                      socialUsers Id:<span>OTW-S{id}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Status:<span>{status}</span>
                    </p>
                  </span>

                  <span>
                    <p>
                      Designation:<span>{designation}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Last Update:
                      <span>{moment(last_update).format('MMM Do YY')}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Email:<span>{email}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Note:<span>{note}</span>
                    </p>
                  </span>
                </div>
              </div>
              <div>
                <div className='nid-image-block'>
                  <h4>Cover Photo:</h4>
                  {cover_photo && (
                    <img
                      className='show-nid'
                      src={`${url}/get/image/social_users_files/${cover_photo}`}
                      alt=''
                    />
                  )}
                </div>
              </div>
              <div className='approve-buttons'>
                <button
                  onClick={() => {
                    adminDispatch({
                      type: SHOW_MODAL,
                      payload: { socialUsers, setSocialUsers },
                    });
                  }}
                  className='approve-btn'
                >
                  Edit
                </button>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default QueenConnectUserDetails;
