import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomerInvoiceForm from '../../components/PrintedComponents/CustomerInvoiceForm';
import fetcher from '../../helpers/fetchApi';

const CustomerInvoice = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const { orderId } = useParams();

  useEffect(() => {
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/orders/get/${orderId}`,
      });

      setOrderDetails(data.data);
    })();
  }, []);
  return (
    <div>
      <CustomerInvoiceForm orderDetails={orderDetails} />
    </div>
  );
};

export default CustomerInvoice;
