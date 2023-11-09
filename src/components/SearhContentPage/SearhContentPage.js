import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QueensPages from './QueensPages';
import ProductPage from './ProductPage';
import OrderPage from './OrderPage';
import GigsPage from './GigsPage';
import TrainingPage from './TrainingPage';
import fetcher from '../../helpers/fetchApi';
import Spinner from '../Spinner';

const SearhContentPage = () => {
  const { type } = useParams();
  const [item, setItem] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('type');
  const search = queryParams.get('search');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: `/api/admin/search/${type}/${id}?search=${search}`,
      });

      setItem(data.data);
      setIsLoading(false);
    })();
  }, [search, id, type]);

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div className='search-content-section'>
            {isLoading === true ? (
              <Spinner />
            ) : (
              <div>
                {type === 'queens' ? (
                  <>
                    <div className='queen-page-content'>
                      {item.length === 0 ? (
                        <h1 className='text-center mt-5 not-found'>
                          No ME's Found !! Please try again
                        </h1>
                      ) : (
                        <div>
                          {item?.map((queen) => (
                            <Link
                              key={queen.id}
                              className='single-queen-link'
                              to={`/me/details/${queen.id}`}
                            >
                              <QueensPages queen={queen} />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : type === 'products' ? (
                  <>
                    <div>
                      {item.length === 0 ? (
                        <h1 className='text-center mt-5 not-found'>
                          No Product Found !! Please try again
                        </h1>
                      ) : (
                        <div style={{ overflowX: 'auto', borderRadius: '5px' }}>
                          <table width='100%'>
                            <thead>
                              <tr>
                                <th width='5%'>SL</th>
                                <th width='35%'>Product</th>
                                <th width='25%'>ME</th>
                                <th width='10%'>Category</th>
                                <th width='10%'>Status</th>
                                <th width='10%'>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.map((product, index) => (
                                <ProductPage
                                  key={product.id}
                                  product={product}
                                  serial={index + 1}
                                />
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </>
                ) : type === 'orders' ? (
                  <>
                    {item.length === 0 ? (
                      <h1 className='text-center mt-5'>
                        No Order Found !!Please try again
                      </h1>
                    ) : (
                      <div
                        style={{ borderRadius: '5px' }}
                        className='table-responsive'
                      >
                        <table width='100%'>
                          <thead>
                            <tr>
                              <th>SL</th>
                              <th>Order Id</th>
                              <th>Customer Name</th>
                              <th>Order Date</th>
                              <th>Status</th>
                              <th>Note</th>
                              <th>Expand</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item?.map((singleItem, index) => (
                              <OrderPage
                                key={singleItem.id}
                                order={singleItem}
                                serial={index + 1}
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                ) : // <OrderPage item={item} />
                type === 'gigs' ? (
                  <GigsPage />
                ) : type === 'training' ? (
                  <TrainingPage />
                ) : (
                  ''
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearhContentPage;
