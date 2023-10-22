import React, { useEffect, useRef, useState } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { useAdminContext } from '../../contexts/adminContext';
import { HIDE_MODAL, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import { districts, Division } from '../../helpers/districts';

const TraineeEditModal = ({ data }) => {
  const { trainee, setTrainee } = data;
  const [currentData, setCurrentData] = useState(trainee);

  useEffect(() => {
    setCurrentData(trainee);
  }, [trainee]);

  const {
    id,
    name,
    address,
    phone,
    photo,
    email,
    city,
    post_code,
    status,
    note,
    division,
  } = currentData || {};

  const [updatePhoto, setUpdatePhoto] = useState(null);

  const { dispatch: adminDispatch } = useAdminContext();

  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    if (updatePhoto) {
      formData.append('photo', updatePhoto);
    }

    let formAllValue = Object.fromEntries(formData.entries());

    for (const key in formAllValue) {
      if (formAllValue[key] === '') {
        formData.delete(key);
      }
    }

    const { data } = await fetcher.put({
      url: `/otw-training/api/trainee/update/profile/${id}`,
      body: formData,
    });

    if (data.success) {
      let formValue = Object.fromEntries(formData.entries());

      setTrainee({
        ...trainee,
        ...formValue,
        photo: data.data.photo,
      });

      adminDispatch({ type: HIDE_MODAL });
    }
  };

  return (
    <div>
      <div className='form-image-containers'>
        <div className='form-image-container'>
          {updatePhoto ? (
            <img
              className='form-image'
              src={URL.createObjectURL(updatePhoto)}
              alt=''
            />
          ) : (
            <img
              className='form-image'
              src={`${url}/get/image/training_trainee_files/${photo}`}
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
              onChange={(e) => setUpdatePhoto(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className='first-row'>
          <label htmlFor='name'>
            <span>Name</span>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='name'
              style={{ width: 'auto' }}
              defaultValue={name}
            />
          </label>

          <label htmlFor='address'>
            <span>Address</span>
            <input
              type='text'
              id='address'
              name='address'
              placeholder='address'
              style={{ width: 'auto' }}
              defaultValue={address}
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
              defaultValue={phone}
            />
          </label>

          {/* <label htmlFor='city'>
            <span>City</span>
            <input
              type='text'
              id='city'
              name='city'
              placeholder='city'
              style={{ width: 'auto' }}
              defaultValue={city}
            />
          </label> */}

          <label htmlFor='division'>
            <span>Divison</span>
            <select
              id='division'
              name='division'
              style={{ width: 'auto' }}
              onChange={(e) =>
                setCurrentData({ ...currentData, division: e.target.value })
              }
              value={division}>
              {Division.map((eachDivision, index) => {
                return (
                  <option value={eachDivision} key={index}>
                    {eachDivision}
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
              onChange={(e) =>
                setCurrentData({ ...currentData, city: e.target.value })
              }
              value={city}>
              {districts?.map((district, index) => {
                if (district.division_name == division) {
                  return (
                    <option key={index} value={district.name}>
                      {district.name}
                    </option>
                  );
                }
              })}
            </select>
          </label>

          <label htmlFor='post_code'>
            <span>Post Code</span>
            <input
              type='text'
              id='post_code'
              name='post_code'
              placeholder='post code'
              style={{ width: 'auto' }}
              defaultValue={post_code}
            />
          </label>
          <label htmlFor='email'>
            <span>Email</span>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='email'
              style={{ width: 'auto' }}
              defaultValue={email}
            />
          </label>

          <label htmlFor='status'>
            <span>Status</span>
            <select
              id='status'
              name='status'
              style={{ width: 'auto' }}
              defaultValue={status}>
              <option value='Pending'>Pending</option>
              <option value='Approved'>Approved</option>
              <option value='Rejected'>Rejected</option>
            </select>
          </label>
          <label htmlFor='note'>
            <span>Note</span>
            <textarea
              id='note'
              name='note'
              placeholder='Note'
              style={{ width: 'auto', padding: '5px' }}
              defaultValue={note || ''}></textarea>
          </label>
        </div>

        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default TraineeEditModal;
