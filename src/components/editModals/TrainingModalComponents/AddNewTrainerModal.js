import React, { useState, useReducer, useEffect } from 'react';
import fetcher from '../../../helpers/fetchApi';
import { SET_SINGLE_VALUE } from '../editModalConstants';
import reducer from '../editModalReducers/modalReducer';
import { HIDE_MODAL } from '../../../helpers/constants';
import { useAdminContext } from '../../../contexts/adminContext';

const AddNewTrainerModal = ({ data, setUpdateSpinner }) => {
  const { trainers, setTrainers } = data;
  const [institutes, setInstitutes] = useState([]);
  const { dispatch: adminDispatch } = useAdminContext();
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: '/otw-training/api/institute/get/all',
      });
      if (data.success) {
        setInstitutes(data.data);
      }
    })();
  }, []);

  const handleTrainerSubmit = async (e) => {
    e.preventDefault();
    setUpdateSpinner(true);
    const formData = new FormData();
    Object.keys(state).forEach((item) => {
      formData.append(item, state[item]);
    });
    const { data } = await fetcher.post({
      url: '/otw-training/api/auth/trainer/create-trainer',
      body: formData,
    });

    setUpdateSpinner(false);
    if (data.success) {
      setTrainers([...trainers, data.data]);
      adminDispatch({ type: HIDE_MODAL });
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <div className='new-trainer-modal'>
        <form onSubmit={handleTrainerSubmit}>
          <div className='first-row'>
            <label htmlFor='trainer_name'>
              <span>Trainer Name</span>
              <input
                type='text'
                id='trainer_name'
                name='trainer_name'
                placeholder='Trainer Name'
                style={{ width: 'auto' }}
                onChange={(e) =>
                  dispatch({
                    type: SET_SINGLE_VALUE,
                    payload: { field: 'name', value: e.target.value },
                  })
                }
                required
              />
            </label>

            <label htmlFor='inst_id'>
              <span>Select Institute</span>
              <select
                id='inst_id'
                name='inst_id'
                style={{ width: 'auto' }}
                onChange={(e) =>
                  dispatch({
                    type: SET_SINGLE_VALUE,
                    payload: { field: 'inst_id', value: e.target.value },
                  })
                }
                defaultValue=''
                required>
                <option value='' disabled hidden>
                  Choose Institute
                </option>
                {institutes.map((institute) => {
                  const { id, inst_name } = institute;
                  return (
                    <option title={inst_name} key={id} value={id}>
                      {inst_name.slice(0, 30)}
                      {inst_name.length > 30 && '...'}
                    </option>
                  );
                })}
              </select>
            </label>

            <label htmlFor='phone'>
              <span>Phone</span>
              <input
                required
                type='number'
                id='phone'
                name='phone'
                placeholder="Trainer's Phone"
                style={{ width: 'auto' }}
                onChange={(e) =>
                  dispatch({
                    type: SET_SINGLE_VALUE,
                    payload: { field: 'phone', value: e.target.value },
                  })
                }
              />
            </label>

            <label htmlFor='password'>
              <span>Account password</span>
              <input
                required
                type='text'
                id='password'
                name='password'
                placeholder='password'
                style={{ width: 'auto' }}
                onChange={(e) =>
                  dispatch({
                    type: SET_SINGLE_VALUE,
                    payload: { field: 'password', value: e.target.value },
                  })
                }
              />
            </label>

            <label htmlFor='email'>
              <span>Trainer's Email</span>
              <input
                required
                type='email'
                id='email'
                name='email'
                placeholder="Trainer's Email"
                style={{ width: 'auto' }}
                onChange={(e) =>
                  dispatch({
                    type: SET_SINGLE_VALUE,
                    payload: { field: 'email', value: e.target.value },
                  })
                }
              />
            </label>
            <label htmlFor='specialist'>
              <span>Trainer's Skills</span>
              <input
                required
                type='text'
                id='specialist'
                name='specialist'
                placeholder='Trainer skills'
                style={{ width: 'auto' }}
                onChange={(e) =>
                  dispatch({
                    type: SET_SINGLE_VALUE,
                    payload: { field: 'specialist', value: e.target.value },
                  })
                }
              />
            </label>
            <label htmlFor='photo'>
              <span>Trainer Photo</span>
              <input
                required
                type='file'
                id='photo'
                name='photo'
                style={{ width: 'auto' }}
                onChange={(e) =>
                  dispatch({
                    type: SET_SINGLE_VALUE,
                    payload: {
                      field: 'photo',
                      value: e.target.files[0],
                    },
                  })
                }
              />
            </label>
            <label htmlFor='cv'>
              <span>Trainer's CV</span>
              <input
                type='file'
                id='cv'
                name='cv'
                placeholder="Trainer's CV"
                style={{ width: 'auto' }}
                onChange={(e) =>
                  dispatch({
                    type: SET_SINGLE_VALUE,
                    payload: { field: 'cv', value: e.target.files[0] },
                  })
                }
              />
            </label>
            <label htmlFor='certificate'>
              <span>Trainer certificate</span>
              <input
                type='file'
                id='certificate'
                name='certificate'
                style={{ width: 'auto' }}
                onChange={(e) =>
                  dispatch({
                    type: SET_SINGLE_VALUE,
                    payload: {
                      field: 'certificate',
                      value: e.target.files[0],
                    },
                  })
                }
              />
            </label>
            <label htmlFor='nid_front'>
              <span>NID Front</span>
              <input
                type='file'
                id='nid_front'
                name='nid_front'
                style={{ width: 'auto' }}
                onChange={(e) =>
                  dispatch({
                    type: SET_SINGLE_VALUE,
                    payload: {
                      field: 'nid_front',
                      value: e.target.files[0],
                    },
                  })
                }
              />
            </label>
            <label htmlFor='nid_back'>
              <span>NID Back</span>
              <input
                type='file'
                id='nid_back'
                name='nid_back'
                style={{ width: 'auto' }}
                onChange={(e) =>
                  dispatch({
                    type: SET_SINGLE_VALUE,
                    payload: {
                      field: 'nid_back',
                      value: e.target.files[0],
                    },
                  })
                }
              />
            </label>
          </div>
          <input type='submit' value='Submit' />
        </form>
      </div>
    </div>
  );
};

export default AddNewTrainerModal;
