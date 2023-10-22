import { set } from 'lodash';
import React, { useRef, useState } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { useAdminContext } from '../../../contexts/adminContext';
import { HIDE_MODAL, url } from '../../../helpers/constants';
import fetcher from '../../../helpers/fetchApi';

const UpdateQueensOffer = ({ data }) => {
  const [updateBanner, setUpdateBanner] = useState(null);
  const {
    banner,
    details,
    status,
    title,
    id,
    setOffers,
    created_date,
    end_date,
  } = data;

  const { dispatch: adminDispatch } = useAdminContext();

  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    if (updateBanner) {
      formData.append('photo', updateBanner);
    } else {
      formData.append('banner', banner);
    }

    const { data } = await fetcher.put({
      url: `/api/queen-offer/update/offer/${id}`,
      body: formData,
    });

    if (data.success) {
      let formValue = Object.fromEntries(formData.entries());

      setOffers({
        ...formValue,
        id,
        created_date,
        end_date,
      });

      adminDispatch({ type: HIDE_MODAL });
    }
  };
  return (
    <div>
      <div className='form-image-containers'>
        <div className='form-image-container'>
          {updateBanner ? (
            <img
              className='form-image'
              src={URL.createObjectURL(updateBanner)}
              alt=''
            />
          ) : (
            <img
              className='form-image'
              src={`${url}/get/image/queens_offer/${banner}`}
              alt=''
            />
          )}
          <label htmlFor='queenDp' className='form-image-edit'>
            <RiImageEditFill />
            <input
              style={{ display: 'none' }}
              type='file'
              id='queenDp'
              accept='.jpg, .png, .jpeg'
              onChange={(e) => setUpdateBanner(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} ref={formRef}>
        <div className='first-row'>
          <label htmlFor='title'>
            <span>Title</span>
            <input
              type='text'
              id='title'
              name='title'
              placeholder='Title'
              style={{ width: 'auto' }}
              defaultValue={title}

              // onChange={(e) =>
              //   dispatch({
              //     type: SET_SINGLE_VALUE,
              //     payload: { field: 'product_name', value: e.target.value },
              //   })
              // }
            />
          </label>

          <label htmlFor='status'>
            <span>Status</span>
            <select
              id='status'
              name='status'
              style={{ width: 'auto' }}
              defaultValue={status}

              // onChange={(e) =>
              //   dispatch({
              //     type: SET_SINGLE_VALUE,
              //     payload: { field: 'status', value: e.target.value },
              //   })
              // }
            >
              <option value='active'>Active</option>
              <option value='expired'>Expired</option>
              <option value='deleted'>Deleted</option>
            </select>
          </label>

          <label htmlFor='details'>
            <span>Details</span>
            <input
              type='text'
              id='details'
              name='details'
              placeholder='Details'
              style={{ width: 'auto' }}
              defaultValue={details}

              // onChange={(e) =>
              //   dispatch({
              //     type: SET_SINGLE_VALUE,
              //     payload: { field: 'weight', value: e.target.value },
              //   })
              // }
            />
          </label>
        </div>

        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default UpdateQueensOffer;
