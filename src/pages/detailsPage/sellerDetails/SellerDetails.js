import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cards from '../../../components/Cards';
import Spinner from '../../../components/Spinner';
import { useAdminContext } from '../../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../../helpers/constants';
import fetcher from '../../../helpers/fetchApi';

const SellerDetails = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [seller, setSeller] = useState({});
  const { dispatch: adminDispatch } = useAdminContext();
  const [queenLoading, setQueenLoading] = useState(true);

  const {
    address,
    city,
    division,
    bank_name,
    account_number,
    post_code,
    apply_date,
    name,
    phone,
    photo,
    note,
    status,
    email,
    nid_front,
    nid_back,
    queen_id,
  } = seller;

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: `/out/api/seller/get/a/seller/${id}`,
      });
      if (data.success) {
        setSeller(data.data);
      }
      setLoading(false);
      setQueenLoading(false);
    })();
  }, [id]);

  const cards = [
    {
      id: 1,
      field: 'Gig',
      path: `/sellers/details/${id}/gigs?seller=${name}`,
    },
    {
      id: 2,
      field: 'Gig Orders',
      path: `/sellers/details/${id}/gig-orders?seller=${name}`,
    },
  ];

  console.log({ seller });

  return (
    <div className='content'>
      <div className='center-info'>
        {loading ? (
          <div className='queen-loading'>
            <Spinner />
          </div>
        ) : (
          <main>
            <div
              style={{ display: 'flex', justifyContent: 'space-between' }}
              className='link-container'
            >
              <p className='dis-link'>
                <Link
                  to='/sellers'
                  className='link'
                  style={{ color: 'darkblue' }}
                >
                  /sellers
                </Link>
                /{name}
              </p>
              <Link className='button' to={`#`}>
                Add Gig
              </Link>
            </div>
            <h1 className='page-header-title'>{name}'s Profile Page</h1>
            <div className='profile-page-container'>
              <div className='profile-img-slot'>
                {queen_id ? (
                  <Link className='button' to={`/me/details/${queen_id}`}>
                    ME Profile
                  </Link>
                ) : (
                  ''
                )}
                <div className='d-flex'>
                  <img
                    className='queen-pic'
                    src={`${url}/get/image/freelancing_seller_files/${photo}`}
                    alt=''
                  />
                </div>
              </div>
              <div className='profile-details'>
                <div className='items-left'>
                  <span>
                    <p>
                      Name: <span>{name}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Phone:<span>{phone}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Address:<span>{address}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      City:<span>{city}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Division:<span>{division}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Post code:<span>{post_code}</span>
                    </p>
                  </span>
                </div>
                <div className='items-right'>
                  <span>
                    <p>
                      Seller Id:<span>NGFT-T{id}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Status:<span>{status}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Payment Type:<span>{bank_name}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      A/C:<span>{account_number}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Join Date:
                      <span>{moment(apply_date).format('MMM Do YY')}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Email:<span>{email}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Note:<span>{note}</span>
                    </p>
                  </span>
                </div>
              </div>
              <div>
                <div className='nid-image-block'>
                  {nid_front ? (
                    <img
                      className='show-nid'
                      src={`${url}/get/image/freelancing_seller_files/${nid_front}`}
                      alt=''
                    />
                  ) : (
                    ''
                  )}
                  {nid_back ? (
                    <img
                      className='show-nid'
                      src={`${url}/get/image/freelancing_seller_files/${nid_back}`}
                      alt=''
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className='approve-buttons'>
                <button
                  onClick={() => {
                    adminDispatch({
                      type: SHOW_MODAL,
                      payload: { seller, setSeller },
                    });
                  }}
                  className='approve-btn'
                >
                  Edit
                </button>
              </div>

              <div className='cards orderpage'>
                <Cards cards={cards} queen fetching={queenLoading} />
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default SellerDetails;
