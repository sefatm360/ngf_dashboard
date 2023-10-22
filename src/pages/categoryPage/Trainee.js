import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cards from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { useQueenContext } from '../../contexts/queenContext';
import { useTraineeContext } from '../../contexts/traineeContext';
import {
  FETCH_APPROVED_QUEEN,
  FETCH_APPROVED_TRAINEE,
  FETCH_PENDING_QUEEN,
  FETCH_PENDING_TRAINEE,
  FETCH_REJECTED_QUEEN,
  FETCH_REJECTED_TRAINEE,
  url,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const Trainee = () => {
  const { pathname } = useLocation();

  const {
    approvedTrainee,
    pendingTrainee,
    rejectedTrainee,
    dispatch: traineeDispatch,
  } = useTraineeContext();

  const [fetching, setFetching] = useState(false);
  const traineeLimit = 10;

  const urls = [
    {
      url: `/otw-training/api/trainee/get/all/by-status/pending?limit=${traineeLimit}&skip=0`,
      dispatch: traineeDispatch,
      action: FETCH_PENDING_TRAINEE,
      check: pendingTrainee,
    },
    {
      url: `/otw-training/api/trainee/get/all/by-status/approved?limit=${traineeLimit}&skip=0`,
      dispatch: traineeDispatch,
      action: FETCH_APPROVED_TRAINEE,
      check: approvedTrainee,
    },
    {
      url: `/otw-training/api/trainee/get/all/by-status/rejected?limit=${traineeLimit}&skip=0`,
      dispatch: traineeDispatch,
      action: FETCH_REJECTED_TRAINEE,
      check: rejectedTrainee,
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
      length: pendingTrainee.total,
      field: 'Pending Trainee',
      path: '/trainee/all?type=pending',
    },
    {
      id: 2,
      length: approvedTrainee.total,
      field: 'Approved Trainee',
      path: '/trainee/all?type=approved',
    },
    {
      id: 3,
      length: rejectedTrainee.total,
      field: 'Rejected Trainee',
      path: '/trainee/all?type=rejected',
    },
  ];

  const lists = [
    { data: pendingTrainee.data, title: 'Pending', path: 'pending' },
    { data: approvedTrainee.data, title: 'Approved', path: 'approved' },
    { data: rejectedTrainee.data, title: 'Rejected', path: 'rejected' },
  ];

  return (
    <>
      <div className='content'>
        <main>
          <div className='link-container'>
            <p className='dis-link'>{pathname}</p>
          </div>
          <h1 className='page-header-title'>
            Trainee list Overview
            <Link className='button' to='/trainee/all'>
              All Trainee
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
                      <h3>{title} Trainee</h3>
                      <Link to={`/trainee/all?type=${path}`}>See All</Link>
                    </div>
                    <div className='card-body'>
                      {!fetching ? (
                        <>
                          {data ? (
                            <>
                              {data.slice(0, 5).map((item, index) => {
                                const { id, photo, name, phone, division } =
                                  item;
                                return (
                                  <div key={id} className='customer'>
                                    <Link to={`/trainee/details/${id}`}>
                                      <div className='info'>
                                        <span style={{ marginRight: '10px' }}>
                                          {index + 1}
                                        </span>

                                        {photo ? (
                                          <img
                                            src={`${url}/get/image/training_trainee_files/${photo}`}
                                            width='40px'
                                            height='40px'
                                            alt=''
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
                                              {name} OTWT-T{id}
                                            </h4>
                                            <small>({phone})</small>
                                          </div>
                                          <div style={{ display: 'flex' }}>
                                            <h4>division: </h4>
                                            <small>{division}</small>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <h3 className='spinner'>No {title} Trainee</h3>
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
    </>
  );
};
export default Trainee;
