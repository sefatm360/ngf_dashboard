import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOfferContext } from '../../contexts/offerContext';
import { FETCH_OFFERS_SUCCESS } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import Spinner from '../Spinner';

const SeeAllOffers = () => {
  const { type } = useParams();
  const { offers, dispatch: offersDispatch } = useOfferContext();
  const [offersList, setOffersList] = useState(offers);
  const [filteredOffer, setFilteredOffer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = new URL(document.location).searchParams;
  const queen = parseInt(params.get('queen'));

  useEffect(() => {
    (async function () {
      // if Offers are not already fetched in the dashboard page then fetch from here
      if (offers.length < 1) {
        setIsLoading(true);
        const { data } = await fetcher.get({
          url: `/api/admin/offers/get/all`,
        });

        setOffersList(data.data);
        offersDispatch({ type: FETCH_OFFERS_SUCCESS, payload: data.data });
        setIsLoading(false);
      } else {
        return;
      }
    })();
  }, [offers.length, offersDispatch]);

  useEffect(() => {
    if (queen) {
      const typeOffers = offersList.filter(
        (offer) =>
          offer.status.toLowerCase() === type && offer.queen_id === queen
      );
      setFilteredOffer(typeOffers);
    } else {
      const typeOffers = offersList.filter(
        (offer) => offer.status.toLowerCase() === type
      );
      setFilteredOffer(typeOffers);
    }
  }, [offersList, type, queen]);

  return (
    <div className='content'>
      <main>
        {queen ? <h2>All ME's {type} Offers</h2> : <h2>All {type} Offers</h2>}

        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <>
            {filteredOffer.length === 0 ? (
              <div>
                <h3 className='spinner'>No {type} Offer</h3>
              </div>
            ) : (
              <table width='100%'>
                <thead>
                  <tr>
                    <td>Offer Type</td>
                    <td>Product Name</td>
                    <td>Offer Desc</td>
                    <td>Expiry Date</td>
                    <td>&nbsp;</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredOffer.map((item) => {
                    const {
                      id,
                      offer_desc,
                      offer_type,
                      product_name,
                      exp_date,
                    } = item;
                    return (
                      <tr key={id}>
                        <td>{offer_type}</td>
                        <td>{product_name}</td>
                        <td>{offer_desc}</td>
                        <td>{moment(exp_date).format('MMM Do YY')}</td>
                        <td>
                          <Link to={`/offers/details/${id}`}>
                            <button className='view-button'>
                              View <span className='las la-arrow-right'></span>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SeeAllOffers;
