import React, { useState, useEffect } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { BiImageAdd } from 'react-icons/bi';
import { HIDE_MODAL, url } from '../../../helpers/constants';
import ShowDeleteUpdateGigImg from './ShowDeleteUpdateGigImg';
import fetcher from '../../../helpers/fetchApi';
import { useAdminContext } from '../../../contexts/adminContext';

const EditGigImages = ({ setUpdateSpinner, gigDetails, setGigDetails }) => {
  const { ft_img, images, gig_id } = gigDetails;
  const [ftImage, seFtImage] = useState(null);
  const [newImages, setNewImages] = useState(images);
  const [deletedItems, setDeletedItems] = useState([]);
  const { dispatch: adminDispatch } = useAdminContext();

  useEffect(() => {
    setNewImages(images);
  }, [gigDetails]);

  const handleAddImage = (image) => {
    setNewImages([
      ...newImages,
      { id: `new_${image.name.slice(0, 5)}`, img_name: image },
    ]);
  };

  const handleRemoveImage = (id) => {
    const restImage = newImages.filter((item) => item.id !== id);
    setNewImages(restImage);
    setDeletedItems([...deletedItems, id]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    newImages.forEach((item) => {
      if (typeof item.img_name === 'object') {
        formData.append(item.id, item.img_name);
      }
    });

    if (ftImage) {
      formData.append('ft_img', ftImage);
    }

    const deleted = [];
    deletedItems.forEach((del) => {
      if (typeof del === 'number') {
        deleted.push(del);
      }
    });

    if (deleted.length) {
      formData.append('deleted', JSON.stringify(deleted));
    }

    const { data } = await fetcher.put({
      url: `/out/api/admin/gig/update/images/${gig_id}`,
      body: formData,
    });

    if (data.success) {
      setGigDetails({
        ...gigDetails,
        images: data.data.gig_images,
        ft_img: data.data.ft_img ? data.data.ft_img : ft_img,
      });
      adminDispatch({ type: HIDE_MODAL });
    }
  };

  return (
    <div>
      <div>
        <p className='fw-medium'>Update Feature image</p>
        <div className='form-image-containers pt-3'>
          <div className='form-image-container'>
            {ftImage ? (
              <img
                className='form-image'
                src={URL.createObjectURL(ftImage)}
                alt=''
              />
            ) : (
              <img
                className='form-image'
                src={`${url}/get/image/freelancing_gig_files/${ft_img}`}
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
                onChange={(e) => seFtImage(e.target.files[0])}
              />
            </label>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '24px' }}>
        <p className='fw-medium'>Update gig images (maximum 4)</p>
        <div
          style={{ display: 'flex', marginTop: '23px', alignItems: 'center' }}
        >
          {newImages.map((image) => (
            <ShowDeleteUpdateGigImg
              setNewImages={setNewImages}
              key={image.id}
              image={image}
              newImages={newImages}
              handleRemoveImage={handleRemoveImage}
            />
          ))}

          {newImages.length < 4 && (
            <label htmlFor='new_image'>
              <BiImageAdd style={{ fontSize: '30px', cursor: 'pointer' }} />
              <input
                style={{ display: 'none' }}
                type='file'
                id='new_image'
                accept='.jpg, .png, .jpeg'
                onChange={(e) => handleAddImage(e.target.files[0])}
              />
            </label>
          )}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSubmit} className='button'>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditGigImages;
