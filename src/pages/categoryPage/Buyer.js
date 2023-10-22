import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { useCustomerContext } from '../../contexts/customerContext';
import { limit } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import Pagination from '../Pagination/Pagination';

const Buyer = () => {
  const { customers } = useCustomerContext();
  const [users, setUsers] = useState(customers);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 100;

  // pagination data
  // const [totalData, setTotalData] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      const { data } = await fetcher.get({
        url: `/out/api/buyer/get/all/by/status/and/all/all?skip=0&limit=${limit}`,
      });

      console.log({ data });

      setUsers(data);
      setIsLoading(false);
      // let totalData = data.data.total;
      // setTotalData(totalData);
    })();
  }, [customers]);

  // const paginate = async (pageNumber) => {
  //   setCurrentPage(pageNumber);
  //   setSelectedPage(pageNumber);

  //   const { data } = await fetcher.get({
  //     url: `/api/customer/get/all?limit=${limit}&skip=${
  //       (pageNumber - 1) * limit
  //     }`,
  //   });

  //   setUsers(data.data);
  //   window.scrollTo({
  //     top: 0,
  //   });
  // };

  return (
    <div className='content'>
      <main>
        <h1 className='page-header-title' style={{ marginLeft: '21px' }}>
          All Buyer
        </h1>
        {isLoading ? (
          <>
            <div className='show-modal-back'></div>
            <Spinner />
          </>
        ) : (
          <div className='customer-wrapper'>
            {users.data?.map((user) => {
              const { name, phone, address } = user;

              return (
                <div className='customer' key={phone}>
                  <div>
                    <h3>Name: {name}</h3>
                    <h3>Phone: {phone}</h3>
                    {/* <h5>Address: {address}</h5> */}
                  </div>
                </div>
              );
            })}

            {/* {totalData > 20 && (
              <div className='text-center'>
                <Pagination
                  currentPage={currentPage}
                  totalData={totalData}
                  paginate={paginate}
                  selectedPage={selectedPage}
                />
              </div>
            )} */}
          </div>
        )}
      </main>
    </div>
  );
};

export default Buyer;
