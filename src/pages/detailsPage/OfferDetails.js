import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useAdminContext } from '../../contexts/adminContext';
import { useOfferContext } from '../../contexts/offerContext';
import { SET_OFFER, SHOW_MODAL, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const OfferDetails = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [image, setImage] = useState(null);
  const { dispatch: adminDispatch } = useAdminContext();
  const { dispatch: offerDispatch } = useOfferContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    exp_date,
    offer_desc,
    offer_type,
    product_name,
    product_picture_1,
    product_picture_2,
    queen_name,
    status,
  } = offer;

  useEffect(() => {
    setImage(product_picture_1);
  }, [product_picture_1, product_picture_2]);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const { data } = await fetcher.get({
        url: `/api/admin/offers/get/one/${id}`,
      });

      setOffer(data.data);
      setIsLoading(false);
    })();
  }, [id]);

  const imageHandler = (image) => {
    setImage(image);
  };

  const handleClick = () => {
    adminDispatch({ type: SHOW_MODAL, payload: offer });
    offerDispatch({ type: SET_OFFER, payload: setOffer });
  };

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          {isLoading ? (
            <>
              <div className='show-modal-back'></div>
              <Spinner />
            </>
          ) : (
            <div>
              <div className='link-container'>
                <p className='dis-link'>
                  <Link
                    to='/offers'
                    className='link'
                    style={{ color: 'darkblue' }}
                  >
                    /offers
                  </Link>
                  /<span className='text-black'>{product_name}</span>
                </p>
              </div>
              <h1>Offer Details Page</h1>

              <div className='product-page-container'>
                <div className='product-img-slot'>
                  <img
                    style={{
                      width: 'auto',
                      height: '300',
                      maxWidth: 600,
                      maxHeight: 300,
                    }}
                    className='product-pic'
                    src={`${url}/get/image/products/${image}`}
                    alt=''
                  />
                  <br />
                </div>
                <div className='pagination-setup'>
                  <img
                    className={`square-img ${
                      image === product_picture_1 && 'active-img'
                    }`}
                    src={`${url}/get/image/products/${product_picture_1}`}
                    alt=''
                    onClick={() => imageHandler(product_picture_1)}
                  />
                  <img
                    className={`square-img margin-left ${
                      image === product_picture_2 && 'active-img'
                    }`}
                    src={`${url}/get/image/products/${product_picture_2}`}
                    alt=''
                    onClick={() => imageHandler(product_picture_2)}
                  />
                  <button className='margin-left-40' onClick={handleClick}>
                    Edit
                  </button>
                </div>
              </div>
              <div className='recent-grid product-details'>
                <div className='projects'>
                  <div className='card'>
                    <div className='card-header'>
                      <h3>Offer Details</h3>
                    </div>
                    <div className='card-body'>
                      <div className='table-responsive'>
                        <table width='100%'>
                          <thead>
                            <tr>
                              <td>Product Name</td>
                              <td>ME Name </td>
                              <td>Offer Type</td>
                              <td>Offer Description </td>
                              <td>Expiration Date </td>
                              <td>Status </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{product_name}</td>
                              <td>{queen_name}</td>
                              <td>{offer_type}</td>
                              <td>{offer_desc}</td>
                              <td>{exp_date?.split('T')[0]}</td>
                              <td>{status}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OfferDetails;
