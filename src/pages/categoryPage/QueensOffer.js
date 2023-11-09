import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cards from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { useQueensOfferContext } from '../../contexts/queensOfferContext';
import fetcher from '../../helpers/fetchApi';
import {
  GET_ACTIVE_QUEENSOFFER,
  GET_DELETED_QUEENSOFFER,
  GET_EXPIRED_QUEENSOFFER,
  SHOW_MODAL,
  url,
} from '../../helpers/constants';
import { useAdminContext } from '../../contexts/adminContext';
import moment from 'moment/moment';

const QueensOffer = () => {
  const { pathname } = useLocation();
  const {
    activeQueensOffer,
    expiredQueensOffer,
    deletedQueensOffer,
    dispatch: queensOfferDispatch,
  } = useQueensOfferContext();
  const { dispatch: adminDispatch } = useAdminContext();
  const [fetching, setFetching] = useState(false);
  const queenLimit = 10;

  const urls = [
    {
      url: `/api/queen-offer/get/all/by-status/Active?limit=${queenLimit}&skip=0`,
      dispatch: queensOfferDispatch,
      action: GET_ACTIVE_QUEENSOFFER,
      check: activeQueensOffer,
    },
    {
      url: `/api/queen-offer/get/all/by-status/Expired?limit=${queenLimit}&skip=0`,
      dispatch: queensOfferDispatch,
      action: GET_EXPIRED_QUEENSOFFER,
      check: expiredQueensOffer,
    },
    {
      url: `/api/queen-offer/get/all/by-status/Deleted?limit=${queenLimit}&skip=0`,
      dispatch: queensOfferDispatch,
      action: GET_DELETED_QUEENSOFFER,
      check: deletedQueensOffer,
    },
  ];

  useEffect(() => {
    urls.forEach((item) => {
      const { url, action, dispatch, check } = item;
      if (!check.total) {
        setFetching();
        (async function () {
          const { data } = await fetcher.get({
            url: url,
          });
          dispatch({
            type: action,
            payload: { data: data.data, total: data.total },
          });
          setFetching(false);
        })();
      }
    });
  }, []);

  const cards = [
    {
      id: 1,
      length: activeQueensOffer.total,
      field: "Active ME's offer",
      path: '/me-offer/all?type=active',
    },
    {
      id: 2,
      length: expiredQueensOffer.total,
      field: "Expired ME's offer",
      path: '/me-offer/all?type=expired',
    },
    {
      id: 3,
      length: deletedQueensOffer.total,
      field: "Deleted ME's offer",
      path: '/me-offer/all?type=deleted',
    },
  ];

  const lists = [
    { data: activeQueensOffer.data, title: 'Active', path: 'active' },
    { data: expiredQueensOffer.data, title: 'Expired', path: 'expired' },
    { data: deletedQueensOffer.data, title: 'Deleted', path: 'deleted' },
  ];

  return (
    <div className='content'>
      <main>
        <div className='link-container'>
          <p className='dis-link'>{pathname}</p>
        </div>
        <h1 className='page-header-title'>
          ME's offer list Overview{' '}
          <button
            onClick={() =>
              adminDispatch({
                type: SHOW_MODAL,
                payload: {
                  modal: "Create ME's Offer",
                  queensOfferDispatch,
                },
              })
            }
            className='button'
          >
            Create New Offer
          </button>{' '}
          <Link className='button' to='/me-offer/all'>
            All ME's offer
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
                    <h3>{title} ME's offer</h3>
                    <Link to={`/me-offer/all?type=${path}`}>See All</Link>
                  </div>
                  <div className='card-body'>
                    {!fetching ? (
                      <>
                        {data ? (
                          <>
                            {data.slice(0, 5).map((item) => {
                              const { id, banner, title, status, end_date } =
                                item;
                              return (
                                <div key={id} className='customer'>
                                  <Link to={`/me-offer/details/${id}`}>
                                    <div className='info'>
                                      <img
                                        src={`${url}/get/image/queens_offer/${banner}`}
                                        width='40px'
                                        height='40px'
                                        alt='queen'
                                      />
                                      <div>
                                        <div
                                          style={{
                                            display: 'flex',
                                            gap: '5px',
                                          }}
                                        >
                                          <h4>
                                            {title} OTW-QO{id}
                                          </h4>
                                          <small>({status})</small>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                          <h4>End Date: </h4>
                                          <small>
                                            {moment(end_date).format(
                                              'DD/MM/YYYY'
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
                          <h3 className='spinner'>No {title} ME</h3>
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
export default QueensOffer;
