import React from 'react';
import { Link } from 'react-router-dom';

const Links = ({ id, name, category }) => {
  return (
    <div className='link-container'>
      <p className='dis-link'>
        <Link to='/me' className='link' style={{ color: 'darkblue' }}>
          /me
        </Link>
        <Link
          to={`/me/details/${id}`}
          className='link'
          style={{ color: 'darkblue' }}
        >
          /{name}
        </Link>
        /{category}
      </p>
    </div>
  );
};

export default Links;
