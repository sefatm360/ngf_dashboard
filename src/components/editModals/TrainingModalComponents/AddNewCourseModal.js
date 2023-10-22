import React, { useState, useEffect, useReducer } from 'react';
import fetcher from '../../../helpers/fetchApi';
import { RiImageEditFill } from 'react-icons/ri';
import { SET_SINGLE_VALUE } from '../editModalConstants';
import reducer from '../editModalReducers/modalReducer';
import { HIDE_MODAL } from '../../../helpers/constants';
import { useAdminContext } from '../../../contexts/adminContext';

const AddNewCourseModal = ({ data, setUpdateSpinner }) => {
  const { trainings, setTrainings } = data;
  const [coursePic, setCoursePic] = useState(null);
  const { dispatch: adminDispatch } = useAdminContext();
  const [trainers, setTrainers] = useState([]);
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: '/otw-training/api/trainer/get/all',
      });
      if (data.success) {
        setTrainers(data.data);
      }
    })();
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(state).forEach((item) => {
      formData.append(item, state[item]);
    });
    formData.append('thumbnail', coursePic);

    if (coursePic) {
      setUpdateSpinner(true);
      const { data } = await fetcher.post({
        url: '/otw-training/api/training/create-or-update',
        body: formData,
      });

      if (data.success) {
        setTrainings([
          {
            ...state,
            ...data.data,
            thumbnail: data.data.thumbnail,
            status: 'Upcoming',
          },
          ...trainings,
        ]);
        setUpdateSpinner(false);
        adminDispatch({ type: HIDE_MODAL });
      } else {
        setUpdateSpinner(false);
      }
    } else {
      alert('Please select course thumbnail first');
    }
  };

  return (
    <div>
      <span className='mb-2 d-inline'>Add Training thumbnail</span>
      <div
        className={
          coursePic
            ? ' form-image-containers '
            : 'form-image-containers upload-course-thumnail'
        }
      >
        <div className='form-image-container'>
          {coursePic && (
            <img
              className='form-image'
              src={URL.createObjectURL(coursePic)}
              alt=''
            />
          )}
          <label htmlFor='file1' className='form-image-edit '>
            <RiImageEditFill />
            <input
              style={{ display: 'none' }}
              type='file'
              id='file1'
              accept='.jpg, .png, .jpeg'
              onChange={(e) => setCoursePic(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <form onSubmit={handleAddCourse}>
        <div className='first-row'>
          <label htmlFor='course_title'>
            <span>Training Title</span>
            <input
              type='text'
              id='course_title'
              name='course_title'
              placeholder='Training Title'
              style={{ width: 'auto' }}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'title', value: e.target.value },
                })
              }
              required
            />
          </label>

          <label htmlFor='trainer_id'>
            <span>Select Trainer</span>
            <select
              id='trainer_id'
              name='trainer_id'
              style={{ width: 'auto' }}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'trainer_id', value: e.target.value },
                })
              }
              defaultValue=''
              required
            >
              <option value='' disabled hidden>
                Choose Trainer
              </option>
              {trainers.map((trainer) => {
                const { id, name } = trainer;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </label>

          <label htmlFor='start_date'>
            <span>Training Date</span>
            <input
              required
              type='date'
              id='start_date'
              name='start_date'
              placeholder='Course Date'
              style={{ width: 'auto' }}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'training_date', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='course_desc'>
            <span>Description</span>
            <textarea
              required
              id='course_desc'
              name='course_desc'
              rows='10'
              cols='70'
              placeholder='Description'
              style={{ width: 'auto' }}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'details', value: e.target.value },
                })
              }
            />
          </label>
          <label htmlFor='topics'>
            <span>Topics</span>
            <textarea
              required
              id='topics'
              name='topics'
              rows='7'
              cols='50'
              placeholder='Training Topics'
              style={{ width: 'auto' }}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'topics', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='training_time'>
            <span>Training Time</span>
            <input
              required
              type='time'
              id='training_time'
              name='training_time'
              placeholder='Training Time'
              style={{ width: 'auto' }}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'time', value: e.target.value },
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

export default AddNewCourseModal;
