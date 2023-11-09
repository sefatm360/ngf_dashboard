import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cards from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import lib from '../../helpers/utils';

const Funds = () => {
  const { pathname } = useLocation();
  const [funds, setFunds] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    (async function () {
      setFetching(true);
      const { data } = await fetcher.get({ url: '/api/admin/fund/get/all' });
      setFunds(data.data);
      setFetching(false);
    })();
  }, []);

  const { approved, pending, rejected } = lib.separate(funds);

  const cards = [
    {
      id: 1,
      length: pending.length,
      field: 'Pending Application',
      path: '/funds/pending',
    },
    {
      id: 2,
      length: approved.length,
      field: 'Approved Application',
      path: '/funds/approved',
    },
    {
      id: 3,
      length: rejected.length,
      field: "Rejected ME's",
      path: '/funds/rejected',
    },
  ];

  const lists = [
    { data: pending, title: 'Pending', path: 'pending' },
    { data: approved, title: 'Approved', path: 'approved' },
    { data: rejected, title: 'Rejected', path: 'rejected' },
  ];

  return (
    <div className='content'>
      <main>
        <div className='link-container'>
          <p className='dis-link'>{pathname}</p>
        </div>
        <h1 className='page-header-title'>Funds Application Overview</h1>
        <div className='cards orderpage'>
          <Cards cards={cards} fetching={fetching} />
        </div>
        <div className='recent-grid queen-list-page'>
          {lists.map((item) => {
            const { data, title, path } = item;
            return (
              <div className='customers' key={title}>
                <div className='card'>
                  <div className='card-header'>
                    <h3>{title} Application</h3>
                    <Link to={`/funds/${path}`}>See All</Link>
                  </div>
                  <div className='card-body'>
                    {!fetching ? (
                      <>
                        {data.length ? (
                          <>
                            {data.slice(0, 5).map((item) => {
                              const {
                                amount,
                                apply_date,
                                queen_dp,
                                queen_name,
                                id,
                              } = item;
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
                                            {moment(apply_date).format(
                                              'MMM Do YY'
                                            )}
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <h3 className='spinner'>No {title} ME</h3>
                        )}
                      </>
                    ) : (
                      <Spinner />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Funds;
