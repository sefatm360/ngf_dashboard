import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAdminContext } from '../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const QueensOfferDetails = () => {
  const { id } = useParams();
  const [offers, setOffers] = useState({});

  const { dispatch: adminDispatch } = useAdminContext();

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: `/api/queen-offer/get/single/${id}`,
      });

      setOffers(data.data);
    })();
  }, [id]);

  const { title, banner, created_date, end_date, details, status, photo } =
    offers;

  const handleClick = () => {
    adminDispatch({
      type: SHOW_MODAL,
      payload: { ...offers, modal: `Update ME's Offer`, setOffers },
    });
  };

  return (
    <div className='content'>
      <main>
        <div className='details-offer-content'>
          <h1 className='mb-2'>{title}</h1>
          <div className='details-offer-box'>
            <div>
              {photo ? (
                <img
                  className='form-image'
                  src={URL.createObjectURL(photo)}
                  alt=''
                />
              ) : (
                <img
                  className='w-100 offer-image'
                  src={`${url}/get/image/queens_offer/${banner}`}
                  alt=''
                />
              )}

              <div className='d-flex justify-content-between mt-2'>
                <div>
                  <h3>
                    Created date:{' '}
                    <small style={{ color: '#201f1f' }}>
                      {created_date?.split('T')[0]}
                    </small>
                  </h3>
                  <h3>Status: {status}</h3>
                </div>
                <h3>
                  End date:
                  <small style={{ color: '#201f1f' }}>
                    {end_date?.split('T')[0]}
                  </small>
                </h3>
              </div>
              <button
                className='edit-btn mt-5'
                type='button'
                onClick={handleClick}
              >
                Edit
              </button>
            </div>
            <div className='ml-4'>
              <p className='mt-2'>{details}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QueensOfferDetails;
