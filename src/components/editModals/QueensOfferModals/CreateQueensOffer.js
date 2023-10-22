import React, { useRef } from 'react';
import { useAdminContext } from '../../../contexts/adminContext';
import { HIDE_MODAL } from '../../../helpers/constants';
import fetcher from '../../../helpers/fetchApi';

const CreateQueensOffer = () => {
  const formRef = useRef();
  const { dispatch: adminDispatch } = useAdminContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const { data } = await fetcher.post({
      url: '/api/queen-offer/create/offer',
      body: formData,
    });

    if (data.success) {
      adminDispatch({
        type: HIDE_MODAL,
      });
    }
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className='d-flex'>
          <label htmlFor='title'>
            Offer Title:
            <input
              required
              name='title'
              id='title'
              className='w-100'
              type='text'
              placeholder='Enter offer title'
            />
          </label>
          <label htmlFor='end_date'>
            Expire Date:
            <input
              className='w-100'
              required
              name='end_date'
              id='end_date'
              type='date'
            />
          </label>
          <label htmlFor='photo'>
            Offer Thumbnail:
            <input required name='photo' id='photo' type='file' />
          </label>
        </div>
        <label htmlFor='details'>
          <textarea
            required
            name='details'
            id='details'
            cols='100'
            rows='10'
            placeholder='Enter the details of this offer'
          ></textarea>
        </label>
        <input required type='submit' value='submit' />
      </form>
    </div>
  );
};

export default CreateQueensOffer;
