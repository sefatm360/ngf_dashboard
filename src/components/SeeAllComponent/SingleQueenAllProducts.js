import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import Spinner from '../Spinner';

const SingleQueenAllProducts = () => {
  const { id, status } = useParams();
  const [allProducts, setallProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/admin/product/get/all/by-queen/for-queen/${id}`,
      });
      setallProducts(data.data);
      setIsLoading(false);
    })();
  }, [id, status]);

  const filterData = allProducts.filter((product) => product.status === status);

  return (
    <div className='content'>
      <main>
        <div>
          {isLoading ? (
            <Spinner />
          ) : (
            <div>
              {filterData.length ? (
                <div>
                  <table width='100%'>
                    <thead>
                      <tr>
                        <td> All Product</td>
                      </tr>
                    </thead>
                    <tbody>
                      {filterData.map((product, index) => {
                        const { product_name, id, product_picture_1 } = product;
                        return (
                          <tr key={id}>
                            <td>
                              <span style={{ marginRight: '10px' }}>
                                {index + 1}
                              </span>
                            </td>
                            <td>
                              <div className='box-container'>
                                <div className='image-box'>
                                  <span className='product-list-page-img'>
                                    <img
                                      src={`${url}/get/image/products/${product_picture_1}`}
                                      width='40px'
                                      height='40px'
                                      alt=''
                                    />
                                  </span>
                                </div>
                                <div className='box-content'>
                                  <span className='product-list-page-name primary'>
                                    {product_name}
                                  </span>
                                  <br />
                                </div>
                              </div>
                            </td>

                            <td>
                              <Link to={`/products/details/${id}`}>
                                <button className='view-button'>
                                  View{' '}
                                  <span className='las la-arrow-right'></span>
                                </button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ textAlign: 'center', marginTop: '40px' }}>
                  No Product available{' '}
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SingleQueenAllProducts;
