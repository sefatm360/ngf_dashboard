import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import UpdateRequestComponent from '../../components/UpdateRequestComponent';
import { useAdminContext } from '../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { dispatch: adminDispatch } = useAdminContext();
  const [isLoading, setIsLoading] = useState(true);
  const [updateRequest, setUpdateRequest] = useState({});

  useEffect(() => {
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/admin/product/get/for-admin/${id}?all=true`,
      });
      console.log(data);
      if (data.success) {
        setProduct(data.data);
      }
      setIsLoading(false);
    })();
  }, [id]);
  // update request single product
  useEffect(() => {
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/admin/product/get/update/product/request/${id}`,
      });
      setUpdateRequest(data.data);
    })();
  }, [id]);

  const {
    queen_name,
    category,
    product_picture_1,
    product_picture_2,
    price,
    delivery_day,
    short_desc,
    status,
    tags,
    stock_status,
    queen_id,
    upload_date,
  } = product;

  const [image, setImage] = useState(product_picture_1);

  useEffect(() => {
    setImage(product_picture_1);
  }, [product_picture_1]);

  const imageHandler = (image) => {
    setImage(image);
  };

  const handleClick = () => {
    adminDispatch({
      type: SHOW_MODAL,
      payload: { setProduct, product, setImage },
    });
  };

  const handelApproved = async (productId) => {
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      const { data } = await fetcher.put({
        url: `/api/admin/product/approve/update/${productId}`,
      });

      if (data.success) {
        Object.keys(updateRequest).forEach((item) => {
          if (updateRequest[item]) {
            product[item] = updateRequest[item];
          }
        });
        setProduct(product);
        if (updateRequest.product_picture_1) {
          setImage(updateRequest.product_picture_1);
        }
        setUpdateRequest({});
        alert(data.message);
      }
    }
  };

  const handelRejected = async (productId) => {
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      const { data } = await fetcher.put({
        url: `/api/admin/product/reject/update/${productId}`,
      });

      if (data.success) {
        setUpdateRequest({});
        alert(data.message);
      }
    }
  };

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          {isLoading ? (
            <>
              <div className='show-modal-back'></div>
              <Spinner />
            </>
          ) : (
            <div>
              <div className='link-container'>
                <p className='dis-link'>
                  <Link to='/products' className='link'>
                    /products
                  </Link>
                  /
                  <span className='text-black'>
                    {product?.product_name}{' '}
                    <small className='fw-bold'>
                      {stock_status ? 'Stock Avilable' : 'Out of Stock'}
                    </small>
                  </span>
                </p>
              </div>

              <div style={{ margin: '10px 0' }}>
                <h4>
                  (Product ID: OTW-P{id}){' '}
                  {status === 'Approved' && (
                    <a
                      className='button'
                      href={`https://onthe-way.com/product/${id}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      style={{ color: 'white' }}
                    >
                      View On Website
                    </a>
                  )}
                </h4>

                <div className='request-div-text'>
                  <p>Upload Date: {moment(upload_date).format('MMM Do YY')}</p>
                </div>
              </div>
              <div className='product-details-wrapper'>
                <div className='product-page-container'>
                  <div className='product-img-slot'>
                    <img
                      style={{
                        width: '300',
                        height: '300',
                        maxWidth: 300,
                        maxHeight: 300,
                      }}
                      className='product-pic'
                      src={`${url}/get/image/products/${image}`}
                      alt=''
                    />
                    <br />
                  </div>
                  <div className='pagination-setup'>
                    <img
                      className={`square-img ${
                        image === product_picture_1 && 'active-img'
                      }`}
                      src={`${url}/get/image/products/${product_picture_1}`}
                      alt=''
                      onClick={() => imageHandler(product_picture_1)}
                    />

                    {product_picture_2 && (
                      <img
                        className={`square-img margin-left ${
                          image === product_picture_2 && 'active-img'
                        }`}
                        src={`${url}/get/image/products/${product_picture_2}`}
                        alt=''
                        onClick={() => imageHandler(product_picture_2)}
                      />
                    )}
                    <button
                      className='margin-left-40 cmn-btn'
                      onClick={handleClick}
                    >
                      Edit Product
                    </button>
                  </div>
                </div>
                <UpdateRequestComponent
                  updateRequest={updateRequest}
                  imageHandler={imageHandler}
                  handelApproved={handelApproved}
                  handelRejected={handelRejected}
                />
              </div>
              <div className='recent-grid product-details'>
                <div className='projects'>
                  <div className='card'>
                    <div className='card-header'>
                      <h3>Product Details</h3>
                    </div>
                    <div className='card-body'>
                      <div className='table-responsive'>
                        <table width='100%'>
                          <thead>
                            <tr>
                              <td>Product Name</td>
                              <td>Product Category</td>
                              <td>Queen Name </td>
                              <td>Price </td>
                              <td>Delivery Date </td>
                              <td>Status </td>
                              <td>Tags</td>
                              <td>Description </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{product?.product_name}</td>
                              <td>{category}</td>
                              <td>
                                <Link
                                  style={{ color: 'blue' }}
                                  to={`/me/details/${queen_id}`}
                                >
                                  {queen_name}
                                </Link>
                              </td>
                              <td>&#2547;{price}</td>
                              <td>{delivery_day}</td>
                              <td>{status}</td>
                              <td>{tags}</td>
                              <td>{short_desc}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductDetails;
