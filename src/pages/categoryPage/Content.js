import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAdminContext } from '../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import ShowDealsImg from '../../components/contentImages/ShowDealsImg';

const Content = () => {
  const { pathname } = useLocation();
  const { dispatch: adminDispatch } = useAdminContext();
  const [slideDetails, setSlideDetails] = useState([]);
  const [appSliderDetails, setAppSliderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dealsDetails = [
    {
      section: 'recent_products',
      name: 'Recent Products',
    },
    {
      section: 'baby_products',
      name: 'Baby Products',
    },
    {
      section: 'food',
      name: 'Food',
    },
    {
      section: 'home_decor',
      name: 'Home Decor',
    },
  ];

  useEffect(() => {
    (async () => {
      const { data: slider } = await fetcher.get({
        url: `/api/content/get/images/slider`,
      });
      if (slider.success) {
        setSlideDetails(slider.data);
      }
      const { data: appSlider } = await fetcher.get({
        url: '/api/content/get/images/app_slider',
      });
      if (appSlider.success) {
        setAppSliderDetails(appSlider.data);
      }
    })();
  }, []);

  return (
    <div className='content'>
      <main>
        <div>
          <div>
            <div className='link-container'>
              <p className='dis-link'>{pathname}</p>
            </div>
            <div className='top-heading-divide-content mt-4'>
              <div>
                <h1 className='page-header-title'>Slider images</h1>
              </div>
              <div style={{ textAlign: 'end' }}>
                <button
                  onClick={() => {
                    adminDispatch({
                      type: SHOW_MODAL,
                      payload: {
                        modal: 'Edit Slider Images',
                        setSlideDetails,
                        section: 'slider',
                        sliders: slideDetails,
                      },
                    });
                  }}
                  type='button'
                  className='cmn-btn'
                >
                  Edit
                </button>
              </div>
            </div>

            <div className='slider-img-content'>
              {slideDetails?.map((single) => (
                <div key={single.id}>
                  <div className='img-media'>
                    {typeof single.img === 'object' ? (
                      <img
                        className='img-fluid'
                        src={URL.createObjectURL(single.img)}
                        alt=''
                      />
                    ) : (
                      <img
                        className='img-fluid'
                        src={`${url}/get/image/content_images/${single.img}`}
                        alt=''
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className='top-heading-divide-content mt-5'>
              <div>
                <h1 className='page-header-title'>App Slider images</h1>
              </div>
              <div style={{ textAlign: 'end' }}>
                <button
                  onClick={() => {
                    adminDispatch({
                      type: SHOW_MODAL,
                      payload: {
                        modal: 'Edit App Slider Images',
                        setSlideDetails: setAppSliderDetails,
                        section: 'app_slider',
                        sliders: appSliderDetails,
                      },
                    });
                  }}
                  type='button'
                  className='cmn-btn'
                >
                  Edit
                </button>
              </div>
            </div>

            <div className='slider-img-content'>
              {appSliderDetails?.map((single) => (
                <div key={single.id}>
                  <div className='img-media'>
                    {typeof single.img === 'object' ? (
                      <img
                        className='img-fluid'
                        src={URL.createObjectURL(single.img)}
                        alt=''
                      />
                    ) : (
                      <img
                        className='img-fluid'
                        src={`${url}/get/image/content_images/${single.img}`}
                        alt=''
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* daily deals image change */}
          {dealsDetails.map((deal) => (
            <ShowDealsImg
              key={deal.section}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              deal={deal}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Content;
