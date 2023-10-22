import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import Spinner from '../Spinner';

const SeeAllFunds = () => {
  const { type } = useParams();
  const [funds, setFunds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const { data } = await fetcher.get({ url: '/api/admin/fund/get/all' });
      const filteredFunds = data.data.filter(
        (item) => item.status?.toLowerCase() === type
      );
      setFunds(filteredFunds);
      setIsLoading(false);
    })();
  }, [type]);

  return (
    <div className='content'>
      <main>
        <div>
          <h2>All {type} Fund Application :</h2>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {funds.length === 0 ? (
              <>
                <br />
                <h3 className='spinner'>No {type} Fund Applications</h3>
              </>
            ) : (
              <>
                {funds.map((item) => {
                  const { amount, apply_date, queen_dp, queen_name, id } = item;
                  return (
                    <div key={id} className='customer'>
                      <Link to={`/funds/details/${id}`}>
                        <div className='info'>
                          <img
                            src={`${url}/get/image/me/${queen_dp}`}
                            width='40px'
                            height='40px'
                            alt='queen'
                          />
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                gap: '5px',
                              }}
                            >
                              <h4>{queen_name}</h4>
                              <small>Fund Amount: {amount}tk</small>
                            </div>
                            <div style={{ display: 'flex' }}>
                              <h4>Application Date:</h4>
                              <small>
                                {moment(apply_date).format('MMM Do YY')}
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SeeAllFunds;
