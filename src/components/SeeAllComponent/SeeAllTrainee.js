import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fetcher from '../../helpers/fetchApi';
import Pagination from '../../pages/Pagination/Pagination';
import TraineesPage from '../SearhContentPage/TraineesPage';

const SeeAllTrainee = () => {
  const params = new URLSearchParams(document.location.search);
  let page = params.get('page');
  let type = params.get('type');
  const [pageTrainee, setPageTrainee] = useState({ data: [], total: null });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    let uri = '/otw-training/api/trainee/get/all';
    let pageNumber = 0;
    if (type === 'pending' || type === 'approved' || type === 'rejected') {
      uri = `/otw-training/api/trainee/get/all/by-status/${type}`;
    }

    if (page) {
      pageNumber = (page - 1) * 50;
    }

    (async function () {
      setIsLoading(true);
      const { data } = await fetcher.get({
        url: `${uri}?limit=50&skip=${pageNumber}`,
      });

      setPageTrainee({ data: data.data, total: data.total });

      setIsLoading(false);
    })();
  }, [page, type]);

  const paginate = (pageNumber) => {
    if (type) {
      navigate(`/trainee/all?type=${type}&page=${pageNumber}`);
    } else {
      navigate(`/trainee/all?page=${pageNumber}`);
    }
  };

  return (
    <div className='content'>
      <main>
        <div>
          <h1 className='mt-0 ml-0'>
            All {type} Trainee: {pageTrainee.total}
          </h1>

          <div className={`queen-page-content`}>
            {pageTrainee.total === 0 ? (
              <h1 className='text-center mt-5 not-found'>
                No Trainee Found !!Please try again
              </h1>
            ) : (
              <div>
                {pageTrainee.data.map((trainee, index) => (
                  <Link
                    key={trainee.id}
                    className='single-queen-link'
                    to={`/trainee/details/${trainee.id}`}
                  >
                    <TraineesPage trainee={trainee} serial={index + 1} />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className='text-center mt-5'>
            {pageTrainee.total > 50 && isLoading === false && (
              <Pagination
                currentPage={Number(page) || 1}
                totalData={pageTrainee.total}
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

export default SeeAllTrainee;
