import React, { useEffect, useState } from 'react';
import { useAdminContext } from '../../contexts/adminContext';
import { HIDE_MODAL } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const GigOrderEditModal = ({ data, setUpdateSpinner }) => {
  const { dispatch: adminDispatch } = useAdminContext();
  const { orderDetails, setOrderDetails } = data;
  const [editOrder, setEditOrder] = useState({});
  const { status, note, statusChangedReason, id, ...rest } = orderDetails || {};
  useEffect(() => {
    setEditOrder({ status, note, statusChangedReason });
  }, [orderDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSpinner(true);
    const { data } = await fetcher.put({
      url: `/out/api/gig-order/update/status/${id}`,
      cType: 'application/json',
      body: { ...editOrder, statusChangedBy: 'Admin' },
    });
    setUpdateSpinner(false);
    adminDispatch({ type: HIDE_MODAL });
    if (data.success) {
      setOrderDetails({ ...editOrder, ...rest, id, statusChangedBy: 'Admin' });
    } else {
      alert('Cannot update this order now!');
    }
    setUpdateSpinner(false);
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
            value={editOrder.status}
            onChange={(e) =>
              setEditOrder({ ...editOrder, status: e.target.value })
            }
          >
            <option value='Pending'>Pending</option>
            <option value='Approved'>Approved</option>
            <option value='Delivered'>Delivered</option>
            <option value='Rejected'>Rejected</option>
            <option value='Reported'>Reported</option>
          </select>
        </label>

        <label htmlFor='statusChangedReason'>
          <span>Status Change Reason</span>
          <textarea
            id='statusChangedReason'
            name='statusChangedReason'
            value={editOrder.statusChangedReason}
            placeholder='Status change reason'
            style={{ width: 'auto', padding: '5px' }}
            onChange={(e) =>
              setEditOrder({
                ...editOrder,
                statusChangedReason: e.target.value,
              })
            }
          ></textarea>
        </label>

        <label htmlFor='note'>
          <span>Note</span>
          <textarea
            id='note'
            name='note'
            value={editOrder.note}
            placeholder='Note'
            style={{ width: 'auto', padding: '5px' }}
            onChange={(e) =>
              setEditOrder({ ...editOrder, note: e.target.value })
            }
          ></textarea>
        </label>
      </div>

      <input type='submit' value='Submit' />
    </form>
  );
};

export default GigOrderEditModal;
