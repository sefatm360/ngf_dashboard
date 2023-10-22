import React, { useEffect, useReducer, useState } from 'react';
import { useAdminContext } from '../../contexts/adminContext';
import { useOfferContext } from '../../contexts/offerContext';
import { HIDE_MODAL, SET_UPDATED_OFFER } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import { SET_INITIAL_STATE, SET_SINGLE_VALUE } from './editModalConstants';
import reducer from './editModalReducers/modalReducer';

const OfferEditModal = ({ data, setUpdateSpinner }) => {
  const { setOffer, dispatch: offerDispatch } = useOfferContext();
  const { dispatch: adminDispatch } = useAdminContext();

  const initialState = data;

  const [state, dispatch] = useReducer(reducer, initialState);

  const { id, exp_date, offer_desc, offer_type, status } = state;

  const [date, setDate] = useState(exp_date);

  useEffect(() => {
    dispatch({ type: SET_INITIAL_STATE, payload: data });
  }, [data]);

  useEffect(() => {
    setDate(exp_date?.split('T')[0]);
  }, [exp_date]);

  const handleSubmit = async (e) => {
    setUpdateSpinner(true);
    e.preventDefault();

    const response = await fetcher.put({
      url: `/api/admin/offers/update/${id}`,
      cType: 'application/json',
      body: { exp_date: date, offer_desc, offer_type, status },
    });

    if (response) {
      setUpdateSpinner(false);
      adminDispatch({ type: HIDE_MODAL });
    }

    setOffer(response.data.data);
    offerDispatch({ type: SET_UPDATED_OFFER, payload: response.data.data });
  };

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  return !status ? null : (
    <>
      <form onSubmit={handleSubmit}>
        <div className='first-row'>
          <label htmlFor='offerType'>
            <span>Offer Type</span>
            <input
              type='text'
              id='offerType'
              name='offerType'
              placeholder='Offer Type'
              style={{ width: 'auto' }}
              value={offer_type}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'offer_type', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='expDate'>
            <span>Expiration Date</span>
            <input
              type='date'
              name='expDate'
              id='expDate'
              style={{ width: 'auto' }}
              className='date-picker'
              onChange={handleChange}
              defaultValue={date}
            />
          </label>
          <label htmlFor='status'>
            <span>Status</span>
            <select
              id='status'
              name='status'
              style={{ width: 'auto' }}
              value={status}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'status', value: e.target.value },
                })
              }
            >
              <option value='Approved'>Approved</option>
              <option value='Pending'>Pending</option>
              <option value='Rejected'>Rejected</option>
            </select>
          </label>
        </div>
        <label htmlFor='desc'>
          <p>Offer Description</p>
          <textarea
            type='text'
            id='desc'
            name='desc'
            rows='5'
            cols='50'
            placeholder='Offer Description'
            style={{ width: '100%' }}
            value={offer_desc}
            onChange={(e) =>
              dispatch({
                type: SET_SINGLE_VALUE,
                payload: { field: 'offer_desc', value: e.target.value },
              })
            }
          />
        </label>
        <input type='submit' value='Submit' />
      </form>
    </>
  );
};

export default OfferEditModal;
