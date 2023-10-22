import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetcher from '../../helpers/fetchApi';
import QueensOfferPage from '../SearhContentPage/QueensOfferPage';
const SeeAllQueensOffer = () => {
  const params = new URLSearchParams(document.location.search);
  const type = params.get('type');
  const [Offer, setQueensOffer] = useState({ queensOffer: [], total: 0 });

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: `/api/queen-offer/get/all/by-status/${type}?limit=100&skip=0`,
      });

      setQueensOffer({
        queensOffer: data.data,
        total: data.total,
      });
    })();
  }, []);

  return (
    <div className='content'>
      <main>
        <div>
          <h1 className='mt-0 ml-0'>All {type} ME's offer:</h1>

          {
            <div>
              {Offer.total === 0 ? (
                <h1 className='text-center mt-5 not-found'>
                  No ME's Offer Found !!Please try again
                </h1>
              ) : (
                <div>
                  {Offer.queensOffer?.map((offer, index) => (
                    <Link
                      key={offer.id}
                      className='single-table-link'
                      to={`/me-offer/details/${offer.id}`}
                    >
                      <QueensOfferPage offer={offer} serial={index + 1} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          }
        </div>
      </main>
    </div>
  );
};

export default SeeAllQueensOffer;
