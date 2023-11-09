import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fetcher from '../../helpers/fetchApi';
import QueensPages from '../SearhContentPage/QueensPages';
import Pagination from '../../pages/Pagination/Pagination';
import Spinner from '../Spinner';

const initialState = {
  // filteredDate: '',
  filteredDate2: '',
  filteredDate3: '',
};

const SeeAllQueens = () => {
  const params = new URLSearchParams(document.location.search);
  let page = params.get('page');
  let type = params.get('type');
  let category = params.get('category');
  const [pageQueens, setPageQueens] = useState({ data: [], total: null });
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    let pageNumber = 0;
    let uri = '/api/admin/queen/getby/category/status/all/all';

    if (type && category) {
      uri = `/api/admin/queen/getby/category/status/${category}/${type}`;
    } else if (type) {
      uri = `/api/admin/queen/getby/category/status/all/${type}`;
    } else if (category) {
      uri = `/api/admin/queen/getby/category/status/${category}/all`;
    }

    if (page) {
      pageNumber = (page - 1) * 50;
    }

    (async function () {
      setIsLoading(true);
      const { data } = await fetcher.get({
        url: `${uri}?limit=50&skip=${pageNumber}`,
      });
      if (data.success) {
        setPageQueens(data);
      }
      setState({
        // filteredDate: '',
        filteredDate2: '',
        filteredDate3: '',
      });
      setIsLoading(false);
    })();
  }, [page, type, category]);

  const paginate = (pageNumber) => {
    if (type && category) {
      navigate(`/me/all?category=${category}type=${type}&page=${pageNumber}`);
    } else if (type && !category) {
      navigate(`/me/all?type=${type}&page=${pageNumber}`);
    } else if (category && !type) {
      navigate(`/me/all?category=${category}&page=${pageNumber}`);
    } else {
      navigate(`/me/all?page=${pageNumber}`);
    }
  };

  const handleRangerFilterByDate = async () => {
    let uri = `/api/admin/queen/getby/date/range?from=${state.filteredDate2}&to=${state.filteredDate3}`;

    if (type === 'pending' || type === 'approved' || type === 'rejected') {
      uri = `/api/admin/queen/getby/date/range/${type}?from=${state.filteredDate2}&to=${state.filteredDate3}`;
    }
    setIsLoading(true);
    const { data } = await fetcher.get({
      url: uri,
    });
    setState({ ...state, filteredDate: '' });
    setPageQueens(data);
    setIsLoading(false);
  };

  // Single day filter handler commented
  /*   const handleFilterByDate = async () => {
    let uri = `/api/admin/queen/getby/date?date=${state.filteredDate}`;
    if (type === 'pending' || type === 'approved' || type === 'rejected') {
      uri = `/api/admin/queen/getby/date/${type}?date=${state.filteredDate}`;
    }
    const { data } = await fetcher.get({
      url: uri,
    });

    setState({ ...state, filteredDate2: '', filteredDate3: '' });
    setPageQueens(data);
  }; */

  const handleChangeType = (type) => {
    if (category) {
      navigate(`/me/all/?category=${category}&type=${type}`);
    } else {
      navigate(`/me/all?type=${type}`);
    }
  };

  const handleChangeCategory = (category) => {
    if (type) {
      navigate(`/me/all/?category=${category}&type=${type}`);
    } else {
      navigate(`/me/all?category=${category}`);
    }
  };

  return (
    <div className='content'>
      <main>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <h1 className='mt-0 ml-0'>
              {type} queens: {pageQueens.total || pageQueens.data.length}
            </h1>
            <div className='filter-queen-section mb-4'>
              <div>
                <h4>Status</h4>
                <select
                  style={{ width: '200px' }}
                  id='selectType'
                  name='selectType'
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
                <h4>Category</h4>
                <select
                  style={{ width: '200px' }}
                  id='selectCategory'
                  name='selectCategory'
                  onChange={(e) => handleChangeCategory(e.target.value)}
                  defaultValue={category || 'All'}
                >
                  <option value='all'>All</option>
                  <option value='Food'>Food</option>
                  <option value='Food and others'>Food and others</option>
                  <option value='Dress'>Dress</option>
                  <option value='Jewellery'>Jewellery</option>
                  <option value='Home decor'>Home decor</option>
                  <option value='Others'>Others</option>
                </select>
              </div>
              <div>
                <div className='range-date-section '>
                  <div>
                    <h3 className='mb-2 filter-title'>
                      Filter ME by multiple Date Range
                    </h3>
                    <div
                      style={{ height: '54%' }}
                      className='d-flex align-items-center multiple-date-range'
                    >
                      <div>
                        <input
                          type='date'
                          onChange={(e) => {
                            setState({
                              ...state,
                              filteredDate2: e.target.value,
                            });
                          }}
                          name=''
                          id=''
                          value={state.filteredDate2}
                        />
                      </div>
                      <div className='ml-2'>
                        <input
                          type='date'
                          onChange={(e) => {
                            setState({
                              ...state,
                              filteredDate3: e.target.value,
                            });
                          }}
                          name=''
                          id=''
                          value={state.filteredDate3}
                        />
                      </div>
                      <div style={{ height: '100%' }}>
                        <button
                          style={{ height: '100%' }}
                          className='apply-btn ml-3'
                          onClick={handleRangerFilterByDate}
                          disabled={
                            state.filteredDate2 && state.filteredDate3
                              ? false
                              : true
                          }
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 
            //// Get queen by single day select option is commented
                <div>
              <h3 className='mb-2 filter-title'>Filter ME by date</h3>
              <div className=' filter-queen-by-date'>
                <div>
                  <input
                    style={{ width: '35%' }}
                    type='date'
                    onChange={(e) => {
                      setState({
                        ...state,
                        filteredDate: e.target.value,
                      });
                    }}
                    name=''
                    id=''
                    value={state.filteredDate}
                  />
                </div>
                <div style={{ height: '100%' }}>
                  <button
                    style={{ height: '100%' }}
                    className='apply-btn ml-3'
                    disabled={state.filteredDate === '' ? true : false}
                    onClick={handleFilterByDate}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
            
            */}
            </div>
            <div className={`queen-page-content`}>
              {pageQueens.total === 0 ? (
                <h1 className='text-center mt-5 not-found'>
                  No ME's Found !!Please try again
                </h1>
              ) : (
                <div>
                  {pageQueens.data.map((queen, index) => (
                    <Link
                      key={queen.id}
                      className='single-queen-link'
                      to={`/me/details/${queen.id}`}
                    >
                      <QueensPages queen={queen} serial={index + 1} />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className='text-center mt-5'>
              {state.filteredDate3 === '' &&
                state.filteredDate2 === '' &&
                isLoading === false && (
                  <Pagination
                    currentPage={Number(page) || 1}
                    totalData={pageQueens.total}
                    paginate={paginate}
                    selectedPage={Number(page) || 1}
                  />
                )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SeeAllQueens;
