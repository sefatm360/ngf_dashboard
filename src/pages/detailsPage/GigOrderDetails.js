import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useAdminContext } from '../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const GigOrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch: adminDispatch } = useAdminContext();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await fetcher.get({
        url: `/out/api/gig-order/get/single/${id}`,
      });

      if (data.success) {
        setOrderDetails(data.data);
      }
      setIsLoading(false);
    })();
  }, [id]);

  const {
    order_date,
    price_offered,
    order_title,
    order_details,
    attachment,
    gig_title,
    gig_ft_img,
    buyer_id,
    buyer_name,
    seller_id,
    seller_name,
    gig_id,
    note,
    d_time,
    status,
    d_time_type,
    statusChangedBy,
    statusChangedReason,
  } = orderDetails;

  const handleEditGigOrder = () => {
    adminDispatch({
      type: SHOW_MODAL,
      payload: {
        modal: 'Gig Order Edit Modal',
        orderDetails,
        setOrderDetails,
      },
    });
  };

  return (
    <div className='content'>
      <main>
        {isLoading ? (
          <>
            <div className='show-modal-back'></div>
            <Spinner />
          </>
        ) : (
          <div>
            <h2>Gig Order Details Page</h2>
            <hr />
            <div className='order-details-container'>
              <div className='order-details-top-content'>
                <div className='order-information mb-3'>
                  <p className='b-info'>
                    Order Id: <span>OTWF-O{id}</span>
                  </p>
                  <p className='b-info'>
                    Price offered: <span>{price_offered}tk</span>
                  </p>
                  <p className='b-info'>
                    Order Date:{' '}
                    <span>{moment(order_date).format('MMM Do YY')}</span>
                  </p>
                  <p className='b-info'>
                    Delivery Time: <span>{`${d_time} ${d_time_type}`}</span>
                  </p>
                  <p className='b-info'>
                    Status: <span>{status}</span>
                    <small>{' (' + statusChangedBy + ')'}</small>
                  </p>
                  <p className='b-info'>
                    Order title: <span>{order_title}</span>
                  </p>
                  <p className='b-info'>
                    Order Details: <span>{order_details}</span>
                  </p>
                </div>
                {/* note section */}
                <div>
                  <a
                    className='button'
                    target='_blank'
                    href={`${url}/download/files/files/${attachment}`}
                  >
                    Download Provided File
                  </a>
                  <p className='b-info'>
                    Status Reason: <span> {statusChangedReason} </span>
                  </p>
                  <p className='b-info'>
                    Note: <span> {note} </span>
                  </p>
                </div>
                <div>
                  <button
                    className='cmn-btn mt-3 mb-4'
                    style={{
                      padding: '0.5rem 1rem',
                      color: 'white',
                      borderRadius: '5px',
                    }}
                    onClick={handleEditGigOrder}
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div>
                <h3>About Gig</h3>
                <hr />
                <div className='d-flex'>
                  <div>
                    <div className='d-flex'>
                      <img
                        width={150}
                        style={{
                          objectFit: 'contain',
                        }}
                        src={`${url}/get/image/gigs/${gig_ft_img}`}
                        alt=''
                      />
                      <div className='ml-2 d-flex flex-column'>
                        <div className='d-flex'>
                          <p className='b-info'>
                            Gig Name:{' '}
                            <Link to={`/gigs/details/${gig_id}`}>
                              {gig_title}
                            </Link>
                          </p>
                        </div>
                        <div className='d-flex'>
                          <p className='b-info'>
                            Seller Id: <span>NGF-ME{seller_id}</span>
                          </p>
                        </div>
                        <div className='d-flex queen-all-info'>
                          <p className='b-info'>
                            Seller Name:{' '}
                            <Link to={`/sellers/details/${seller_id}`}>
                              {seller_name}
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='d-flex'></div>
                </div>
              </div>
              <br />
              <div>
                <h3>Buyer</h3>
                <hr />
                <div>
                  <img src='' alt='' />
                  <div>
                    <p className='b-info'>
                      Buyer Id: <span>OTW-C{buyer_id}</span>
                    </p>
                    <p className='b-info'>
                      Buyer Name: <span>{buyer_name}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default GigOrderDetails;
