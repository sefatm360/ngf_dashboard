import React, { useState } from 'react';
import './createInvoice.css';
import CustomQueenInvoice from '../../components/PrintedComponents/CustomQueenInvoice';
import CustomCustomerInvoice from '../../components/PrintedComponents/CustomCustomerInvoice';
const CreateInvoice = () => {
  const [selectInvoice, setSelectInvoice] = useState('queen');
  return (
    <div className='content'>
      <main>
        <div className='custom-invoice-header'>
          <h3>CREATE CUSTOM INVOICE</h3>
          <div>
            <span
              className={`${
                selectInvoice === 'queen' && 'active-invoice-select-btn'
              } select-invoice-btn`}
              onClick={() => setSelectInvoice('queen')}
            >
              Queen Invoice
            </span>
            <span
              className={`${
                selectInvoice === 'customer' && 'active-invoice-select-btn'
              } select-invoice-btn`}
              onClick={() => setSelectInvoice('customer')}
            >
              Customer Invoice
            </span>
          </div>
        </div>
        {selectInvoice === 'queen' ? (
          <CustomQueenInvoice />
        ) : (
          <CustomCustomerInvoice />
        )}
      </main>
    </div>
  );
};

export default CreateInvoice;
