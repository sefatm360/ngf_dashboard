import React, { useRef, useState } from 'react';
import { AiFillCloseCircle, AiFillPrinter } from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
import OrderInvoicePage from './OrderInvoicePage';

const CustomQueenInvoice = () => {
  const [queenData, setQueenData] = useState({});
  const [otherData, setOtherData] = useState({
    commision: 20,
    order_date: new Date(),
    order_id: null,
  });
  const [products, setProducts] = useState([{ id: Date.now() }]);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Queen Invoice OTW-O${otherData.order_id}`,
  });

  const removeProduct = (e) => {
    const restInputs = products.filter((item) => item.id !== e);
    setProducts(restInputs);
  };

  const addProduct = (e) => {
    e.preventDefault();
    setProducts([
      ...products,
      {
        id: Date.now(),
        product_id: null,
        quantity: null,
        product_name: '',
        price: null,
      },
    ]);
  };

  const handlePreviewInvoice = (e) => {
    e.preventDefault();
    handlePrint();
  };

  const handleinputChange = ({ value, id, key }) => {
    const foundProduct = products.find((item) => item.id === id);
    foundProduct[key] = value;
    setProducts(products);
  };

  return (
    <>
      <div>
        <form action='' onSubmit={handlePreviewInvoice}>
          <div className='create-invoice-heading-button'>
            <h2>MAKE QUEEN INVOICE</h2>
            <label className='mt-3  ml-4 print-btn' htmlFor='print-btn'>
              <AiFillPrinter /> <span>Print</span>
              <input
                style={{ width: 'auto', display: 'none' }}
                type='submit'
                value='Print'
                id='print-btn'
                name='print-btn'
              />
            </label>
          </div>
          <div className='create-invoice-input-wrapper'>
            <div className='create-invoice-input-row'>
              <label htmlFor='order_date'>
                <span>Order Date</span>
                <input
                  onChange={(e) =>
                    setOtherData({
                      ...otherData,
                      order_date: e.target.value,
                    })
                  }
                  id='order_date'
                  name='order_date'
                  type='date'
                  defaultValue={new Date().toISOString().split('T')[0]}
                  required
                />
              </label>
              <label htmlFor='commision'>
                <span>Select Commision</span>
                <select
                  defaultValue={20}
                  name='commision'
                  id='commision'
                  onChange={(e) =>
                    setOtherData({ ...otherData, commision: e.target.value })
                  }
                  className='select-commision'
                >
                  <option value={0}>0%</option>
                  <option value={5}>5%</option>
                  <option value={10}>10%</option>
                  <option value={15}>15%</option>
                  <option value={20}>20%</option>
                </select>
              </label>
              <label htmlFor='queen_name'>
                <span>Queen Name</span>
                <input
                  type='text'
                  id='queen_name'
                  name='queen_name'
                  placeholder='Queen Name'
                  onChange={(e) =>
                    setQueenData({ ...queenData, name: e.target.value })
                  }
                  required
                />
              </label>
              <label htmlFor='queen_city'>
                <span>Queen City</span>
                <input
                  type='text'
                  id='queen_city'
                  name='queen_city'
                  placeholder='Queen City'
                  onChange={(e) =>
                    setQueenData({ ...queenData, city: e.target.value })
                  }
                  required
                />
              </label>
              <label htmlFor='post_code'>
                <span>Queen Post Code</span>
                <input
                  type='text'
                  id='post_code'
                  name='post_code'
                  placeholder='Queen Post Code'
                  onChange={(e) =>
                    setQueenData({ ...queenData, post_code: e.target.value })
                  }
                  required
                />
              </label>
            </div>
            <div className='create-invoice-input-row'>
              <label htmlFor='order_id'>
                <span>Order Id</span>
                <input
                  type='text'
                  id='order_id'
                  name='order_id'
                  placeholder='Order id'
                  onChange={(e) =>
                    setOtherData({ ...otherData, order_id: e.target.value })
                  }
                  required
                />
              </label>
              <label htmlFor='queen_id'>
                <span>Queen Id</span>
                <input
                  type='text'
                  id='queen_id'
                  name='queen_id'
                  placeholder='Queen Id'
                  onChange={(e) =>
                    setQueenData({ ...queenData, id: e.target.value })
                  }
                  required
                />
              </label>
              <label htmlFor='queen_phone'>
                <span>Queen Phone</span>
                <input
                  id='queen_phone'
                  name='queen_phone'
                  type='text'
                  placeholder='Queen Phone'
                  onChange={(e) =>
                    setQueenData({ ...queenData, phone: e.target.value })
                  }
                  required
                />
              </label>
              <label htmlFor='address'>
                <span>Address</span>
                <input
                  id='address'
                  name='address'
                  type='text'
                  placeholder='Address'
                  onChange={(e) =>
                    setQueenData({ ...queenData, address: e.target.value })
                  }
                  required
                />
              </label>
            </div>
          </div>
          <div className='create-invoice-heading-button'>
            <div className='create-invoice-heading-button'>
              <h3>Add Product Information</h3>
              <button className='button' onClick={addProduct}>
                Add Product
              </button>
            </div>
            <label className='mt-3  ml-4 print-btn' htmlFor='print-btn'>
              <AiFillPrinter /> <span>Print</span>
              <input
                style={{ width: 'auto', display: 'none' }}
                type='submit'
                value='Print'
                id='print-btn'
                name='print-btn'
              />
            </label>
          </div>
          <div>
            {products.map((item, index) => {
              return (
                <div
                  className='create-invoice-product-input-wrapper'
                  key={item.id}
                >
                  <label htmlFor='product_id'>
                    <span>Product Id</span>
                    <input
                      type='text'
                      id='product_id'
                      name='product_id'
                      placeholder='product id'
                      required
                      onChange={(e) =>
                        handleinputChange({
                          value: e.target.value,
                          id: item.id,
                          key: 'product_id',
                        })
                      }
                    />
                  </label>
                  <label htmlFor='product_name'>
                    <span>Product Name</span>
                    <input
                      id='product_name'
                      name='product_name'
                      type='text'
                      placeholder='product name'
                      required
                      onChange={(e) =>
                        handleinputChange({
                          value: e.target.value,
                          id: item.id,
                          key: 'product_name',
                        })
                      }
                    />
                  </label>
                  <label htmlFor='price'>
                    <span>Price</span>
                    <input
                      id='price'
                      name='price'
                      type='text'
                      placeholder='price'
                      required
                      onChange={(e) =>
                        handleinputChange({
                          value: e.target.value,
                          id: item.id,
                          key: 'price',
                        })
                      }
                    />
                  </label>
                  <label htmlFor='quantity'>
                    <span>Quantity</span>
                    <input
                      type='text'
                      id='quantity'
                      name='quantity'
                      placeholder='quantity'
                      required
                      onChange={(e) =>
                        handleinputChange({
                          value: e.target.value,
                          id: item.id,
                          key: 'quantity',
                        })
                      }
                    />
                  </label>
                  {index !== 0 && (
                    <AiFillCloseCircle
                      className='cros-product-input'
                      onClick={() => removeProduct(item.id)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </form>
      </div>
      <div className='create-invoice-preview'>
        <OrderInvoicePage
          orderCommision={otherData.commision}
          orderDetails={{
            order_date: otherData.order_date,
            order_details: products,
            order_id: otherData.order_id,
          }}
          queenDetails={queenData}
          ref={componentRef}
        />
      </div>
    </>
  );
};

export default CustomQueenInvoice;
