import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cards from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { useSocialContext } from '../../contexts/SocialContext';
import {
  FETCH_APPROVED_SOCIAL_USERS,
  FETCH_PENDING_SOCIAL_USERS,
  FETCH_REJECTED_SOCIAL_USERS,
  url,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const QueenConnect = () => {
  const { pathname } = useLocation();

  const {
    approvedSocialUsers,
    pendingSocialUsers,
    rejectedSocialUsers,
    dispatch: socialUserDispatch,
  } = useSocialContext();

  const [fetching, setFetching] = useState(false);
  const socialUserLimit = 10;

  const urls = [
    {
      url: `/otw-social/user/get/all/status/pending?limit=${socialUserLimit}&skip=0`,
      dispatch: socialUserDispatch,
      action: FETCH_PENDING_SOCIAL_USERS,
      check: pendingSocialUsers,
    },
    {
      url: `/otw-social/user/get/all/status/approved?limit=${socialUserLimit}&skip=0`,
      dispatch: socialUserDispatch,
      action: FETCH_APPROVED_SOCIAL_USERS,
      check: approvedSocialUsers,
    },
    {
      url: `/otw-social/user/get/all/status/rejected?limit=${socialUserLimit}&skip=0`,
      dispatch: socialUserDispatch,
      action: FETCH_REJECTED_SOCIAL_USERS,
      check: rejectedSocialUsers,
    },
  ];

  useEffect(() => {
    urls.forEach((item) => {
      const { url, action, dispatch, check } = item;
      if (!check.total) {
        setFetching(true);
        (async function () {
          const { data } = await fetcher.get({
            url: url,
          });
          console.log({ data });
          dispatch({
            type: action,
            payload: {
              total: data.total,
              data: data.data,
            },
          });
          setFetching(false);
        })();
      }
    });
  }, []);

  const cards = [
    {
      id: 1,
      length: pendingSocialUsers.total,
      field: 'Pending Social Users',
      path: '/queen-connect/all?type=pending',
    },
    {
      id: 2,
      length: approvedSocialUsers.total,
      field: 'Approved Social Users',
      path: '/queen-connect/all?type=approved',
    },
    {
      id: 3,
      length: rejectedSocialUsers.total,
      field: 'Rejected Social Users',
      path: '/queen-connect/all?type=rejected',
    },
  ];

  const lists = [
    { data: pendingSocialUsers.data, title: 'Pending', path: 'pending' },
    { data: approvedSocialUsers.data, title: 'Approved', path: 'approved' },
    { data: rejectedSocialUsers.data, title: 'Rejected', path: 'rejected' },
  ];

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div className='link-container'>
            <p className='dis-link'>{pathname}</p>
          </div>
          <h1 className='page-header-title'>
            Social Users list Overview{' '}
            <Link className='button' to='/queen-connect/all'>
              All Social Users
            </Link>
          </h1>
          <div className='cards orderpage'>
            <Cards cards={cards} fetching={fetching} />
          </div>

          <div className='recent-grid queen-list-page'>
            {lists?.map((item) => {
              const { data, title, path } = item;
              return (
                <div className='customers' key={title}>
                  <div className='card'>
                    <div className='card-header'>
                      <h3>{title} Social User</h3>
                      <Link to={`/queen-connect/all?type=${path}`}>
                        See All
                      </Link>
                    </div>
                    <div className='card-body'>
                      {!fetching ? (
                        <>
                          {data ? (
                            <>
                              {data.slice(0, 5).map((item, index) => {
                                const { id, photo, name, phone, apply_date } =
                                  item;
                                return (
                                  <div key={id} className='customer'>
                                    <Link to={`/queen-connect/details/${id}`}>
                                      <div className='info'>
                                        <span style={{ marginRight: '10px' }}>
                                          {index + 1}
                                        </span>

                                        {photo ? (
                                          <img
                                            src={`${url}/get/image/social_users_files/${photo}`}
                                            width='40px'
                                            height='40px'
                                            alt='ME'
                                          />
                                        ) : (
                                          <img
                                            src='/assets/avatar.jpg'
                                            width='40px'
                                            height='40px'
                                            alt='ME'
                                          />
                                        )}
                                        <div>
                                          <div
                                            style={{
                                              display: 'flex',
                                              gap: '5px',
                                            }}
                                          >
                                            <h4>
                                              {name} OTW-SU{id}
                                            </h4>
                                            <small>({phone})</small>
                                          </div>
                                          <div style={{ display: 'flex' }}>
                                            <h4>Joined: </h4>
                                            <small>
                                              {moment(apply_date).format(
                                                'MMM Do YY'
                                              )}
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <h3 className='spinner'>No {title} Social Users</h3>
                          )}
                        </>
                      ) : (
                        <Spinner />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default QueenConnect;
