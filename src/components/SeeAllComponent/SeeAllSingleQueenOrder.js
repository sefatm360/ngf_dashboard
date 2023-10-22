import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetcher from '../../helpers/fetchApi';
import Pagination from '../../pages/Pagination/Pagination';
import OrderPage from '../SearhContentPage/OrderPage';
import Spinner from '../Spinner';

const SeeAllSingleQueenOrder = () => {
  const params = new URLSearchParams(document.location.search);
  let page = params.get('page');
  let status = params.get('status');
  let queen = params.get('queen');
  const navigate = useNavigate();

  const [pageOrders, setpageOrders] = useState({ data: [], total: null });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let uri = `/andro/api/orders/get/all/by-status/queen/${queen}/${status}`;
    if (status == 'all') {
      uri = `/api/orders/get/all/queen/${queen}`;
    }
    (async function () {
      setIsLoading(true);
      const { data } = await fetcher.get({
        url: `${uri}?limit=50&skip=${currentPage}`,
      });

      setpageOrders(data);
      setIsLoading(false);
    })();
  }, [page, status]);

  const paginate = async (pageNumber) => {
    setCurrentPage(pageNumber);
    if (status) {
      navigate(`/me/orders?status=${status}&page=${pageNumber}`);
    } else {
      navigate(`/me/orders?status=all&page=${pageNumber}`);
    }
  };

  const handleType = (value) => {
    navigate(`/me/orders?status=${value}&queen=${queen}`);
  };

  return (
    <div className='content'>
      <main>
        <div>
          <h1>
            All {status} Orders {pageOrders.total}
          </h1>
          <select
            name='selectType'
            id='selectType'
            onChange={(e) => handleType(e.target.value)}
            defaultValue={status}
          >
            <option value='all'>All</option>
            <option value='pending'>Pending</option>
            <option value='approved'>Approved</option>
            <option value='shipped'>Shipped</option>
            <option value='delivered'>Delivered</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <>
            {pageOrders.data.length === 0 ? (
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
                          key={singleItem.order_id}
                          order={singleItem}
                          serial={index + 1}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* {pageOrders.total > 40 && (
              <div className='text-center mt-5'>
                <Pagination
                  currentPage={Number(currentPage)}
                  totalData={pageOrders.total}
                  paginate={paginate}
                  selectedPage={Number(currentPage)}
                />
              </div>
            )} */}
          </>
        )}
      </main>
    </div>
  );
};

export default SeeAllSingleQueenOrder;
