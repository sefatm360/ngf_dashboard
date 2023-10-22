import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Cards from '../../components/Cards';
import OffersLists from '../../components/listsComponents/OffersLists';
import { useOfferContext } from '../../contexts/offerContext';
import { FETCH_OFFERS_SUCCESS } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import lib from '../../helpers/utils';

const Offers = () => {
  const { pathname } = useLocation();
  const { offers, dispatch: offersDispatch } = useOfferContext();
  const [offersList, setOffersList] = useState(offers);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    (async function () {
      // if Offers are not already fetched in the dashboard page then fetch from here
      if (offers.length < 1) {
        setFetching(true);
        const { data } = await fetcher.get({
          url: `/api/admin/offers/get/all`,
        });
        offersDispatch({ type: FETCH_OFFERS_SUCCESS, payload: data.data });
        setFetching(false);
      } else {
        return;
      }
    })();
  }, [offers.length, offersDispatch]);

  useEffect(() => {
    setOffersList(offers);
  }, [offers]);

  const { approved, pending, rejected } = lib.separate(offersList);

  const cards = [
    { id: 1, data: pending, field: 'Pending Offers', path: '/offers/pending' },
    {
      id: 2,
      data: approved,
      field: 'Approved Offers',
      path: '/offers/approved',
    },
    {
      id: 3,
      data: rejected,
      field: 'Rejected Offers',
      path: '/offers/rejected',
    },
  ];

  const lists = [
    { data: pending, title: 'Pending', path: 'pending' },
    { data: approved, title: 'Approved', path: 'approved' },
    { data: rejected, title: 'Rejected', path: 'rejected' },
  ];

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div className='link-container'>
            <p className='dis-link'>{pathname}</p>
          </div>
          <h1>Offers Page</h1>
          <div className='cards orderpage'>
            <Cards cards={cards} fetching={fetching} />
          </div>
          {lists.map((item) => {
            return (
              <OffersLists
                fetching={fetching}
                data={item.data}
                title={item.title}
                key={item.title}
                path={item.path}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default Offers;
