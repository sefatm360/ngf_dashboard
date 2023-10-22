import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useAdminContext } from '../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../helpers/constants';

const GigDetails = () => {
  const { id } = useParams();
  const [gigDetails, setGigDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [imageHandler, setImageHandler] = useState(null);
  const { dispatch: adminDispatch } = useAdminContext();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/out/api/gig/get/one/${id}`);
      const data = await res.json();
      setIsLoading(false);
      setGigDetails(data.data);
    })();
  }, [id]);

  const {
    description,
    ft_img,
    images,
    seller_name,
    price,
    seller_id,
    seller_photo,
    skills,
    status,
    title,
    upload_date,
    pf_link,
  } = gigDetails;

  useEffect(() => {
    if (images?.length) {
      setImageHandler(images[0].img_name);
    }
  }, [gigDetails]);

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <h1>Gig Details</h1>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                onClick={() =>
                  adminDispatch({
                    type: SHOW_MODAL,
                    payload: {
                      modal: 'Edit Gig Details',
                      gigDetails,
                      setGigDetails,
                    },
                  })
                }
                className='button'
              >
                Edit Gig Details
              </button>

              <button
                onClick={() =>
                  adminDispatch({
                    type: SHOW_MODAL,
                    payload: {
                      modal: 'Edit Gig Images',
                      gigDetails,
                      setGigDetails,
                    },
                  })
                }
                className='button'
              >
                Edit Images
              </button>
            </div>
          </div>
          {isLoading ? (
            <>
              <div className='show-modal-back'></div>
              <Spinner />
            </>
          ) : (
            <div>
              <div style={{ margin: '10px 0' }}>
                <span>{title}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <h4>(Gig ID: OTW-G{id})</h4>
                  <h4>({status})</h4>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Upload Date: </span>
                    {moment(upload_date).format('MMM Do YY')}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div className='product-page-container'>
                  <div className='product-img-slot'>
                    {images?.length ? (
                      <img
                        style={{
                          width: '400px',
                          height: '300px',
                          objectFit: 'contain',
                        }}
                        className='product-pic'
                        src={`${url}/get/image/freelancing_gig_files/${imageHandler}`}
                        alt=''
                      />
                    ) : (
                      ''
                    )}
                    <br />
                  </div>
                  <div className='pagination-setup'>
                    {images?.map((image) => {
                      const { img_name, id } = image;
                      return (
                        <img
                          key={id}
                          className={`square-img ${
                            imageHandler === img_name && 'active-img'
                          }`}
                          src={`${url}/get/image/freelancing_gig_files/${img_name}`}
                          alt=''
                          onClick={() => setImageHandler(img_name)}
                        />
                      );
                    })}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4rem' }}>
                  <div>
                    <h4>Selller</h4>
                    <Link to={`/sellers/details/${seller_id}`}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {seller_photo ? (
                          <img
                            src={`${url}/get/image/freelancing_seller_files/${seller_photo}`}
                            width='40px'
                            height='40px'
                            alt={seller_name}
                          />
                        ) : (
                          <img
                            src='/assets/avatar.jpg'
                            width='40px'
                            height='40px'
                            alt={seller_name}
                          />
                        )}
                      </div>
                      <span>{seller_name}</span>
                    </Link>
                    <div>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={
                          pf_link?.startsWith('https://')
                            ? pf_link
                            : `https://${pf_link}`
                        }
                        className='button'
                      >
                        Portfolio
                      </a>
                    </div>
                    <h4>Price: {price}tk</h4>
                  </div>
                  <div>
                    <h4>Skills</h4>
                    <ul>
                      {skills?.length && (
                        <>
                          {skills.map((skill) => {
                            const { id, name } = skill;
                            return (
                              <li style={{ listStyleType: 'circle' }} key={id}>
                                {name}
                              </li>
                            );
                          })}
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4>Feature image</h4>
                    <img
                      style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'contain',
                      }}
                      className='product-pic'
                      src={`${url}/get/image/freelancing_gig_files/${ft_img}`}
                      alt=''
                    />
                  </div>
                </div>
              </div>
              <div>
                <div style={{ margin: '10px 0' }}>
                  <span style={{ fontWeight: 'bold' }}>Details: </span>
                  <small>{description}</small>
                </div>
                <div></div>
              </div>
            </div>
          )}
          {/* <span>{gigDetails}</span> */}
        </main>
      </div>
    </div>
  );
};

export default GigDetails;
