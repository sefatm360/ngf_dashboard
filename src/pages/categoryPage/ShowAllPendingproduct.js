import React from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../contexts/productsContext';
import { FETCH_PRODUCT_UPDATE_REQUEST, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const ShowAllPendingproduct = ({ product: updateRequest }) => {
  const { dispatch, pendingUpdates } = useProductContext();



  // handel approved function
  const handelApproved = async (productId) => {
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      const { data } = await fetcher.put({
        url: `/api/admin/product/approve/update/${productId}`,
      });

      if (data.success) {
        const filterData = pendingUpdates.data.filter(
          (product) => product.product_id !== productId
        );

        dispatch({
          type: FETCH_PRODUCT_UPDATE_REQUEST,
          payload: { data: filterData, total: pendingUpdates.total - 1 },
        });
        alert(data.message);
      }
    }
  };
  // handel rejected function
  const handelRejected = async (productId) => {
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      const { data } = await fetcher.put({
        url: `/api/admin/product/reject/update/${productId}`,
      });

      if (data.success) {
        const filterData = pendingUpdates.data.filter(
          (product) => product.product_id !== productId
        );
        dispatch({
          type: FETCH_PRODUCT_UPDATE_REQUEST,
          payload: { data: filterData, total: pendingUpdates.total - 1 },
        });
        alert(data.message);
      }
    }
  };
  return (
    <div>
      {updateRequest?.product_id ? (
        <div>
          <hr />
          <div
            style={{
              display: 'flex',
              gap: '5px',
              margin: '10px 0px',
            }}>
            <div>
              <button
                className='view-button'
                onClick={() => handelApproved(updateRequest.product_id)}>
                Approved <span className='las la-arrow-right'></span>
              </button>
            </div>
            <div>
              <button
                className='view-button'
                onClick={() => handelRejected(updateRequest.product_id)}>
                Rejected <span className='las la-arrow-right'></span>
              </button>
            </div>
            <div>
              <Link
                to={`/products/details/${updateRequest.product_id}`}
                className='view-button'>
                View <span className='las la-arrow-right'></span>
              </Link>
            </div>
          </div>
          <div>
            <span>
              <div style={{ display: 'flex', gap: '10px' }}>
                {updateRequest.product_picture_1 && (
                  <div
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'contain',
                    }}>
                    <img
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                      src={`${url}/get/image/products/${updateRequest.product_picture_1}`}
                      alt=''
                    />
                  </div>
                )}
                {updateRequest.product_picture_2 && (
                  <div
                    style={{
                      width: '200px',
                      height: '200px',
                    }}>
                    <img
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                      src={`${url}/get/image/products/${updateRequest.product_picture_2}`}
                      alt=''
                    />
                  </div>
                )}
              </div>
            </span>
          </div>
          <div>
            <ul>
              {updateRequest.product_name && (
                <li>
                  <span className='text-bold'>Product name:</span>{' '}
                  {updateRequest.product_name}
                </li>
              )}
              {updateRequest.category && (
                <li>
                  <span className='text-bold'>Category:</span>{' '}
                  {updateRequest.category}
                </li>
              )}
              {updateRequest.price && (
                <li>
                  <span className='text-bold'>Price:</span>{' '}
                  {updateRequest.price}
                </li>
              )}
              {updateRequest.weight && (
                <li>
                  <span className='text-bold'>Weight:</span>{' '}
                  {updateRequest.weight}
                </li>
              )}
              {updateRequest.delivery_charge && (
                <li>
                  <span className='text-bold'>Delivery Charge:</span>{' '}
                  {updateRequest.delivery_charge}
                </li>
              )}
              {updateRequest.delivery_day && (
                <li>
                  <span className='text-bold'>Delivery Day:</span>{' '}
                  {updateRequest.delivery_day}
                </li>
              )}
              {updateRequest.stock_status && (
                <li>
                  <span className='text-bold'>Stock Status:</span>{' '}
                  {updateRequest.stock_status}
                </li>
              )}
              {updateRequest.tags && (
                <li>
                  <span className='text-bold'>Tags:</span> {updateRequest.tags}
                </li>
              )}
              {updateRequest.short_desc && (
                <li>
                  <span className='text-bold'>Description:</span>{' '}
                  {updateRequest.short_desc}
                </li>
              )}
            </ul>
          </div>
          <br />
        </div>
      ) : (
        'No update request of this product'
      )}
    </div>
  );
};

export default ShowAllPendingproduct;
