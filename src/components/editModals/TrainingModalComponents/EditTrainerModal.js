import React, { useRef, useState } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { useAdminContext } from '../../../contexts/adminContext';
import { HIDE_MODAL, url } from '../../../helpers/constants';
import fetcher from '../../../helpers/fetchApi';

const EditTrainerModal = ({ data }) => {
  const { trainer, setTrainer } = data;
  const {
    address,
    // application_id,
    email,
    // inst_id,
    // inst_name,
    // inst_logo,
    id,
    name,
    // nid_back,
    // nid_front,
    phone,
    photo,
    specialist,
    status,
  } = trainer;

  const [updatePhoto, setUpdatePhoto] = useState(null);

  const { dispatch: adminDispatch } = useAdminContext();

  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    if (updatePhoto) {
      formData.append('photo', updatePhoto);
    } else {
      formData.append('photo', photo);
    }

    const { data } = await fetcher.put({
      url: `/otw-training/api/trainer/update/${id}`,
      body: formData,
    });

    if (data.success) {
      let formValue = Object.fromEntries(formData.entries());

      setTrainer({
        ...trainer,
        ...formValue,
        image: updatePhoto,
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
              src={`${url}/get/image/training_trainer_files/${photo}`}
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

              // onChange={(e) =>
              //   dispatch({
              //     type: SET_SINGLE_VALUE,
              //     payload: { field: 'product_name', value: e.target.value },
              //   })
              // }
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

              // onChange={(e) =>
              //   dispatch({
              //     type: SET_SINGLE_VALUE,
              //     payload: { field: 'product_name', value: e.target.value },
              //   })
              // }
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

              // onChange={(e) =>
              //   dispatch({
              //     type: SET_SINGLE_VALUE,
              //     payload: { field: 'product_name', value: e.target.value },
              //   })
              // }
            />
          </label>
          <label htmlFor='specialist'>
            <span>Specialist</span>
            <input
              type='text'
              id='specialist'
              name='specialist'
              placeholder='specialist'
              style={{ width: 'auto' }}
              defaultValue={specialist}

              // onChange={(e) =>
              //   dispatch({
              //     type: SET_SINGLE_VALUE,
              //     payload: { field: 'product_name', value: e.target.value },
              //   })
              // }
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

              // onChange={(e) =>
              //   dispatch({
              //     type: SET_SINGLE_VALUE,
              //     payload: { field: 'product_name', value: e.target.value },
              //   })
              // }
            />
          </label>

          <label htmlFor='status'>
            <span>Status</span>
            <select
              id='status'
              name='status'
              style={{ width: 'auto' }}
              defaultValue={status}

              // onChange={(e) =>
              //   dispatch({
              //     type: SET_SINGLE_VALUE,
              //     payload: { field: 'status', value: e.target.value },
              //   })
              // }
            >
              <option value='Approved'>Approved</option>
              <option value='Rejected'>Rejected</option>
            </select>
          </label>
        </div>

        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default EditTrainerModal;
