import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cards from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { useQueenContext } from '../../contexts/queenContext';
import {
  FETCH_APPROVED_QUEEN,
  FETCH_PENDING_QUEEN,
  FETCH_REJECTED_QUEEN,
  url,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const Queens = () => {
  const { pathname } = useLocation();

  const {
    rejectedQueen,
    approvedQueen,
    pendingQueen,
    dispatch: queensDispatch,
  } = useQueenContext();

  const [fetching, setFetching] = useState(false);
  const queenLimit = 5;

  const urls = [
    {
      url: `/api/admin/queen/get/all/pending?limit=${queenLimit}&skip=0`,
      dispatch: queensDispatch,
      action: FETCH_PENDING_QUEEN,
      check: pendingQueen,
    },
    {
      url: `/api/admin/queen/get/all/approved?limit=${queenLimit}&skip=0`,
      dispatch: queensDispatch,
      action: FETCH_APPROVED_QUEEN,
      check: approvedQueen,
    },
    {
      url: `/api/admin/queen/get/all/rejected?limit=${queenLimit}&skip=0`,
      dispatch: queensDispatch,
      action: FETCH_REJECTED_QUEEN,
      check: rejectedQueen,
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
          dispatch({ type: action, payload: data });
          setFetching(false);
        })();
      }
    });
  }, []);

  const cards = [
    {
      id: 1,
      length: pendingQueen.total,
      field: 'Pending Queens',
      path: '/me/all?type=pending',
    },
    {
      id: 2,
      length: approvedQueen.total,
      field: 'Approved Queens',
      path: '/me/all?type=approved',
    },
    {
      id: 3,
      length: rejectedQueen.total,
      field: 'Rejected Queens',
      path: '/me/all?type=rejected',
    },
  ];

  const lists = [
    { data: pendingQueen.data, title: 'Pending', path: 'pending' },
    { data: approvedQueen.data, title: 'Approved', path: 'approved' },
    { data: rejectedQueen.data, title: 'Rejected', path: 'rejected' },
  ];

  return (
    <div className='content'>
      <main>
        <div className='link-container'>
          <p className='dis-link'>{pathname}</p>
        </div>
        <h1 className='page-header-title'>
          ME's list Overview{' '}
          <Link className='button' to='/me/all'>
            All Queens
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
                    <h3>{title} Queens</h3>
                    <Link to={`/me/all?type=${path}`}>See All</Link>
                  </div>
                  <div className='card-body'>
                    {!fetching ? (
                      <>
                        {data ? (
                          <>
                            {data.map((item, index) => {
                              const {
                                id,
                                photo,
                                name,
                                phone,
                                reg_at,
                                queen_category,
                              } = item;

                              return (
                                <div key={id} className='customer'>
                                  <Link to={`/me/details/${id}`}>
                                    <div className='info'>
                                      <span style={{ marginRight: '10px' }}>
                                        {index + 1}
                                      </span>
                                      {photo ? (
                                        <img
                                          src={`${url}/get/image/me/${photo}`}
                                          width='40px'
                                          height='40px'
                                          alt='queen'
                                          style={{ borderRadius: '50%' }}
                                        />
                                      ) : (
                                        <img
                                          src='/assets/avatar.jpg'
                                          width='40px'
                                          height='40px'
                                          alt=''
                                          style={{ borderRadius: '50%' }}
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
                                            {name} NGF-ME{id}
                                          </h4>
                                          {queen_category ? (
                                            <small>({queen_category})</small>
                                          ) : (
                                            ''
                                          )}
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                          <h4>Joined: </h4>
                                          <small>
                                            {moment(reg_at).format('MMM Do YY')}
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
                          <h3 className='spinner'>No {title} Queen</h3>
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
  );
};
export default Queens;
