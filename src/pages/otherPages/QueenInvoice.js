import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QueenInvoiceForm from '../../components/PrintedComponents/QueenInvoiceForm';
import fetcher from '../../helpers/fetchApi';

const QueenInvoice = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const [queenDetails, setQueenDetails] = useState({});
  const { orderId, queenId, commision } = useParams();
  const [orderCommision, setOrderCommision] = useState(commision);

  useEffect(() => {
    setOrderCommision(commision);
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/orders/get/${orderId}`,
      });

      setOrderDetails(data.data);
    })();
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/admin/queen/getqueen/for-admin/${queenId}`,
      });

      setQueenDetails(data.data);
    })();
  }, []);

  return (
    <div>
      <QueenInvoiceForm
        orderCommision={orderCommision}
        orderDetails={orderDetails}
        queenDetails={queenDetails}
      />
    </div>
  );
};

export default QueenInvoice;
