import React, { useEffect } from 'react';
import { useProductContext } from '../../contexts/productsContext';
import { FETCH_PRODUCT_UPDATE_REQUEST, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import ShowAllPendingproduct from './ShowAllPendingproduct';

const ProductsUpdataeRequest = () => {
  const { dispatch, pendingUpdates } = useProductContext();
  useEffect(() => {
    if (!pendingUpdates.length) {
      (async function () {
        const { data } = await fetcher.get({
          url: `/api/admin/product/get/all/update/pending/products`,
        });

  
        if (data.success) {
          dispatch({
            type: FETCH_PRODUCT_UPDATE_REQUEST,
            payload: { data: data.data, total: data.total },
          });
        }
      })();
    }
  }, []);

  return (
    <div className='content'>
      <main>
        {pendingUpdates.total ? (
          <div className='update-pending'>
            {pendingUpdates.data.map((product) => (
              <ShowAllPendingproduct
                product={product}
                key={product.product_id}
              />
            ))}
          </div>
        ) : (
          <p className='update-request'>No Update Request Here</p>
        )}
      </main>
    </div>
  );
};

export default ProductsUpdataeRequest;
