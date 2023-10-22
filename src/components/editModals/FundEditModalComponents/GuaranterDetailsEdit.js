import React, { useState, useReducer, useEffect } from 'react';
import { HIDE_MODAL, url } from '../../../helpers/constants';
import { RiImageEditFill } from 'react-icons/ri';
import { useAdminContext } from '../../../contexts/adminContext';
import reducer from '../editModalReducers/modalReducer';
import fetcher from '../../../helpers/fetchApi';
import { SET_INITIAL_STATE, SET_SINGLE_VALUE } from '../editModalConstants';

const GuaranterDetailsEdit = ({
  data,
  fundId,
  setUpdateSpinner,
  setFundDetails,
}) => {
  const [guaranterDp, setGuaranterDp] = useState(null);
  const { dispatch: adminDispatch } = useAdminContext();
  const [state, dispatch] = useReducer(reducer, data.fund_guaranter);

  useEffect(() => {
    dispatch({ type: SET_INITIAL_STATE, payload: data.fund_guaranter });
  }, [data]);

  const {
    address,
    dob,
    name,
    nid_number,
    phone,
    photo,
    relation,
    guaranter_id,
    nid_back,
    nid_front,
  } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSpinner(true);
    const guaranterInfo = {
      name: state.name,
      nid_number: state.nid_number,
      dob: state.dob.split('T')[0],
      phone: state.phone,
      address: state.address,
      relation: state.relation,
    };
    const formData = new FormData();
    Object.keys(guaranterInfo).forEach((item) => {
      formData.append(item, guaranterInfo[item]);
    });
    if (guaranterDp) {
      formData.append('photo', guaranterDp);
    }

    const response = await fetcher.post({
      url: `/api/fund/update/guaranter/${fundId} `,
      body: formData,
    });
    if (response.data.success) {
      setUpdateSpinner(false);

      setFundDetails({
        ...data,
        fund_guaranter: {
          ...guaranterInfo,
          guaranter_id,
          nid_front,
          nid_back,
          photo: response.data.g_photo || state.photo,
        },
      });
      adminDispatch({ type: HIDE_MODAL });
    } else {
      setUpdateSpinner(false);
    }
  };
  return (
    <div>
      <div className='form-image-containers'>
        <div className='form-image-container'>
          {guaranterDp ? (
            <img
              className='form-image'
              src={URL.createObjectURL(guaranterDp)}
              alt=''
            />
          ) : (
            <img
              className='form-image'
              src={`${url}/get/image/guaranters/${photo}`}
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
              onChange={(e) => setGuaranterDp(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='first-row'>
          <label htmlFor='name'>
            <span>Guarenter Name</span>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Guarenter Name'
              style={{ width: 'auto' }}
              value={name}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'name',
                    value: e.target.value,
                  },
                })
              }
            />
          </label>

          <label htmlFor='nid_number'>
            <span>Guaranter NID</span>
            <input
              type='text'
              id='nid_number'
              name='nid_number'
              placeholder='Guaranter NID'
              style={{ width: 'auto' }}
              value={nid_number}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'nid_number',
                    value: e.target.value,
                  },
                })
              }
            />
          </label>

          <label htmlFor='dob'>
            <span>Date of Birth</span>
            <input
              type='date'
              id='dob'
              name='dob'
              placeholder='Date of Birth'
              style={{ width: 'auto' }}
              value={dob.split('T')[0]}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'dob',
                    value: e.target.value,
                  },
                })
              }
            />
          </label>

          <label htmlFor='address'>
            <span>Guaranter Address</span>
            <input
              type='text'
              id='address'
              name='address'
              placeholder='Guaranter Address'
              style={{ width: 'auto' }}
              value={address}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'address',
                    value: e.target.value,
                  },
                })
              }
            />
          </label>

          <label htmlFor='relation'>
            <span>Relation With Guardian</span>
            <select
              type='text'
              id='relation'
              name='relation'
              value={relation}
              placeholder='Relation With Guardian'
              style={{ width: 'auto' }}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'relation',
                    value: e.target.value,
                  },
                })
              }
            >
              <option value='Father'>Father</option>
              <option value='Mother'>Mother</option>
              <option value='Husband'>Husband</option>
              <option value='Brother'>Brother</option>
              <option value='Sister'>Sister</option>
            </select>
          </label>

          <label htmlFor='phone'>
            <span>Guaranter Phone</span>
            <input
              id='phone'
              name='phone'
              type='text'
              placeholder='Guaranter Phone'
              style={{ width: 'auto' }}
              value={phone}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'phone',
                    value: e.target.value,
                  },
                })
              }
            />
          </label>
        </div>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default GuaranterDetailsEdit;
