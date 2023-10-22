import React, { useEffect, useState } from 'react';
import { RiImageEditFill, RiCloseCircleFill } from 'react-icons/ri';
import { url } from '../../../helpers/constants';

const ShowDeleteUpdateSlideImg = ({
  image,
  setNewImages,
  newImages,
  handleRemoveImage,
}) => {
  const { id, img } = image;

  const [render, setRender] = useState(null);

  const hendleSetImage = (images) => {
    newImages.forEach((imgg) => {
      if (imgg.id === id) {
        const index = newImages.indexOf(imgg);
        newImages[index].img = images;
      }
    });
    setRender(newImages);
  };

  return (
    <div style={{ position: 'relative' }} className='form-image-containers'>
      <div className='form-image-container'>
        {typeof img !== 'string' ? (
          <img className='form-image' src={URL.createObjectURL(img)} alt='' />
        ) : (
          <img
            className='form-image'
            src={`${url}/get/image/content_images/${img}`}
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

export default ShowDeleteUpdateSlideImg;
