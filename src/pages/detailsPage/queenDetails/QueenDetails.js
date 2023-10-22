import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Cards from '../../../components/Cards';
import Spinner from '../../../components/Spinner';
import { useAdminContext } from '../../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../../helpers/constants';
import fetcher from '../../../helpers/fetchApi';

const QueenDetails = () => {
  const [queenLoading, setQueenLoading] = useState(true);
  const { id } = useParams();
  const [queen, setQueen] = useState({});
  const { dispatch: adminDispatch } = useAdminContext();

  useEffect(() => {
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/admin/queen/getqueen/for-admin/${id}`,
      });
      setQueen(data.data);
      setQueenLoading(false);
    })();
  }, [id]);

  const {
    address,
    city,
    division,
    // post_code,
    name,
    phone,
    photo,
    status,
    email,
    nid_front,
    nid_back,
    join_date,
    reference_id,
    note,
    queen_category,
    designation,
  } = queen || {};

  const cards = [
    {
      id: 1,
      field: 'Queen Products',
      path: `/me/details/${id}/products?queen=${name}`,
    },
    {
      id: 2,
      field: 'Queen Orders',
      path: `/me/details/${id}/orders?queen=${name}`,
    },
    // {
    //   id: 3,
    //   field: 'Queen Offers',
    //   path: `/me/details/${id}/offers?queen=${name}`,
    // },
  ];

  const handleClick = () => {
    adminDispatch({
      type: SHOW_MODAL,
      payload: { queen, setQueen },
    });
  };

  return (
    <div className='content'>
      <div className='center-info'>
        {queenLoading ? (
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
                <Link to='/me' className='link' style={{ color: 'darkblue' }}>
                  /me
                </Link>
                /{name}
              </p>
              {status === 'Approved' && (
                <a
                  className='button'
                  href={`https://onthe-way.com/queen/${id}`}
                  target='_blank'
                  style={{ color: 'white' }}
                  rel='noopener noreferrer'
                >
                  View On Website
                </a>
              )}
              {reference_id && (
                <Link className='button' to={`/me/details/${reference_id}`}>
                  Refered by
                </Link>
              )}
              <Link
                className='button'
                to={`/products/add-product/?queenId=${id}&name=${name}`}
              >
                Add Product
              </Link>
            </div>
            <div>
              <h1 className='page-header-title'>{name}'s Profile Page</h1>
              <Link to={`/me/refs/me/${id}`}>See her refered queens</Link>
            </div>
            <div className='profile-page-container'>
              <div className='profile-img-slot'>
                <div className='d-flex'>
                  <img
                    className='queen-pic'
                    src={`${url}/get/image/me/${photo}`}
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
                      Designation:<span>{designation}</span>
                    </p>
                  </span>
                </div>
                <div className='items-right'>
                  <span>
                    <p>
                      Queen Id:<span>NGF-ME{id}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Status:<span>{status}</span>
                    </p>
                  </span>
                  <span>
                    <p>
                      Join Date:
                      <span>{moment(join_date).format('MMM Do YY')}</span>
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
                  <span>
                    <p>
                      Category:<span>{queen_category}</span>
                    </p>
                  </span>
                </div>
              </div>
              <div>
                {nid_front || (nid_back && <h4>NID</h4>)}
                <div className='nid-image-block'>
                  {nid_front && (
                    <img
                      className='show-nid'
                      src={`${url}/get/image/nids/${nid_front}`}
                      alt=''
                    />
                  )}
                  {nid_back && (
                    <img
                      className='show-nid'
                      src={`${url}/get/image/nids/${nid_back}`}
                      alt=''
                    />
                  )}
                </div>
              </div>
              <div className='approve-buttons'>
                <button className='approve-btn' onClick={handleClick}>
                  Edit
                </button>
                {/* <button className='approve-btn'>Approve</button>
              <button className='reject-btn'>Reject</button> */}
              </div>
            </div>
            <div className='cards orderpage'>
              <Cards cards={cards} queen fetching={queenLoading} />
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default QueenDetails;
