import React, { useState } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { useAdminContext } from '../../../contexts/adminContext';
import { HIDE_MODAL, url } from '../../../helpers/constants';
import fetcher from '../../../helpers/fetchApi';

const GuarenterNidEdit = ({ data, setUpdateSpinner, setFundDetails }) => {
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const { nid_front, nid_back, guaranter_id } = data.fund_guaranter;
  const { dispatch: adminDispatch } = useAdminContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSpinner(true);
    const formData = new FormData();
    if (nidFront) formData.append('nid_front', nidFront);
    if (nidBack) formData.append('nid_back', nidBack);
    const response = await fetcher.put({
      url: `/api/fund/update/g/nid/${guaranter_id}`,
      body: formData,
    });
    if (response.data.success) {
      setFundDetails({
        ...data,
        fund_guaranter: {
          ...data.fund_guaranter,
          nid_front: response.data.data.nid_front,
          nid_back: response.data.data.nid_back,
        },
      });
      setUpdateSpinner(false);
      adminDispatch({ type: HIDE_MODAL });
    } else {
      setUpdateSpinner(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-image-containers'>
          <div className='form-image-container'>
            {nidFront ? (
              <img
                className='form-image'
                src={URL.createObjectURL(nidFront)}
                alt=''
              />
            ) : (
              <img
                className='form-image'
                src={`${url}/get/image/nids/${nid_front}`}
                alt=''
              />
            )}
            <label htmlFor='file1' className='form-image-edit'>
              <RiImageEditFill />
              <input
                style={{ display: 'none' }}
                type='file'
                id='file1'
                accept='.jpg, .png, .jpeg'
                onChange={(e) => setNidFront(e.target.files[0])}
              />
            </label>
          </div>
          <div className='form-image-container'>
            {nidBack ? (
              <img
                className='form-image'
                src={URL.createObjectURL(nidBack)}
                alt=''
              />
            ) : (
              <img
                className='form-image'
                src={`${url}/get/image/nids/${nid_back}`}
                alt=''
              />
            )}
            <label htmlFor='file2' className='form-image-edit'>
              <RiImageEditFill />
              <input
                style={{ display: 'none' }}
                type='file'
                id='file2'
                accept='.jpg, .png, .jpeg'
                onChange={(e) => setNidBack(e.target.files[0])}
              />
            </label>
          </div>
        </div>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default GuarenterNidEdit;
