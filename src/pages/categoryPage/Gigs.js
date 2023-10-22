import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cards from '../../components/Cards';
import GigLists from '../../components/listsComponents/GigLists';
import { useGigContext } from '../../contexts/gigContext';
import {
  FETCH_APPROVED_GIG_SUCCESS,
  FETCH_PENDING_GIG_SUCCESS,
  FETCH_REJECTED_GIG_SUCCESS,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
const limit = 10;
const Gigs = () => {
  const {
    pendingGigs,
    approvedGigs,
    rejectedGigs,
    dispatch: gigsDispatch,
  } = useGigContext();
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();

  const urls = [
    {
      url: `/out/api/gig/get/pending/all?limit=${limit}&skip=0`,
      data: pendingGigs,
      dispatch: gigsDispatch,
      action: FETCH_PENDING_GIG_SUCCESS,
    },
    {
      url: `/out/api/gig/get/approved/all?limit=${limit}&skip=0`,
      data: approvedGigs,
      dispatch: gigsDispatch,
      action: FETCH_APPROVED_GIG_SUCCESS,
    },
    {
      url: `/out/api/gig/get/rejected/all?limit=${limit}&skip=0`,
      data: rejectedGigs,
      dispatch: gigsDispatch,
      action: FETCH_REJECTED_GIG_SUCCESS,
    },
  ];

  useEffect(() => {
    urls.forEach((item) => {
      (async function () {
        const { data, url, dispatch, action } = item;
        if (!data.total) {
          setIsLoading(true);
          const { data } = await fetcher.get({
            url: url,
          });
          dispatch({ type: action, payload: data });
          setIsLoading(false);
        }
      })();
    });
  }, []);

  const cards = [
    {
      id: 1,
      length: pendingGigs.total,
      field: 'Pending Gigs',
      path: '/gigs/all?type=pending',
    },
    {
      id: 2,
      length: approvedGigs.total,
      field: 'Approved Gigs',
      path: '/gigs/all?type=approved',
    },
    {
      id: 3,
      length: rejectedGigs.total,
      field: 'Rejected Gigs',
      path: '/gigs/all?type=rejected',
    },
  ];

  const lists = [
    { data: pendingGigs, title: 'Pending', path: 'all?type=pending' },
    { data: approvedGigs, title: 'Approved', path: 'all?type=approved' },
    { data: rejectedGigs, title: 'Rejected', path: 'all?type=rejected' },
  ];

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div className='link-container'>
            <p className='dis-link'>{pathname}</p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h1>All Gigs Page</h1>
              <Link className='button' to='/gigs/all'>
                All Gigs
              </Link>
            </div>
            <Link to='/gigs/add-skills' className='button'>
              Category and Skills
            </Link>
          </div>
          <div className='cards orderpage'>
            <Cards cards={cards} fetching={isLoading} />
          </div>
          {lists.map((item) => {
            return (
              <GigLists
                fetching={isLoading}
                data={item.data}
                title={item.title}
                path={item.path}
                key={item.title}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default Gigs;
