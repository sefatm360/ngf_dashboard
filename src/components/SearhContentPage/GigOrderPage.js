import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

const GigOrderPage = ({ order, serial }) => {
  const { gig_id, id, order_date, order_title, status } = order;

  return (
    <tr key={id}>
      <td className='fw-bold'>{serial}</td>
      <td>OTWF-O{id}</td>
      <td>
        <Link to={`/gigs/details/${gig_id}`}>
          <span>OTWF-G{gig_id}</span>
        </Link>
        <br />
        <small>{order_title.slice(0, 30)}...</small>
      </td>
      <td>{moment(order_date).format('MMM Do YY')}</td>
      <td>{status}</td>
      <td>
        <Link to={`/gig-orders/details/${id}`}>
          <button className='view-button'>
            View <span className='las la-arrow-right'></span>
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default GigOrderPage;
