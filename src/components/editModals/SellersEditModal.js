import React, { useEffect, useRef, useState } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { useAdminContext } from '../../contexts/adminContext';
import { HIDE_MODAL, url } from '../../helpers/constants';
import { districts, Division } from '../../helpers/districts';
import fetcher from '../../helpers/fetchApi';

const SellersEditModal = ({ data: SellerData, setUpdateSpinner }) => {
  const [sellerInfo, setSellerInfo] = useState({});
  console.log(sellerInfo, 'edit modal');
  const { dispatch: adminDispatch } = useAdminContext();

  useEffect(() => {
    setSellerInfo(SellerData?.seller);
  }, [SellerData.seller]);
  const formRef = useRef();
  const {
    account_number,
    address,
    bank_name,
    city,
    division,
    email,
    id,
    name,
    note,
    photo,
    post_code,
    status,
    nid_front,
    nid_back,
  } = sellerInfo || {};

  const [sellerDp, setSellerDp] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const [nidFront, setNidFront] = useState(null);
  const [statusValue, setStatusValue] = useState(status);
  const [paymentName, setPaymentName] = useState(bank_name);
  console.log(paymentName);

  useEffect(() => {
    setSellerInfo(SellerData.seller);
  }, [SellerData.seller]);

  useEffect(() => {
    setStatusValue(sellerInfo?.status);
  }, [sellerInfo?.status]);

  useEffect(() => {
    setPaymentName(sellerInfo?.bank_name);
  }, [sellerInfo?.bank_name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSpinner(true);
    const formData = new FormData(formRef.current);
    if (sellerDp) {
      formData.append('photo', sellerDp);
    }

    if (nidBack) {
      formData.append('nid_back', nidBack);
    }

    if (nidFront) {
      formData.append('nid_front', nidFront);
    }

    for (const [key, values] of formData.entries()) {
      console.log(values, 'values');
      if (formData.get(key) === '') {
        formData.delete(key);
      }
    }

    const { data } = await fetcher.put({
      url: `/out/api/seller/update/profile/${id}`,
      body: formData,
    });

    console.log({ data });
    if (data.success) {
      let sellerObj = {};
      for (const pair of formData.entries()) {
        sellerObj[pair[0]] = pair[1];
      }
      sellerObj.id = id;
      if (data.data.photo) {
        sellerObj.photo = data.data.photo;
      } else {
        sellerObj.photo = photo;
      }
      if (data.data.nid_front) {
        sellerObj.nid_front = data.data.nid_front;
      } else {
        sellerObj.nid_front = nid_front;
      }
      if (data.data.nid_back) {
        sellerObj.nid_back = data.data.nid_back;
      } else {
        sellerObj.nid_back = nid_back;
      }
      SellerData.setSeller(sellerObj);
    }

    setUpdateSpinner(false);

    // adminDispatch({ type: RESET_FORM_DATA });
    adminDispatch({ type: HIDE_MODAL });
  };
  return (
    <div>
      <div className='form-image-containers'>
        <div
          style={{ flexDirection: 'column' }}
          className='form-image-container'
        >
          <p>seller Profile</p>
          {sellerDp ? (
            <img
              className='form-image'
              src={URL.createObjectURL(sellerDp)}
              alt=''
            />
          ) : (
            <img
              className='form-image'
              src={`${url}/get/image/freelancing_seller_files/${photo}`}
              alt=''
            />
          )}

          <label htmlFor='sellerDP' className='form-image-edit'>
            <RiImageEditFill />
            <input
              style={{ display: 'none' }}
              type='file'
              id='sellerDP'
              accept='.jpg, .png, .jpeg'
              onChange={(e) => setSellerDp(e.target.files[0])}
            />
          </label>
        </div>

        {/* nid back */}
        <div
          style={{ flexDirection: 'column' }}
          className='form-image-container'
        >
          <p>Nid Back</p>
          {nidBack ? (
            <img
              className='form-image'
              src={URL.createObjectURL(nidBack)}
              alt=''
            />
          ) : (
            <img
              className='form-image'
              src={`${url}/get/image/freelancing_seller_files/${nid_back}`}
              alt=''
            />
          )}
          <label htmlFor='nidBack' className='form-image-edit'>
            <RiImageEditFill />
            <input
              style={{ display: 'none' }}
              type='file'
              id='nidBack'
              accept='.jpg, .png, .jpeg'
              onChange={(e) => setNidBack(e.target.files[0])}
            />
          </label>
        </div>
        {/* nid front */}
        <div
          style={{ flexDirection: 'column' }}
          className='form-image-container'
        >
          <p>Nid Front</p>
          {nidFront ? (
            <img
              className='form-image'
              src={URL.createObjectURL(nidFront)}
              alt=''
            />
          ) : (
            <img
              className='form-image'
              src={`${url}/get/image/freelancing_seller_files/${nid_front}`}
              alt=''
            />
          )}
          <label htmlFor='nidFront' className='form-image-edit'>
            <RiImageEditFill />
            <input
              style={{ display: 'none' }}
              type='file'
              id='nidFront'
              accept='.jpg, .png, .jpeg'
              onChange={(e) => setNidFront(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className='first-row'>
          <label htmlFor='sellerName'>
            <span>Seller name</span>
            <input
              type='text'
              id='sellerName'
              name='name'
              placeholder='Seller Name'
              style={{ width: 'auto' }}
              defaultValue={name}
            />
          </label>

          {/* <label htmlFor='phone'>
                <span>Phone</span>
                <input
                  type='text'
                  id='phone'
                  name='phone'
                  placeholder='phone'
                  style={{ width: 'auto' }}
                  defaultValue={phone}
                />
              </label> */}

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

          <label htmlFor='payment'>
            <span>Payment Type</span>
            <select
              id='payment'
              name='bank_name'
              style={{ width: 'auto' }}
              value={paymentName}
              onChange={(e) => {
                setPaymentName(e.target.value);
              }}
            >
              <option value='Bkash'>Bkash</option>
              <option value='Nagad'>Nagad</option>
            </select>
          </label>

          <label htmlFor='division'>
            <span>Divison</span>
            <select
              id='division'
              name='division'
              style={{ width: 'auto' }}
              onChange={(e) => {
                setSellerInfo({
                  ...sellerInfo,
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
                setSellerInfo({
                  ...sellerInfo,
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

          <label htmlFor='account'>
            <span>Account Number</span>
            <input
              type='text'
              id='account'
              name='account_number'
              placeholder='account'
              style={{ width: 'auto' }}
              defaultValue={account_number}
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

export default SellersEditModal;
