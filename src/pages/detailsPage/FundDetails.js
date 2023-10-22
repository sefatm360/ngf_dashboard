import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useAdminContext } from '../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import './fundDetails.css';

const FundDetails = () => {
  const { id } = useParams();
  const [fundDetails, setFundDetails] = useState({});
  const { dispatch: adminDispatch } = useAdminContext();
  const [isLoading, setIsLoading] = useState(true);
  const [imgLoad, setImgLoad] = useState(true);

  useEffect(() => {
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/admin/fund/get/one/${id}`,
      });
      setFundDetails(data.data);
      setIsLoading(false);
    })();
  }, [id]);

  const {
    queen_name,
    queen_id,
    status,
    return_type,
    why,
    queen_dp,
    nid_number,
    return_time,
    guardian_name,
    guardian_type,
    amount,
    dob,
    fund_guaranter,
  } = fundDetails;

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
            <h1 className='page-header-title'>Funds Application Details</h1>
            <br />
            <div className='fund-topbar'>
              <div>
                <h2>Fund Applicant:</h2>
              </div>
              <div className='approve-buttons'>
                <button
                  onClick={() =>
                    adminDispatch({
                      type: SHOW_MODAL,
                      payload: {
                        modal: 'Applicant Edit',
                        fundDetails,
                        setFundDetails,
                        fundId: fundDetails.id,
                      },
                    })
                  }
                  className='approve-btn'
                >
                  Edit Applicant
                </button>
              </div>
            </div>
            <div className='fund-application'>
              <div>
                <div
                  style={{ alignItems: 'center' }}
                  className='fund-applications d-flex mb-3 '
                >
                  <h3>
                    Name:{' '}
                    <Link to={`/me/details/${queen_id}`}>{queen_name}</Link>
                  </h3>
                  <small>({status})</small>
                </div>
                <img
                  style={{ display: imgLoad ? 'block' : 'none' }}
                  width={300}
                  src='/assets/loading-img-logo.webp'
                  alt=''
                />
                <img
                  style={{ display: imgLoad ? 'none' : 'block' }}
                  width={300}
                  src={`${url}/get/image/me/${queen_dp}`}
                  alt=''
                  onLoad={() => setImgLoad(false)}
                />

                <p className='mt-3'>
                  <span className='text-bold'>Date of Birth:</span>
                  {new Date(dob).toDateString()}
                </p>
                <p>
                  <span className='text-bold'>Nid Number:</span> {nid_number}
                </p>
                <p>
                  <span className='text-bold'>{guardian_type}"s name:</span>{' '}
                  {guardian_name}
                </p>
              </div>
              <div>
                <h3>
                  Fund Amount: <span className='text-bold'>{amount}tk</span>
                </h3>
                <p style={{ textAlign: 'justify', margin: '10px 0' }}>
                  <span className='text-bold'>Fund Reason:</span> {why}
                </p>
                <p>
                  <span className='text-bold'> Time Period: </span>
                  {return_time} {''} Month
                </p>
                <p>
                  Queen will return <mark>{return_type}</mark>
                </p>
              </div>
            </div>
            <div>
              <h2>Fund Guaranter:</h2>
              <div className='fund-topbar'>
                <h3>Guaranter Name: {fund_guaranter?.name}</h3>
                <div className='approve-buttons'>
                  <button
                    onClick={() =>
                      adminDispatch({
                        type: SHOW_MODAL,
                        payload: {
                          modal: 'Guaranter Edit',
                          fundDetails,
                          fundId: fundDetails.id,
                          setFundDetails,
                        },
                      })
                    }
                    className='approve-btn'
                  >
                    Edit Guaranter
                  </button>
                </div>
              </div>
              <div className='fund-application'>
                <div>
                  <img
                    width={300}
                    src={`${url}/get/image/guaranters/${fund_guaranter?.photo}`}
                    alt=''
                  />
                </div>
                <div>
                  <p>
                    <span className='text-bold'>Address:</span>{' '}
                    {fund_guaranter?.address}
                  </p>
                  <p>
                    <span className='text-bold'>Date of Birth:</span>{' '}
                    {new Date(fund_guaranter?.dob).toDateString()}
                  </p>
                  <p>
                    <span className='text-bold'>Phone:</span>{' '}
                    {fund_guaranter?.phone}
                  </p>
                  <p>
                    <span className='text-bold'>Nid Number:</span>{' '}
                    {fund_guaranter?.nid_number}
                  </p>
                </div>
              </div>
              <div>
                <div className='fund-topbar'>
                  <h2>NID</h2>
                  <div className='approve-buttons'>
                    <button
                      onClick={() =>
                        adminDispatch({
                          type: SHOW_MODAL,
                          payload: {
                            modal: 'NID Edit',
                            fundDetails,
                            fundId: fundDetails.id,
                            setFundDetails,
                          },
                        })
                      }
                      className='approve-btn mt-3 mb-3'
                    >
                      Edit NID
                    </button>
                  </div>
                </div>
                <div>
                  <img
                    className='show-nid'
                    src={`${url}/get/image/nids/${fund_guaranter?.nid_front}`}
                    alt=''
                  />
                  <img
                    className='show-nid'
                    src={`${url}/get/image/nids/${fund_guaranter?.nid_back}`}
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FundDetails;
