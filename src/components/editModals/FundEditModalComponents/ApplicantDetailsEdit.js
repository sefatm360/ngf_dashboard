import React, { useReducer, useEffect } from 'react';
import { useAdminContext } from '../../../contexts/adminContext';
import { HIDE_MODAL } from '../../../helpers/constants';
import fetcher from '../../../helpers/fetchApi';
import { SET_INITIAL_STATE, SET_SINGLE_VALUE } from '../editModalConstants';
import reducer from '../editModalReducers/modalReducer';

const ApplicantDetailsEdit = ({
  data,
  setUpdateSpinner,
  setFundDetails,
  fundId,
}) => {
  const { dispatch: adminDispatch } = useAdminContext();
  const [state, dispatch] = useReducer(reducer, data);

  useEffect(() => {
    dispatch({ type: SET_INITIAL_STATE, payload: data });
  }, [data]);

  const {
    queen_id,
    nid_number,
    dob,
    guardian_name,
    guardian_type,
    why,
    amount,
    return_time,
    return_type,
    status,
  } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSpinner(true);
    const fundInfo = {
      queen_id,
      nid_number: state.nid_number,
      dob: state.dob.split('T')[0],
      guardian_name: state.guardian_name,
      guardian_type: state.guardian_type,
      why: state.why,
      amount: state.amount,
      return_time: state.return_time,
      return_type: state.return_type,
      status: state.status,
    };

    const response = await fetcher.put({
      url: `/api/admin/fund/update/info/${fundId}`,
      cType: 'application/json',
      body: fundInfo,
    });
    if (response.data.success) {
      setUpdateSpinner(false);
      setFundDetails(state);
      adminDispatch({ type: HIDE_MODAL });
    } else {
      setUpdateSpinner(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='first-row'>
          <label htmlFor='nid_number'>
            <span>Nid Number</span>
            <input
              type='text'
              id='nid_number'
              name='nid_number'
              placeholder='NID Number'
              style={{ width: 'auto' }}
              defaultValue={nid_number}
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

          <label htmlFor='return_time'>
            <span>Return Time (Month)</span>
            <select
              id='return_time'
              name='return_time'
              style={{ width: 'auto' }}
              value={return_time}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'return_time',
                    value: e.target.value,
                  },
                })
              }
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
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
                  payload: {
                    field: 'status',
                    value: e.target.value,
                  },
                })
              }
            >
              <option value='Approved'>Approved</option>
              <option value='Pending'>Pending</option>
              <option value='Rejected'>Rejected</option>
            </select>
          </label>

          <label htmlFor='return_type'>
            <span>Return Type</span>
            <select
              id='return_type'
              name='return_type'
              style={{ width: 'auto' }}
              value={return_type}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'return_type',
                    value: e.target.value,
                  },
                })
              }
            >
              <option value='Fund'>Fund</option>
              <option value='Product'>Product</option>
            </select>
          </label>

          <label htmlFor='amount'>
            <span>Amount(tk)</span>
            <input
              type='text'
              id='amount'
              name='amount'
              placeholder='Amount'
              style={{ width: 'auto' }}
              value={amount}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'amount',
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

          <label htmlFor='guardian_name'>
            <span>Guardian Name</span>
            <input
              type='text'
              id='guardian_name'
              name='guardian_name'
              placeholder='Guardian Name'
              style={{ width: 'auto' }}
              value={guardian_name}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'guardian_name',
                    value: e.target.value,
                  },
                })
              }
            />
          </label>

          <label htmlFor='guardian_type'>
            <span>Relation With Guardian</span>
            <select
              type='text'
              id='guardian_type'
              name='guardian_type'
              value={guardian_type}
              placeholder='Relation With Guardian'
              style={{ width: 'auto' }}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'guardian_type',
                    value: e.target.value,
                  },
                })
              }
            >
              <option value='Father'>Father</option>
              <option value='Husband'>Husband</option>
            </select>
          </label>

          <label htmlFor='why'>
            <span>Fund Reason</span>
            <textarea
              id='why'
              name='why'
              rows='5'
              cols='50'
              placeholder='Fund Reason'
              style={{ width: 'auto' }}
              value={why}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'why',
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

export default ApplicantDetailsEdit;
