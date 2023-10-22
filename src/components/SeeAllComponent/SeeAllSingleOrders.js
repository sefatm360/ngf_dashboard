import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import fetcher from '../../helpers/fetchApi';
import Pagination from '../../pages/Pagination/Pagination';
import GigOrderPage from '../SearhContentPage/GigOrderPage';
import Spinner from '../Spinner';

const SeeAllSingleOrders = () => {
  const params = new URLSearchParams(document.location.search);
  let page = params.get('page');
  let type = params.get('type');
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageOrders, setpageOrders] = useState({ data: [], total: null });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    let uri = `/out/api/gig-order/get/all/by/seller/and/status/${id}/all`;
    let pageNumber = 0;
    if (type) {
      if (type === 'all') {
        uri = `/out/api/gig-order/get/all/by/seller/and/status/${id}/all`;
      } else {
        uri = `/out/api/gig-order/get/all/by/seller/and/status/${id}/${type}`;
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
      setIsLoading(false);
    })();
  }, [page, type]);

  const paginate = async (pageNumber) => {
    if (type) {
      navigate(
        `/sellers/details/${id}/gig-orders/all?type=${type}&page=${pageNumber}`
      );
    } else {
      navigate(`/sellers/details/${id}/gig-orders/all?page=${pageNumber}`);
    }
  };

  const handleType = (value) => {
    navigate(`/sellers/details/${id}/gig-orders/all?type=${value}`);
  };

  return (
    <div className='content'>
      <main>
        <div>
          <h1>
            {type} Gig Orders {pageOrders.total}
          </h1>
          <select
            name='selectType'
            id='selectType'
            onChange={(e) => handleType(e.target.value)}
            defaultValue={type || 'all'}>
            <option value='all'>All</option>
            <option value='pending'>Pending</option>
            <option value='approved'>Approved</option>
            <option value='delivered'>Delivered</option>
            <option value='rejected'>Rejected</option>
            <option value='reported'>Reported</option>
          </select>
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
              <div style={{ borderRadius: '5px' }} className='table-responsive'>
                <table width='100%'>
                  <thead>
                    <tr>
                      <td>Serial</td>
                      <td>Order Id</td>
                      <td>Gig</td>
                      <td>Order Date</td>
                      <td>Status</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {pageOrders.data.map((singleItem, index) => (
                      <GigOrderPage
                        key={singleItem.id}
                        order={singleItem}
                        serial={index + 1}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {pageOrders.total > 50 && (
              <div className='text-center mt-5'>
                <Pagination
                  currentPage={Number(page)}
                  totalData={pageOrders.total}
                  paginate={paginate}
                  selectedPage={Number(page)}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SeeAllSingleOrders;
