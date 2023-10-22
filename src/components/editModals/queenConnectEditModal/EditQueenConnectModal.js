import React, { useEffect, useRef, useState } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { useAdminContext } from '../../../contexts/adminContext';
import { HIDE_MODAL, url } from '../../../helpers/constants';
import { districts, Division } from '../../../helpers/districts';
import fetcher from '../../../helpers/fetchApi';

const EditQueenConnectModal = ({ data: SocialUsersData, setUpdateSpinner }) => {
  const [SocialUsersInfo, setSocialUsersInfo] = useState(null);
  const { dispatch: adminDispatch } = useAdminContext();
  const formRef = useRef();

  useEffect(() => {
    setSocialUsersInfo(SocialUsersData?.socialUsers);
  }, [SocialUsersData?.socialUsers]);

  const {
    id,
    address,
    city,
    division,
    designation,
    cover_photo,
    post_code,
    name,
    phone,
    note,
    photo,
    status,
    email,
  } = SocialUsersInfo || {};

  const [socialUserDp, setSocialUserDp] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [statusValue, setStatusValue] = useState(status);
  console.log(statusValue);

  useEffect(() => {
    setSocialUsersInfo(SocialUsersData.socialUsers);
  }, [SocialUsersData.socialUsers]);

  useEffect(() => {
    setStatusValue(SocialUsersInfo?.status);
  }, [SocialUsersInfo?.status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSpinner(true);
    const formData = new FormData(formRef.current);
    if (socialUserDp) {
      formData.append('photo', socialUserDp);
    }

    if (coverPhoto) {
      formData.append('cover_photo', coverPhoto);
    }

    for (const [key, values] of formData.entries()) {
      console.log(values, 'values');
      if (formData.get(key) === '') {
        formData.delete(key);
      }
    }

    const { data } = await fetcher.put({
      url: `/otw-social/user/update/profile/${id}`,
      body: formData,
    });

    console.log({ data });

    if (data.success) {
      let SocialUserObj = {};
      for (const pair of formData.entries()) {
        SocialUserObj[pair[0]] = pair[1];
      }

      SocialUserObj.id = id;
      if (data.data.photo) {
        SocialUserObj.photo = data.data.photo;
      } else {
        SocialUserObj.photo = photo;
      }
      if (data.data.cover_photo) {
        SocialUserObj.cover_photo = data.data.cover_photo;
      } else {
        SocialUserObj.cover_photo = cover_photo;
      }

      SocialUsersData.setSocialUsers(SocialUserObj);
    }

    setUpdateSpinner(false);
    adminDispatch({ type: HIDE_MODAL });
  };
  return (
    <div>
      <div className='form-image-containers'>
        <div
          style={{ flexDirection: 'column' }}
          className='form-image-container'
        >
          <p>Profile photo</p>
          {socialUserDp ? (
            <img
              className='form-image'
              src={URL.createObjectURL(socialUserDp)}
              alt=''
            />
          ) : (
            <img
              className='form-image'
              src={`${url}/get/image/social_users_files/${photo}`}
              alt=''
            />
          )}

          <label htmlFor='socialUserDp' className='form-image-edit'>
            <RiImageEditFill />
            <input
              style={{ display: 'none' }}
              type='file'
              id='socialUserDp'
              accept='.jpg, .png, .jpeg'
              onChange={(e) => setSocialUserDp(e.target.files[0])}
            />
          </label>
        </div>

        {/* nid back */}
        <div
          style={{ flexDirection: 'column' }}
          className='form-image-container'
        >
          <p>Cover Photo</p>
          {coverPhoto ? (
            <img
              className='form-image'
              src={URL.createObjectURL(coverPhoto)}
              alt=''
            />
          ) : (
            <img
              className='form-image'
              src={`${url}/get/image/social_users_files/${cover_photo}`}
              alt=''
            />
          )}
          <label htmlFor='coverPhoto' className='form-image-edit'>
            <RiImageEditFill />
            <input
              style={{ display: 'none' }}
              type='file'
              id='coverPhoto'
              accept='.jpg, .png, .jpeg'
              onChange={(e) => setCoverPhoto(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className='first-row'>
          <label htmlFor='sellerName'>
            <span>Users name</span>
            <input
              type='text'
              id='sellerName'
              name='name'
              placeholder='Seller Name'
              style={{ width: 'auto' }}
              defaultValue={name}
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

          <label htmlFor='status'>
            <span>Status</span>
            <select
              id='status'
              name='status'
              style={{ width: 'auto' }}
              onChange={(e) => {
                setStatusValue(e.target.value);
              }}
              value={statusValue}
            >
              <option value='Approved'>Approved</option>
              <option value='Pending'>Pending</option>
              <option value='Rejected'>Rejected</option>
            </select>
          </label>

          <label htmlFor='address'>
            <span>Address</span>
            <input
              type='text'
              id='address'
              name='address'
              placeholder='Address'
              style={{ width: 'auto' }}
              defaultValue={address}
            />
          </label>

          <label htmlFor='division'>
            <span>Divison</span>
            <select
              id='division'
              name='division'
              style={{ width: 'auto' }}
              onChange={(e) => {
                setSocialUsersInfo({
                  ...SocialUsersInfo,
                  division: e.target.value,
                });
              }}
              value={division}
            >
              {Division.map((eachDivision, index) => {
                return (
                  <option key={index} value={eachDivision}>
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
              value={city}
              onChange={(e) => {
                setSocialUsersInfo({
                  ...SocialUsersInfo,
                  city: e.target.value,
                });
              }}
            >
              {districts?.map((district, index) => {
                if (district.division_name == division) {
                  return (
                    <option key={index} defaultValue={district.name}>
                      {district.name}
                    </option>
                  );
                }
              })}
            </select>
          </label>

          <label htmlFor='designation'>
            <span>Designation</span>
            <input
              type='text'
              id='designation'
              name='designation'
              placeholder='designation'
              style={{ width: 'auto' }}
              defaultValue={designation}
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
              defaultValue={email}
            />
          </label>

          <label htmlFor='postCOde'>
            <span>Post Code</span>
            <input
              type='text'
              id='postCOde'
              name='post_code'
              placeholder='Enter post code'
              style={{ width: 'auto' }}
              defaultValue={post_code}
            />
          </label>

          <label htmlFor='note'>
            <span>Note</span>
            <textarea
              id='note'
              name='note'
              placeholder='Note'
              style={{ width: 'auto', padding: '5px' }}
              defaultValue={note || ''}
            ></textarea>
          </label>
        </div>

        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default EditQueenConnectModal;
