import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fetcher from '../../helpers/fetchApi';
import Pagination from '../../pages/Pagination/Pagination';
import SellersPage from '../SearhContentPage/SellersPage';
import Spinner from '../Spinner';

const SeeAllSellers = () => {
  const params = new URLSearchParams(document.location.search);
  let page = params.get('page');
  let type = params.get('type');
  const [pageSellers, setPageSellers] = useState({ data: [], total: null });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0 });
    let uri = '/out/api/seller/get/all/seller';
    let pageNumber = 0;
    if (type === 'pending' || type === 'approved' || type === 'rejected') {
      uri = `/out/api/seller/get/all/seller/by/status/${type}`;
    }

    if (page) {
      pageNumber = (page - 1) * 50;
    }

    (async function () {
      setIsLoading(true);
      const { data } = await fetcher.get({
        url: `${uri}?limit=50&skip=${pageNumber}`,
      });
      console.log({ data });
      setPageSellers({ data: data.data, total: data.total });

      setIsLoading(false);
    })();
  }, [page, type]);

  const paginate = (pageNumber) => {
    if (type) {
      navigate(`/sellers/all?type=${type}&page=${pageNumber}`);
    } else {
      navigate(`/sellers/all?page=${pageNumber}`);
    }
  };

  const handleChangeType = (type) => {
    navigate(`/sellers/all?type=${type}`);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const { data } = await fetcher.get({
      url: `/out/api/seller/search/by/name-phone/${search}`,
    });
    setPageSellers({ data: data.data, total: data.total });
    setIsLoading(false);
  };

  return (
    <div className='content'>
      <main>
        <div>
          <h1 className='mt-0 ml-0'>
            All {type} sellers: {pageSellers.total || pageSellers.data.length}
          </h1>
          <h4>Status</h4>
          <div className='d-flex align-items-center justify-content-between mb-4'>
            <div>
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
            <div>
              <input
                style={{ width: '200px' }}
                type='text'
                placeholder='Search seller'
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={handleSearch} className='button'>
                Search
              </button>
            </div>
          </div>

          <div className={`queen-page-content`}>
            {pageSellers.total === 0 ? (
              <h1 className='text-center mt-5 not-found'>
                No ME's Found !!Please try again
              </h1>
            ) : (
              <>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <div>
                    {pageSellers?.data.map((seller, index) => (
                      <Link
                        key={seller.id}
                        className='single-queen-link'
                        to={`/sellers/details/${seller.id}`}
                      >
                        <SellersPage seller={seller} serial={index + 1} />
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div className='text-center mt-5'>
            {isLoading === false && pageSellers?.total > 50 && (
              <Pagination
                currentPage={Number(page) || 1}
                totalData={pageSellers.total}
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

export default SeeAllSellers;
