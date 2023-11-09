import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import fetcher from '../../helpers/fetchApi';
import { AiFillPrinter } from 'react-icons/ai';
import OrderInvoicePage from './OrderInvoicePage';

const QueensInvoice = () => {
  const [orderDetails, setOrderDetails] = useState({});
  // const [queenDetails, setQueenDetails] = useState({});
  const { orderId, queenId, commision } = useParams();
  const [queensCommision, setQueensCommision] = useState(commision);

  // const [editOrderDetails, setEditOrderDetails] = useState({});
  const [editQueenDetails, setEditQueenDetails] = useState({});
  // const [address, setAddress] = useState('dhaka,banani');

  const address = 'dhaka,banani';

  useEffect(() => {
    // setOrderCommision(commision);
    setQueensCommision(commision);
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/orders/get/${orderId}`,
      });
      setOrderDetails(data.data);
      // setEditOrderDetails(data.data);
    })();
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/admin/queen/getqueen/for-admin/${queenId}`,
      });

      // setQueenDetails(data.data);
      setEditQueenDetails(data.data);
    })();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `ME Invoice NGF-O${orderDetails.order_id}`,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditQueenDetails({ ...editQueenDetails, address: address });
  };

  return (
    <div className='content'>
      <main>
        <div>
          <div className='queens-invoice-edit'>
            <div>
              <label htmlFor='commision'>Edit Commision: </label>
              <select
                defaultValue={queensCommision}
                name='commision'
                id='commision'
                className='select-commision'
                onChange={(e) => setQueensCommision(e.target.value)}
              >
                <option value={0}>0%</option>
                <option value={5}>5%</option>
                <option value={10}>10%</option>
                <option value={15}>15%</option>
                <option value={20}>20%</option>
              </select>
            </div>

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
          </div>
          {/* edit area */}
          <details>
            {/* <summary>Info Edit</summary> */}
            <div className='invoice-edit-area'>
              <form action='' onSubmit={handleSubmit}>
                <label htmlFor='name'>
                  <span>Name</span>
                  <input id='name' name='name' type='text' />
                </label>

                <label htmlFor='phone'>
                  <span>Phone</span>
                  <input id='phone' name='phone' type='text' />
                </label>

                <label htmlFor='email'>
                  <span>Email</span>
                  <input id='email' type='text' />
                </label>

                <label htmlFor='address'>
                  <span>Address</span>
                  <input id='address' type='text' />
                </label>
                <button type='submit'>Apply</button>
              </form>
            </div>
          </details>
          <h4 className='text-center mt-5 mb-5 invoice-title'>
            ME's Invoice View
          </h4>
          <div className=''>
            <OrderInvoicePage
              orderCommision={queensCommision}
              orderDetails={orderDetails}
              queenDetails={editQueenDetails}
              ref={componentRef}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default QueensInvoice;
