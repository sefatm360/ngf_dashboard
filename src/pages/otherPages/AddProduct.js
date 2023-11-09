import React, { useState, useReducer } from 'react';
import { RiImageEditFill } from 'react-icons/ri';
import { BiImageAdd } from 'react-icons/bi';
import { SET_SINGLE_VALUE } from '../../components/editModals/editModalConstants';
import reducer from '../../components/editModals/editModalReducers/modalReducer';
import { url } from '../../helpers/constants';
import { useSearchParams } from 'react-router-dom';

const AddProduct = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let [searchParams] = useSearchParams();
  const queenId = searchParams.get('queenId');
  const queenName = searchParams.get('name');
  const initialState = { queen_id: queenId };
  const [state, dispatch] = useReducer(reducer, initialState);
  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const handleAddProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    Object.keys(state).forEach((key) => {
      formData.append(key, state[key]);
    });
    formData.append('product_picture_1', image1);
    if (image2) {
      formData.append('product_picture_2', image2);
    }

    fetch(`${url}/api/admin/product/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsLoading(false);
          setImage1(null);
          setImage2(null);
          alert('Product added successfully!');
        } else {
          setIsLoading(false);
          alert('Something is wrong!');
        }
      });
  };

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div>
            <h3>Add A Product For a queen</h3>
          </div>
          <div>
            <form onSubmit={handleAddProduct}>
              <div style={{ textAlign: 'center' }}>
                <input value='Reset Form' type='reset' />
              </div>
              <div className='mb-4' style={{ textAlign: 'center' }}>
                <p className='fw-bold'>Add Product Images:</p>
                <small>(you have to add two images per product)</small>
              </div>
              <div className='add-product-image-container'>
                <div className='form-image-container'>
                  {image1 ? (
                    <>
                      <img
                        className='form-image'
                        src={URL.createObjectURL(image1)}
                        alt=''
                      />
                      <label htmlFor='file1' className='form-image-edit'>
                        <RiImageEditFill />
                        <input
                          style={{ display: 'none' }}
                          type='file'
                          id='file1'
                          accept='.jpg, .png, .jpeg'
                          onChange={(e) => setImage1(e.target.files[0])}
                        />
                      </label>
                    </>
                  ) : (
                    <label htmlFor='file1'>
                      <BiImageAdd
                        style={{ fontSize: '30px', cursor: 'pointer' }}
                      />
                      <input
                        style={{ display: 'none' }}
                        type='file'
                        id='file1'
                        accept='.jpg, .png, .jpeg'
                        onChange={(e) => setImage1(e.target.files[0])}
                      />
                    </label>
                  )}
                </div>
                <div className='form-image-container'>
                  {image2 ? (
                    <>
                      <img
                        className='form-image'
                        src={URL.createObjectURL(image2)}
                        alt=''
                      />
                      <label htmlFor='file2' className='form-image-edit'>
                        <RiImageEditFill />
                        <input
                          style={{ display: 'none' }}
                          type='file'
                          id='file2'
                          accept='.jpg, .png, .jpeg'
                          onChange={(e) => setImage2(e.target.files[0])}
                        />
                      </label>
                    </>
                  ) : (
                    <label htmlFor='file2'>
                      <BiImageAdd
                        style={{ fontSize: '30px', cursor: 'pointer' }}
                      />
                      <input
                        style={{ display: 'none' }}
                        type='file'
                        id='file2'
                        accept='.jpg, .png, .jpeg'
                        onChange={(e) => setImage2(e.target.files[0])}
                      />
                    </label>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <div className='mt-3'>
                  <p className='fw-bold'>ME {queenName}</p>
                  <input
                    className='sign-up-input w-25'
                    value={`NGF-Q${queenId}`}
                    disabled
                    maxLength='250'
                    type='text'
                    placeholder='Enter ME Id'
                  />
                </div>
                <div className='mt-3'>
                  <p className='fw-bold'>Product Name:</p>
                  <input
                    required
                    className='sign-up-input w-75'
                    onChange={(e) =>
                      dispatch({
                        type: SET_SINGLE_VALUE,
                        payload: {
                          field: 'product_name',
                          value: e.target.value,
                        },
                      })
                    }
                    maxLength='250'
                    type='text'
                    placeholder='Enter product name'
                  />
                </div>
                <div className='mt-3'>
                  <p className='fw-bold'>Product Category:</p>
                  <select
                    required
                    className='sign-up-input w-50'
                    onChange={(e) =>
                      dispatch({
                        type: SET_SINGLE_VALUE,
                        payload: { field: 'category', value: e.target.value },
                      })
                    }
                    defaultValue=''
                    name='category'
                    id='category'
                  >
                    <option hidden value=''>
                      Select Category
                    </option>
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
                    <option value='KurtiAndPants'>
                      Single kurti &amp; Pants
                    </option>
                    <option value='SalwarKameez'>Salwar kameez</option>
                    <option value='LadiesShoes'>Ladies Shoes</option>
                    <option value='Jewellery'>Jewellery</option>
                    <option value='CoupleCollection'>Couple Collection</option>
                    <option value='HijabBorkhaGown'>
                      Hijab Borkha &amp; Gown
                    </option>
                    <option value='FashionAccessories'>
                      Fashion Accessories
                    </option>
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
                </div>
                <div className='mt-3'>
                  <p className='fw-bold'>Delivery Days:</p>
                  <select
                    required
                    className='sign-up-input w-25'
                    onChange={(e) =>
                      dispatch({
                        type: SET_SINGLE_VALUE,
                        payload: {
                          field: 'delivery_day',
                          value: e.target.value,
                        },
                      })
                    }
                    name='delivery_day'
                    id='delivery_day'
                  >
                    {dates.map((date) => {
                      return (
                        <option value={date} key={date}>
                          {date}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='mt-3'>
                  <p className='fw-bold'>Product Price:</p>
                  <input
                    required
                    onChange={(e) =>
                      dispatch({
                        type: SET_SINGLE_VALUE,
                        payload: {
                          field: 'price',
                          value: e.target.value,
                        },
                      })
                    }
                    type='number'
                    className='sign-up-input '
                    placeholder='Enter product price '
                  />
                </div>
                <div className='mt-3'>
                  <p className='fw-bold'>Weight:</p>
                  <input
                    required
                    onChange={(e) =>
                      dispatch({
                        type: SET_SINGLE_VALUE,
                        payload: {
                          field: 'weight',
                          value: e.target.value,
                        },
                      })
                    }
                    max={10}
                    min={0}
                    step='0.1'
                    type='number'
                    className='w-50 sign-up-input'
                    placeholder='0 to 10kg'
                  />
                </div>
                <div className='mt-3'>
                  <p className='fw-bold'>Enter Product Tags:</p>
                  <textarea
                    onChange={(e) =>
                      dispatch({
                        type: SET_SINGLE_VALUE,
                        payload: {
                          field: 'tags',
                          value: e.target.value,
                        },
                      })
                    }
                    required
                    maxLength='500'
                    rows='2'
                    className='w-100 sign-up-input'
                    placeholder='Enter some tags that related to your product for find this product easily'
                  ></textarea>
                </div>
                <div className='mt-3'>
                  <p className='fw-bold'>Enter Product Details:</p>
                  <textarea
                    onChange={(e) =>
                      dispatch({
                        type: SET_SINGLE_VALUE,
                        payload: {
                          field: 'short_desc',
                          value: e.target.value,
                        },
                      })
                    }
                    required
                    maxLength='999'
                    rows='4'
                    className='w-100 sign-up-input'
                    placeholder='Enter all the details of your product'
                  ></textarea>
                </div>
              </div>

              {isLoading ? (
                <div className='d-flex align-items-center'>
                  <input
                    className='next-btn'
                    type='submit'
                    disabled
                    value='Please wait...'
                  />
                </div>
              ) : (
                <input
                  className='next-btn '
                  type='submit'
                  value='Add Product'
                />
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProduct;
