import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cards from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { useSellerContext } from '../../contexts/sellerContext';
import {
  FETCH_APPROVED_SELLER,
  FETCH_PENDING_SELLER,
  FETCH_REJECTED_SELLER,
  url,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const Sellers = () => {
  const { pathname } = useLocation();

  const {
    rejectedSeller,
    approvedSeller,
    pendingSeller,
    dispatch: sellerDispatch,
  } = useSellerContext();

  const [fetching, setFetching] = useState(false);
  const queenLimit = 10;

  const urls = [
    {
      url: `/out/api/seller/get/all/seller/by/status/pending?limit=${queenLimit}&skip=0`,
      dispatch: sellerDispatch,
      action: FETCH_PENDING_SELLER,
      check: pendingSeller,
    },
    {
      url: `/out/api/seller/get/all/seller/by/status/approved?limit=${queenLimit}&skip=0`,
      dispatch: sellerDispatch,
      action: FETCH_APPROVED_SELLER,
      check: approvedSeller,
    },
    {
      url: `/out/api/seller/get/all/seller/by/status/rejected?limit=${queenLimit}&skip=0`,
      dispatch: sellerDispatch,
      action: FETCH_REJECTED_SELLER,
      check: rejectedSeller,
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
      length: pendingSeller.total,
      field: 'Pending Seller',
      path: '/sellers/all?type=pending',
    },
    {
      id: 2,
      length: approvedSeller.total,
      field: 'Approved Seller',
      path: '/sellers/all?type=approved',
    },
    {
      id: 3,
      length: rejectedSeller.total,
      field: 'Rejected Seller',
      path: '/sellers/all?type=rejected',
    },
  ];

  const lists = [
    { data: pendingSeller.data, title: 'Pending', path: 'pending' },
    { data: approvedSeller.data, title: 'Approved', path: 'approved' },
    { data: rejectedSeller.data, title: 'Rejected', path: 'rejected' },
  ];

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div className='link-container'>
            <p className='dis-link'>{pathname}</p>
          </div>
          <h1 className='page-header-title'>
            Seller list Overview{' '}
            <Link className='button' to='/sellers/all'>
              All Sellers
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
                      <h3>{title} Sellers</h3>
                      <Link to={`/sellers/all?type=${path}`}>See All</Link>
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
                                    <Link to={`/sellers/details/${id}`}>
                                      <div className='info'>
                                        <span style={{ marginRight: '10px' }}>
                                          {index + 1}
                                        </span>

                                        {photo ? (
                                          <img
                                            src={`${url}/get/image/freelancing_seller_files/${photo}`}
                                            width='40px'
                                            height='40px'
                                            alt='ontheway freelancing seller'
                                          />
                                        ) : (
                                          <img
                                            src='/assets/avatar.jpg'
                                            width='40px'
                                            height='40px'
                                            alt='ontheway freelancing seller '
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
                            <h3 className='spinner'>No {title} Seller</h3>
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

export default Sellers;
