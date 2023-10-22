import React, { useEffect, useReducer, useState } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { useAdminContext } from '../../contexts/adminContext';
import { HIDE_MODAL, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import { SET_INITIAL_STATE, SET_SINGLE_VALUE } from './editModalConstants';
import reducer from './editModalReducers/modalReducer';

const ProductEditModal = ({ data, setUpdateSpinner }) => {
  const { dispatch: adminDispatch } = useAdminContext();
  const { product, setProduct, setImage } = data;
  const [productPicutre1, setProductPicture1] = useState(null);
  const [productPicutre2, setProductPicture2] = useState(null);
  const [state, dispatch] = useReducer(reducer, product || {});

  const {
    id,
    product_name,
    category,
    product_picture_1,
    product_picture_2,
    price,
    delivery_day,
    short_desc,
    status,
    tags,
    stock_status,
    weight,
  } = state;

  useEffect(() => {
    dispatch({ type: SET_INITIAL_STATE, payload: product || {} });
  }, [data]);

  const formData = new FormData();

  const handleSubmit = async (e) => {
    Object.keys(state).forEach((element) => {
      if (element === 'product_picture_1' || element === 'product_picture_2') {
        return;
      }
      formData.append(element, state[element]);
    });

    if (productPicutre1) {
      formData.append('product_picture_1', productPicutre1);
      formData.append('prev_1', product_picture_1);
    }

    if (productPicutre2) {
      formData.append('product_picture_2', productPicutre2);
      formData.append('prev_2', product_picture_2);
    }

    setUpdateSpinner(true);
    e.preventDefault();

    const { data } = await fetcher.put({
      url: `/api/admin/product/update/${id}`,
      cType: 'multipart/form-data',
      body: formData,
    });

    if (data) {
      setUpdateSpinner(false);
      if (data.success) {
        if (data.updatedImgs?.product_picture_1) {
          state.product_picture_1 = data.updatedImgs.product_picture_1;
          setImage(data.updatedImgs.product_picture_1);
        }
        if (data.updatedImgs?.product_picture_2) {
          state.product_picture_2 = data.updatedImgs.product_picture_2;
        }
        setProduct(state);
      }
      adminDispatch({ type: HIDE_MODAL });
    }
  };

  return !status ? null : (
    <>
      <div className='form-image-containers  mt-4'>
        <div className='form-image-container'>
          {productPicutre1 ? (
            <img
              className='form-image'
              src={URL.createObjectURL(productPicutre1)}
              alt=''
            />
          ) : (
            <img
              className='form-image'
              src={`${url}/get/image/products/${product_picture_1}`}
              alt=''
            />
          )}
          <label htmlFor='file1' className='form-image-edit'>
            <RiImageEditFill />
            <input
              style={{ display: 'none' }}
              type='file'
              id='file1'
              accept='.jpg, .png, .jpeg'
              onChange={(e) => setProductPicture1(e.target.files[0])}
            />
          </label>
        </div>
        {product_picture_2 && (
          <div className='form-image-container'>
            {productPicutre2 ? (
              <img
                className='form-image'
                src={URL.createObjectURL(productPicutre2)}
                alt=''
              />
            ) : (
              <img
                className='form-image'
                src={`${url}/get/image/products/${product_picture_2}`}
                alt=''
              />
            )}
            <label htmlFor='file2' className='form-image-edit'>
              <RiImageEditFill />
              <input
                style={{ display: 'none' }}
                type='file'
                id='file2'
                accept='.jpg, .png, .jpeg'
                onChange={(e) => setProductPicture2(e.target.files[0])}
              />
            </label>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='first-row'>
          <label htmlFor='productname'>
            <span>Product Name</span>
            <input
              type='text'
              id='productname'
              name='productname'
              placeholder='Product Name'
              style={{ width: 'auto' }}
              value={product_name}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'product_name', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='productcat'>
            <span>Product Category</span>
            <select
              id='productcat'
              name='productcat'
              style={{ width: 'auto' }}
              value={category}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'category', value: e.target.value },
                })
              }
            >
              <option value='Food'>Food</option>
              <option value='CakeAndPudding'>Cake And Pudding</option>
              <option value='FishCurry'>Fish Curry</option>
              <option value='MeatCurry'>Meat Curry</option>
              <option value='Biriyani'>Biriyani / Rice Items</option>
              <option value='Dessert'>Dessert</option>
              <option value='Pitha'>Pitha</option>
              <option value='VortaVaji'>Vorta Vaji</option>
              <option value='Pickle'>Pickle</option>
              <option value='OtherFood'>Other Food</option>
              <option value='Shirt'>Shirt</option>
              <option value='Pant'>Pant</option>
              <option value='Panjabi'>Panjabi</option>
              <option value='ShareeAndBlouse'>Sharee &amp; Blouse</option>
              <option value='KurtiAndPants'>Single kurti &amp; Pants</option>
              <option value='SalwarKameez'>Salwar kameez</option>
              <option value='LadiesShoes'>Ladies Shoes</option>
              <option value='Jewellery'>Jewellery</option>
              <option value='CoupleCollection'>Couple Collection</option>
              <option value='HijabBorkhaGown'>Hijab Borkha &amp; Gown</option>
              <option value='FashionAccessories'>Fashion Accessories</option>
              <option value='Grocery'>Grocery</option>
              <option value='MensFashion'>Men's Fashion</option>
              <option value='SkinCare'>Skin Care</option>
              <option value='HairCare'>Hair Care</option>
              <option value='MakeupItems'>Makeup Items</option>
              <option value='BabyProducts'>Baby Products</option>
              <option value='HomeDecor'>Home Decor</option>
              <option value='Accessories'>Accessories</option>
              <option value='Stationary'>Stationary</option>
              <option value='Toys'>Toys</option>
              <option value='Others'>Others</option>
            </select>
          </label>

          <label htmlFor='status'>
            <span>Status</span>
            <select
              id='status'
              name='status'
              style={{ width: 'auto' }}
              value={status}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'status', value: e.target.value },
                })
              }
            >
              <option value='Approved'>Approved</option>
              <option value='Pending'>Pending</option>
              <option value='Rejected'>Rejected</option>
              <option value='Disabled'>Deleted</option>
            </select>
          </label>

          <label htmlFor='stock_status'>
            <span>Stock Status</span>
            <select
              id='stock_status'
              name='stock_status'
              style={{ width: 'auto' }}
              value={stock_status}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: {
                    field: 'stock_status',
                    value: Number(e.target.value),
                  },
                })
              }
            >
              <option value={1}>In Stock</option>
              <option value={0}>Out of Stock</option>
            </select>
          </label>

          <label htmlFor='price'>
            <span>Price</span>
            <input
              type='text'
              id='price'
              name='price'
              placeholder='Price'
              style={{ width: 'auto' }}
              value={price}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'price', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='weight'>
            <span>Weight</span>
            <input
              type='text'
              id='weight'
              name='weight'
              placeholder='Product Weight'
              style={{ width: 'auto' }}
              defaultValue={weight}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'weight', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='delevarydate'>
            <span>Delivery Day</span>
            <input
              type='text'
              id='delevarydate'
              name='delevarydate'
              placeholder='Delevery date'
              style={{ width: 'auto' }}
              value={delivery_day}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'delivery_day', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='tags'>
            <span>Tags</span>
            <input
              type='text'
              id='tags'
              name='tags'
              value={tags}
              placeholder='Product Tags'
              style={{ width: 'auto' }}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'tags', value: e.target.value },
                })
              }
            />
          </label>

          <label htmlFor='desc'>
            <span>Description</span>
            <textarea
              id='desc'
              name='desc'
              rows='5'
              cols='50'
              placeholder='Description'
              style={{ width: 'auto' }}
              value={short_desc}
              onChange={(e) =>
                dispatch({
                  type: SET_SINGLE_VALUE,
                  payload: { field: 'short_desc', value: e.target.value },
                })
              }
            />
          </label>
        </div>

        <input type='submit' value='Submit' />
      </form>
    </>
  );
};

export default ProductEditModal;
