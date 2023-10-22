import React, { useEffect, useState } from 'react';
import { useAdminContext } from '../../contexts/adminContext';
import { useOrderContext } from '../../contexts/orderContext';
import { HIDE_MODAL } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const OrderEditModal = ({ data, setUpdateSpinner }) => {
  const { dispatch: adminDispatch } = useAdminContext();
  const { setOrder } = useOrderContext();
  const [editOrder, setEditOrder] = useState(data);
  const { status, order_id, note } = editOrder;
  const [nowNote, setNowNote] = useState(note);

  useEffect(() => {
    setEditOrder(data);
    setNowNote(note);
  }, [data, note]);

  const handleSubmit = async (e) => {
    setUpdateSpinner(true);
    e.preventDefault();

    const response = await fetcher.put({
      url: `/api/orders/update/${order_id}`,
      cType: 'application/json',
      body: { status, note: nowNote },
    });

    if (response) {
      setUpdateSpinner(false);
      adminDispatch({ type: HIDE_MODAL });
      setOrder({ ...editOrder, note: nowNote });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='first-row'>
        <label htmlFor='status'>
          <span>Status</span>
          <select
            id='status'
            name='status'
            style={{ width: 'auto' }}
            value={status}
            onChange={(e) =>
              setEditOrder((order) => {
                return {
                  ...order,
                  status: e.target.value,
                };
              })
            }
          >
            <option value='Pending'>Pending</option>
            <option value='Approved'>Approved</option>
            <option value='Shipped'>Shipped</option>
            <option value='Delivered'>Delivered</option>
            <option value='Rejected'>Rejected</option>
          </select>
        </label>

        <label htmlFor='note'>
          <span>Note</span>
          <textarea
            id='note'
            name='note'
            value={nowNote}
            placeholder='Note'
            style={{ width: 'auto', padding: '5px' }}
            onChange={(e) => setNowNote(e.target.value)}
          ></textarea>
        </label>
      </div>

      <input type='submit' value='Submit' />
    </form>
  );
};

export default OrderEditModal;
