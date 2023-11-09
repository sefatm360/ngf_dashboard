import React, { useRef, useState } from 'react';
import { AiFillCloseCircle, AiFillPrinter } from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
import CustomersInvoicePage from './CustomersInvoicePage';
const CustomCustomerInvoice = () => {
  const [orderData, setOrderData] = useState({});
  const [products, setProducts] = useState([{ id: Date.now() }]);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Customer Invoice NGF-O${orderData.order_id}`,
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
            <h2>MAKE CUSTOMER INVOICE</h2>
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
                    setOrderData({
                      ...orderData,
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
              <label htmlFor='customer_name'>
                <span>Delivery Charge</span>
                <input
                  type='text'
                  id='delivery_charge'
                  name='delivery_charge'
                  placeholder='Delivery charge'
                  required
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      delivery_charge: e.target.value,
                    })
                  }
                />
              </label>
              <label htmlFor='customer_name'>
                <span>Customer Name</span>
                <input
                  type='text'
                  id='customer_name'
                  name='customer_name'
                  placeholder='Customer Name'
                  required
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      customer_name: e.target.value,
                    })
                  }
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
                  required
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      order_id: e.target.value,
                    })
                  }
                />
              </label>
              <label htmlFor='customer_phone'>
                <span>Customer Phone</span>
                <input
                  id='customer_phone'
                  name='customer_phone'
                  type='text'
                  placeholder='Customer Phone'
                  required
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      customer_phone: e.target.value,
                    })
                  }
                />
              </label>
              <label htmlFor='address'>
                <span>Customer address</span>
                <input
                  id='address'
                  name='address'
                  type='text'
                  placeholder='Address'
                  required
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      delivery_address: e.target.value,
                    })
                  }
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
        <CustomersInvoicePage
          orderDetails={{ ...orderData, order_details: products }}
          ref={componentRef}
        />
      </div>
    </>
  );
};

export default CustomCustomerInvoice;
