import React, { useState, useEffect } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { HIDE_MODAL } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import { useAdminContext } from '../../contexts/adminContext';
import ShowDeleteUpdateSlideImg from './GigEditModals/ShowDeleteUpdateSlideImg';

const EditSlideImages = ({
  setUpdateSpinner,
  sliders,
  setSlideDetails,
  section,
}) => {
  const [newImages, setNewImages] = useState(sliders);
  const [deletedItems, setDeletedItems] = useState([]);
  const { dispatch: adminDispatch } = useAdminContext();

  useEffect(() => {
    setNewImages(sliders);
  }, [sliders]);

  const handleAddImage = (image) => {
    setNewImages([
      ...newImages,
      { id: `new_${image.name.slice(5, 10)}`, img: image },
    ]);
  };

  const handleRemoveImage = (id) => {
    const restImage = newImages.filter((item) => item.id !== id);
    setNewImages(restImage);
    setDeletedItems([...deletedItems, id]);
  };

  const handleSubmit = async () => {
    setUpdateSpinner(true);
    const formData = new FormData();
    newImages.forEach((item) => {
      if (typeof item.img === 'object') {
        formData.append(item.id, item.img);
      }
    });

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
      url: `/api/content/add/update/images/${section}`,
      body: formData,
    });

    if (data.success) {
      adminDispatch({ type: HIDE_MODAL });
      setSlideDetails(newImages);
      setUpdateSpinner(false);
    } else {
      setUpdateSpinner(false);
    }
  };

  return (
    <div>
      <div>
        <p className='fw-medium'>Update slider images (maximum 6)</p>
        <div
          className='edit-slide-images-section'
          style={{ display: 'flex', marginTop: '23px', alignItems: 'center' }}
        >
          {newImages.map((image) => (
            <ShowDeleteUpdateSlideImg
              setNewImages={setNewImages}
              key={image.id}
              image={image}
              newImages={newImages}
              handleRemoveImage={handleRemoveImage}
            />
          ))}

          {newImages.length < 6 && (
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

export default EditSlideImages;
