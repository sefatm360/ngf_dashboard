import React, { useState, useEffect, useReducer, useRef } from 'react';
import fetcher from '../../../helpers/fetchApi';
import { RiImageEditFill } from 'react-icons/ri';
import { SET_INITIAL_STATE, SET_SINGLE_VALUE } from '../editModalConstants';
import reducer from '../editModalReducers/modalReducer';
import { HIDE_MODAL, url } from '../../../helpers/constants';
import { useAdminContext } from '../../../contexts/adminContext';

const EditCourseModal = ({ data, setUpdateSpinner }) => {
  const { training, setTraining } = data;
  const [coursePic, setCoursePic] = useState(null);
  const { dispatch: adminDispatch } = useAdminContext();
  const [trainers, setTrainers] = useState([]);
  const [state, dispatch] = useReducer(reducer, training);

  useEffect(() => {
    (async () => {
      const data = await fetcher.get({
        url: '/otw-training/api/trainer/get/all',
      });

      if (data.data.success) {
        setTrainers(data.data.data);
      }
      dispatch({ type: SET_INITIAL_STATE, payload: training });
    })();
  }, [training]);

  const titleRef = useRef();
  const selectTrainerRef = useRef();
  const statusRef = useRef();
  const formRef = useRef();
  const descriptionRef = useRef();
  const training_dateRef = useRef();
  const topicsRef = useRef();
  const timeRef = useRef();

  const handleEditcourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    formData.append('id', training.id);
    formData.append('title', titleRef.current.value);
    formData.append('details', descriptionRef.current.value);
    formData.append('training_date', training_dateRef.current.value);
    formData.append('time', timeRef.current.value);
    formData.append('topics', topicsRef.current.value);
    formData.append('status', statusRef.current.value);
    formData.append('trainer_id', selectTrainerRef.current.value.split('+')[0]);

    if (coursePic) {
      formData.append('thumbnail', coursePic);
    } else {
      formData.append('thumbnail', training.thumbnail);
    }

    const { data } = await fetcher.post({
      url: '/otw-training/api/training/create-or-update',
      body: formData,
    });

  

    if (data.success) {
      // let formValue = Object.fromEntries(formData.entries());

      setTraining({
        title: state.title,
        details: state.details,
        id: state.id,
        thumbnail: data.data.thumbnail || state?.thumbnail,
        training_date: state.training_date,
        status: state.status,
        trainer_id: state.trainer_id,
        time: state.time,
        trainer_name: selectTrainerRef.current.value.split('+')[1],
      });

      setUpdateSpinner(false);
      adminDispatch({ type: HIDE_MODAL });
    } else {
      setUpdateSpinner(false);
      adminDispatch({ type: HIDE_MODAL });
    }
  };

  return (
    <div>
      <span>Edit Course thumbnail</span>
      <div className='form-image-containers'>
        <div className='form-image-container'>
          {coursePic ? (
            <img
              className='form-image'
              src={URL.createObjectURL(coursePic)}
              alt=''
            />
          ) : (
            <img
              className='form-image'
              src={`${url}/get/image/training_thumbnail/${training?.thumbnail}`}
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
              onChange={(e) => setCoursePic(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <form onSubmit={handleEditcourse}>
        <div className='first-row'>
          <label htmlFor='course_title'>
            <span>Course Title</span>
            <input
              type='text'
              id='title'
              name='title'
              placeholder='Course Title'
              style={{ width: 'auto' }}
              ref={titleRef}
              value={state.title}
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
              ref={selectTrainerRef}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'trainer_id', value: e.target.value },
                })
              }
              defaultValue={`${state.trainer_id}+${state.trainer_name}`}
              required
            >
              <option value='' disabled hidden>
                Choose Trainer
              </option>
              {trainers.map((trainer) => {
                const { id, name } = trainer;
                return (
                  <option key={id} value={`${id}+${name}`}>
                    {name}
                  </option>
                );
              })}
            </select>
          </label>

          <label htmlFor='status'>
            <span>Change Status</span>
            <select
              id='status'
              name='status'
              ref={statusRef}
              style={{ width: 'auto' }}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'status', value: e.target.value },
                })
              }
              defaultValue={state.status}
              required
            >
              <option value='Upcoming'>Upcoming</option>
              <option value='Finished'>Finished</option>
              <option value='Removed'>Removed</option>
            </select>
          </label>

          <label htmlFor='details'>
            <span>Description</span>
            <textarea
              required
              id='details'
              name='details'
              rows='10'
              cols='70'
              placeholder='Description'
              ref={descriptionRef}
              value={state.details}
              style={{ width: 'auto' }}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'details', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='training_date'>
            <span>Training Date</span>
            <input
              type='date'
              id='training_date'
              name='training_date'
              style={{ width: 'auto' }}
              ref={training_dateRef}
              value={state.training_date?.split('T')[0]}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'training_date', value: e.target.value },
                })
              }
            />
            <label htmlFor='time'>
              <span>Training Time</span>
              <input
                type='time'
                id='time'
                name='time'
                ref={timeRef}
                style={{ width: 'auto' }}
                value={state.time}
                onChange={(e) =>
                  dispatch({
                    type: SET_SINGLE_VALUE,
                    payload: { field: 'time', value: e.target.value },
                  })
                }
              />
            </label>
          </label>

          <label htmlFor='topics'>
            <span>Topics</span>
            <textarea
              required
              id='topics'
              name='topics'
              rows='7'
              ref={topicsRef}
              cols='50'
              placeholder='Training Topics'
              style={{ width: 'auto' }}
              value={state.topics}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'topics', value: e.target.value },
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

export default EditCourseModal;
