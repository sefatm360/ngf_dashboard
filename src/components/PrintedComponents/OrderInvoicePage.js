import React from 'react';
import QueenInvoiceRTP from './QueenInvoiceRTP';

const OrderInvoicePage = React.forwardRef((props, ref) => {
  const { orderCommision, orderDetails, queenDetails } = props;
  return (
    <div ref={ref}>
      <QueenInvoiceRTP
        orderDetails={orderDetails}
        queenDetails={queenDetails}
        orderCommision={orderCommision}
      ></QueenInvoiceRTP>
    </div>
  );
});
export default OrderInvoicePage;
