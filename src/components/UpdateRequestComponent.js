import React from 'react';
import { url } from '../helpers/constants';

const UpdateRequestComponent = ({
  updateRequest,
  handelApproved,
  handelRejected,
}) => {
  return (
    <div style={{ marginLeft: '20px' }}>
      {updateRequest?.product_id ? (
        <div>
          <h3>Update Request</h3>
          <hr />
          <div
            style={{
              display: 'flex',
              gap: '5px',
              margin: '10px 0px',
            }}
          >
            <div>
              <button
                className='view-button'
                onClick={() => handelApproved(updateRequest.product_id)}
              >
                Approved <span className='las la-arrow-right'></span>
              </button>
            </div>
            <div>
              <button
                className='view-button'
                onClick={() => handelRejected(updateRequest.product_id)}
              >
                Rejected <span className='las la-arrow-right'></span>
              </button>
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
                    }}
                  >
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
                    }}
                  >
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
        </div>
      ) : (
        'No update request of this product'
      )}
    </div>
  );
};

export default UpdateRequestComponent;
