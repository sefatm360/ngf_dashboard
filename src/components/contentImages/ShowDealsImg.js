import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import Spinner from '../Spinner';

const ShowDealsImg = ({ deal, setIsLoading, isLoading }) => {
  const { section, name } = deal;
  const [image, setImage] = useState(null);
  const [bannerImg, setbannerImg] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: `/api/content/get/images/${section}`,
      });
      setbannerImg(data.data.img);
    })();
  }, []);

  // post
  const handleOnSubmit = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('cv', image);

    const { data } = await fetcher.put({
      url: `/api/content/update/image/deals/${section}`,
      body: formData,
    });

    if (data.success) {
      setImage(null);
      setbannerImg(data.data.img);
      setIsLoading(false);
      alert('image update succesfully');
    } else {
      setIsLoading(false);
      alert('Something is wrong');
    }
  };

  return (
    <>
      {isLoading ? (
        <div className='show-update-spinner'>
          <Spinner />
        </div>
      ) : (
        <div className='daily-deals-image-change-section mt-5'>
          <h1>{name}</h1>

          <div>
            <div className='recent-image-change-content'>
              <div>
                <div className='edit-icons'>
                  <FaRegEdit style={{ cursor: 'pointer' }} />

                  <div className='file-input'>
                    <input
                      type='file'
                      accept='.jpg, .png, .jpeg'
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='change-image-input'>
                {image && (
                  <button
                    onClick={handleOnSubmit}
                    className='cmn-btn ml-4'
                    type='button'
                  >
                    Save
                  </button>
                )}
              </div>
            </div>

            <div>
              <div className='img-media mt-4'>
                {image ? (
                  <img src={URL.createObjectURL(image)} />
                ) : (
                  <img
                    src={`${url}/get/image/daily-deals/${bannerImg}`}
                    alt=''
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowDealsImg;
