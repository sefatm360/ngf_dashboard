import React from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../helpers/constants';

const TrainingLists = ({ train, folder, route }) => {
  const { id, name, phone, photo, reg_at } = train;

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>
          <img
            width={50}
            height={50}
            className='rounded-circle'
            src={`${url}/get/image/${folder}/${photo}`}
            alt=''
          />
        </td>
        <td>{name}</td>
        <td>{phone}</td>
        {/* {status && <td>{status}</td>} */}
        {reg_at && <td>{reg_at}</td>}
        {/* <td>{address}</td> */}
        <td>
          <Link to={`${route}/${id}`}>View</Link>
        </td>
      </tr>
    </>
  );
};

export default TrainingLists;
