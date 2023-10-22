import React from 'react';
import CustomerInvoiceRTO from './CustomerInvoiceRTO';

const CustomersInvoicePage = React.forwardRef((props, ref) => {
  const { orderDetails } = props;
  return (
    <div ref={ref}>
      <CustomerInvoiceRTO orderDetails={orderDetails} />
    </div>
  );
});

export default CustomersInvoicePage;
