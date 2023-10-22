import React, { useState } from 'react';
import { useAdminContext } from '../../../contexts/adminContext';
import { RiImageEditFill } from 'react-icons/ri';
import fetcher from '../../../helpers/fetchApi';
import { HIDE_MODAL } from '../../../helpers/constants';

const AddNewInstituteModal = ({ data, setUpdateSpinner }) => {
  const { institutes, setInstitutes } = data;
  const [institutePic, setInstitutePic] = useState(null);
  const [instituteName, setInstituteName] = useState('');
  const [instLocation, setInstLocation] = useState('');
  const { dispatch: adminDispatch } = useAdminContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSpinner(true);
    const instData = new FormData();
    instData.append('inst_logo', institutePic);
    instData.append('inst_name', instituteName);
    instData.append('location', instLocation);
    const { data } = await fetcher.post({
      url: '/otw-training/api/institute/create',
      body: instData,
    });

    if (data.success) {
      setInstitutes([
        ...institutes,
        {
          inst_logo: data.data.inst_logo,
          inst_name: instituteName,
          location: instLocation,
          id: data.data.id,
        },
      ]);
      setUpdateSpinner(false);
      adminDispatch({ type: HIDE_MODAL });
    } else {
      setUpdateSpinner(false);
    }
  };
  return (
    <div>
      <span>Add Institute Image</span>
      <form onSubmit={handleSubmit}>
        <div
          className={
            institutePic
              ? 'form-image-containers'
              : 'form-image-containers upload-course-thumnail'
          }
        >
          <div className='form-image-container'>
            {institutePic && (
              <img
                className='form-image'
                src={URL.createObjectURL(institutePic)}
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
                onChange={(e) => setInstitutePic(e.target.files[0])}
                required
              />
            </label>
          </div>
        </div>

        <div className='first-row'>
          <label htmlFor='inst_name'>
            <span>Institute Name</span>
            <input
              type='text'
              id='inst_name'
              name='inst_name'
              placeholder='Institute Name'
              style={{ width: 'auto' }}
              onChange={(e) => setInstituteName(e.target.value)}
              required
            />
          </label>
          <label htmlFor='inst_loc'>
            <span>Institute Location</span>
            <input
              type='text'
              id='inst_loc'
              name='inst_loc'
              placeholder='Institute Location'
              style={{ width: 'auto' }}
              onChange={(e) => setInstLocation(e.target.value)}
              required
            />
          </label>
        </div>
        <input style={{ width: 'auto' }} type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default AddNewInstituteModal;
