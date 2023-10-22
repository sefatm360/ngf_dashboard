import React, { useEffect, useState } from 'react';
import { RiImageEditFill, RiCloseCircleFill } from 'react-icons/ri';
import { url } from '../../../helpers/constants';

const ShowDeleteUpdateGigImg = ({
  image,
  setNewImages,
  newImages,
  handleRemoveImage,
}) => {
  const { id, img_name } = image;

  const [render, setRender] = useState(null);

  const hendleSetImage = (image) => {
    newImages.forEach((img) => {
      if (img.id === id) {
        const index = newImages.indexOf(img);
        newImages[index].img_name = image;
      }
    });
    setRender(newImages);
  };

  return (
    <div style={{ position: 'relative' }} className='form-image-containers'>
      <div className='form-image-container'>
        {typeof img_name !== 'string' ? (
          <img
            className='form-image'
            src={URL.createObjectURL(img_name)}
            alt=''
          />
        ) : (
          <img
            className='form-image'
            src={`${url}/get/image/freelancing_gig_files/${img_name}`}
            alt=''
          />
        )}

        <label htmlFor={id} className='form-image-edit'>
          <div>
            <RiImageEditFill />
          </div>
          <input
            style={{ display: 'none' }}
            type='file'
            id={id}
            accept='.jpg, .png, .jpeg'
            onChange={(e) => hendleSetImage(e.target.files[0])}
          />
        </label>
      </div>
      <RiCloseCircleFill
        onClick={() => handleRemoveImage(id)}
        style={{
          fontSize: '30px',
          position: 'absolute',
          left: '0',
          cursor: 'pointer',
          color: 'red',
        }}
      />
    </div>
  );
};

export default ShowDeleteUpdateGigImg;
