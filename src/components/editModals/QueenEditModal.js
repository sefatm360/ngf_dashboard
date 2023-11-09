import React, { useEffect, useRef, useState } from 'react';
import { useReducer } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { useAdminContext } from '../../contexts/adminContext';
import { HIDE_MODAL, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import { SET_INITIAL_STATE, SET_SINGLE_VALUE } from './editModalConstants';
import reducer from './editModalReducers/modalReducer';
import { districts, Division } from '../../helpers/districts';

const QueenEditModal = ({ data, setUpdateSpinner }) => {
  const { queen, setQueen } = data;
  const { dispatch: adminDispatch } = useAdminContext();
  const [state, dispatch] = useReducer(reducer, queen);
  const [queenDp, setQueenDp] = useState(null);

  useEffect(() => {
    dispatch({ type: SET_INITIAL_STATE, payload: queen });
  }, [data]);

  // console.log({ divisionName });
  // console.log({ state });
  const {
    id,
    city,
    address,
    queen_category,
    email,
    name,
    photo,
    note,
    status,
    designation,
    phone,
    division,
  } = state || {};

  console.log({ state });

  const formData = new FormData();

  const cityRef = useRef();

  const handleSubmit = async (e) => {
    Object.keys(state).forEach((element) => {
      if (element === 'photo' || element === 'join_date') {
        return;
      }
      state[element] !== null && formData.append(element, state[element]);
    });
    if (queenDp) {
      formData.append('photo', queenDp);
    }

    if (cityRef.current.value) {
      formData.delete('city');
      formData.append('city', cityRef.current.value);
      state['city'] = cityRef.current.value;
    }

    setUpdateSpinner(true);
    e.preventDefault();

    const response = await fetcher.put({
      url: `/api/admin/queen/update/${id}`,
      cType: 'multipart/form-data',
      body: formData,
    });

    if (response) {
      setUpdateSpinner(false);
      adminDispatch({ type: HIDE_MODAL });
      if (response.data.success) {
        if (response.data.img) {
          state['photo'] = response.data.img;
        }

        setQueen(state);
      } else {
        alert(response.data.message);
      }
    }
  };

  return !status ? null : (
    <>
      <div className='form-image-containers'>
        <div className='form-image-container'>
          {queenDp ? (
            <img
              className='form-image'
              src={URL.createObjectURL(queenDp)}
              alt=''
            />
          ) : (
            <img
              className='form-image'
              src={`${url}/get/image/me/${photo}`}
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
              onChange={(e) => setQueenDp(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='first-row'>
          <label htmlFor='queenName'>
            <span>ME name</span>
            <input
              type='text'
              id='queenName'
              name='queenName'
              placeholder='ME Name'
              style={{ width: 'auto' }}
              value={name}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'name', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='designation'>
            <span>Designation</span>
            <input
              type='text'
              id='designation'
              name='designation'
              placeholder='ME designation'
              style={{ width: 'auto' }}
              value={designation}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'designation', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='address'>
            <span>Address</span>
            <input
              type='text'
              id='address'
              name='address'
              placeholder='Address'
              style={{ width: 'auto' }}
              value={address}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'address', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='phone'>
            <span>Phone</span>
            <input
              type='text'
              id='phone'
              name='phone'
              placeholder='phone'
              style={{ width: 'auto' }}
              value={phone}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'phone', value: parseInt(e.target.value) },
                })
              }
            />
          </label>

          <label htmlFor='email'>
            <span>Email</span>
            <input
              type='text'
              id='email'
              name='email'
              placeholder='Enter email'
              style={{ width: 'auto' }}
              value={email || ''}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'email', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='division'>
            <span>Divison</span>
            <select
              id='division'
              name='division'
              style={{ width: 'auto' }}
              onChange={(e) => {
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'division', value: e.target.value },
                });
              }}
              value={division}
            >
              {Division.map((division, index) => {
                return (
                  <option key={index} defaultValue={division}>
                    {division}
                  </option>
                );
              })}
            </select>
          </label>

          <label htmlFor='city'>
            <span>City</span>
            <select
              id='city'
              name='city'
              style={{ width: 'auto' }}
              value={city}
              ref={cityRef}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'city', value: e.target.value },
                })
              }
            >
              {districts?.map((district, index) => {
                if (district.division_name == state.division) {
                  return (
                    <option key={index} value={district.name}>
                      {district.name}
                    </option>
                  );
                }
              })}
            </select>
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
          <label htmlFor='queen_category'>
            <span>ME category</span>
            <select
              id='queen_category'
              name='queen_category'
              style={{ width: 'auto' }}
              value={queen_category}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'queen_category', value: e.target.value },
                })
              }
            >
              <option value='Food'>Food</option>
              <option value='Food and others'>Food and others</option>
              <option value='Dress'>Dress</option>
              <option value='Jewellery'>Jewellery</option>
              <option value='Jewellery'>Jewellery</option>
              <option value='Home decor'>Home decor</option>
              <option value='Others'>Others</option>
            </select>
          </label>
          <label htmlFor='note'>
            <span>Note</span>
            <textarea
              id='note'
              name='note'
              placeholder='Note'
              style={{ width: 'auto', padding: '5px' }}
              value={note || ''}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'note', value: e.target.value },
                })
              }
            ></textarea>
          </label>
        </div>

        <input type='submit' value='Submit' />
      </form>
    </>
  );
};

export default QueenEditModal;
