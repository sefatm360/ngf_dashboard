import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import fetcher from '../../helpers/fetchApi';
import CustomersInvoicePage from './CustomersInvoicePage';
import { AiFillPrinter } from 'react-icons/ai';
const CustomersInvoice = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const { orderId, delivery } = useParams();

  useEffect(() => {
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/orders/get/${orderId}`,
      });

      setOrderDetails(data.data);
    })();
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Customer invoice OTW-O${orderDetails.order_id}`,
  });

  return (
    <div className='content'>
      <main>
        <div>
          <button
            type='button'
            className='mt-3  ml-4 print-btn'
            onClick={handlePrint}
            style={{
              border: '0px',
            }}
          >
            <AiFillPrinter /> <span>Print</span>
          </button>
        </div>
        <h4 className='text-center mt-5 mb-5 invoice-title'>
          Customers Invoice View
        </h4>
        <div className=''>
          <CustomersInvoicePage
            orderDetails={{ ...orderDetails, delivery_charge: delivery }}
            ref={componentRef}
          />
        </div>
      </main>
    </div>
  );
};

export default CustomersInvoice;
