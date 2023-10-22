import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fetcher from '../../helpers/fetchApi';
import QueensPages from '../SearhContentPage/QueensPages';
import Pagination from '../../pages/Pagination/Pagination';
import SellersPage from '../SearhContentPage/SellersPage';
import Spinner from '../Spinner';
import SocialUserBlock from '../SearhContentPage/SocialUserBlock';

const SeeAllSocialUsers = () => {
  const params = new URLSearchParams(document.location.search);
  let page = params.get('page');
  let type = params.get('type');
  const [socialUsers, setSocialUsers] = useState({ data: [], total: null });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    let uri = '/otw-social/user/get/all/status/all';
    let pageNumber = 0;
    if (type === 'pending' || type === 'approved' || type === 'rejected') {
      uri = `/otw-social/user/get/all/status/${type}`;
    }

    if (page) {
      pageNumber = (page - 1) * 50;
    }

    (async function () {
      setIsLoading(true);
      const { data } = await fetcher.get({
        url: `${uri}?limit=50&skip=${pageNumber}`,
      });
      setSocialUsers(data);
      setIsLoading(false);
    })();
  }, [page, type]);

  const paginate = (pageNumber) => {
    if (type) {
      navigate(`/queen-connect/all?type=${type}&page=${pageNumber}`);
    } else {
      navigate(`/queen-connect/all?page=${pageNumber}`);
    }
  };

  const handleChangeType = (type) => {
    navigate(`/queen-connect/all?type=${type}`);
  };

  return (
    <div className='content'>
      <main>
        <div>
          <h1 className='mt-0 ml-0'>
            All {type} Social User:{' '}
            {socialUsers.total || socialUsers.data.length}
          </h1>
          <div className='filter-queen-section mb-4'>
            <div>
              <h4>Status</h4>
              <select
                style={{ width: '200px' }}
                id='selectCategory'
                name='selectCategory'
                onChange={(e) => handleChangeType(e.target.value)}
                defaultValue={type || 'All'}
              >
                <option value='all'>All</option>
                <option value='pending'>Pending</option>
                <option value='approved'>Approved</option>
                <option value='rejected'>Rejected</option>
              </select>
            </div>
          </div>

          <div className={`queen-page-content`}>
            {socialUsers.total === 0 ? (
              <h1 className='text-center mt-5 not-found'>
                No Social User Found !!Please try again
              </h1>
            ) : (
              <>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div>
                    {socialUsers.data.map((user, index) => (
                      <Link
                        key={user.id}
                        className='single-queen-link'
                        to={`/queen-connect/details/${user.id}`}
                      >
                        <SocialUserBlock socialUser={user} serial={index + 1} />
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div className='text-center mt-5'>
            {isLoading === false && socialUsers.total > 50 && (
              <Pagination
                currentPage={Number(page) || 1}
                totalData={socialUsers.total}
                paginate={paginate}
                selectedPage={Number(page) || 1}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeeAllSocialUsers;
