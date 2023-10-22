import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetcher from '../../helpers/fetchApi';
import Pagination from '../../pages/Pagination/Pagination';
import OrderPage from '../SearhContentPage/OrderPage';
import Spinner from '../Spinner';
const initialState = {
  filteredDate2: '',
  filteredDate3: '',
};
const SeeAllOrders = () => {
  const params = new URLSearchParams(document.location.search);
  let page = params.get('page');
  let type = params.get('type');
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [pageOrders, setpageOrders] = useState({ data: [], total: null });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let uri = '/api/orders/get/all/date-range/all';
    let pageNumber = 0;
    if (type) {
      if (type === 'all') {
        uri = '/api/orders/get/all/date-range/all';
      } else {
        uri = `/api/orders/get/all/date-range/${type}`;
      }
    }

    if (page) {
      pageNumber = (page - 1) * 50;
    }

    (async function () {
      setIsLoading(true);
      const { data } = await fetcher.get({
        url: `${uri}?limit=50&skip=${pageNumber}`,
      });
      setpageOrders(data);
      console.log(data);
      setIsLoading(false);
    })();
  }, [page, type]);

  const paginate = async (pageNumber) => {
    if (type) {
      navigate(`/orders/all?type=${type}&page=${pageNumber}`);
    } else {
      navigate(`/orders/all?page=${pageNumber}`);
    }
  };

  const handleRangerFilterByDate = async () => {
    let uri = `/api/orders/get/all/date-range/all?from=${state.filteredDate2}&to=${state.filteredDate3}`;

    if (
      type === 'pending' ||
      type === 'approved' ||
      type === 'rejected' ||
      type === 'delivered' ||
      type === 'shipped'
    ) {
      uri = `/api/orders/get/all/date-range/${type}?from=${state.filteredDate2}&to=${state.filteredDate3}`;
    }
    setIsLoading(true);
    const { data } = await fetcher.get({
      url: `${uri}&limit=50&skip=0`,
    });

    console.log(data);
    setpageOrders({ ...pageOrders, data: data.data, total: data.total });
    setState({ ...state, filteredDate: '' });

    setIsLoading(false);
  };

  const handleType = (value) => {
    navigate(`/orders/all?type=${value}`);
  };

  return (
    <div className='content'>
      <main>
        <div>
          <h1>
            All {type} Orders {pageOrders.total}
          </h1>
          <div className='filter-section mb-4'>
            <div>
              <select
                name='selectType'
                id='selectType'
                onChange={(e) => handleType(e.target.value)}
                defaultValue={type || 'all'}>
                <option value='all'>All</option>
                <option value='pending'>Pending</option>
                <option value='approved'>Approved</option>
                <option value='shipped'>Shipped</option>
                <option value='delivered'>Delivered</option>
                <option value='rejected'>Rejected</option>
              </select>
            </div>
            <div>
              <div className='range-date-section '>
                <div>
                  <h3 className='mb-2 filter-title'>
                    Filter Queen by multiple Date Range
                  </h3>
                  <div
                    style={{ height: '54%' }}
                    className='d-flex align-items-center multiple-date-range'>
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
                        }>
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <>
            {pageOrders.length === 0 ? (
              <h1 className='text-center mt-5'>
                No Order Found !!Please try again
              </h1>
            ) : (
              <div>
                <div style={{ overflowX: 'auto', borderRadius: '5px' }}>
                  <table width='100%'>
                    <thead>
                      <tr>
                        <th width='5%'>SL</th>
                        <th width=''>Order Id</th>
                        <th width=''>Customer Name</th>
                        <th width=''>Order Date</th>
                        <th width=''>Status</th>
                        <th width=''>Note</th>
                        <th width=''>Expand</th>
                        <th width=''>Show</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageOrders.data.map((singleItem, index) => (
                        <OrderPage
                          key={singleItem.id}
                          order={singleItem}
                          serial={index + 1}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {pageOrders.total > 50 && (
              <div className='text-center mt-5'>
                <Pagination
                  currentPage={Number(page) || 1}
                  totalData={pageOrders.total}
                  paginate={paginate}
                  selectedPage={Number(page) || 1}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SeeAllOrders;
