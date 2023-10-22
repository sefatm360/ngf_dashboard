import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const Cards = ({ cards, fetching, active }) => {
  return (
    <>
      {cards.map((item) => {
        const { id, length, field, path } = item;
        return (
          <Link
            to={path}
            key={id}
            className={
              field === active
                ? 'card-single card-single-active'
                : 'card-single'
            }
            style={{ color: '#394049' }}
          >
            {fetching ? (
              <Spinner />
            ) : (
              <div>
                <h1>{length}</h1>
                <h5>{field}</h5>
              </div>
            )}
            {/* <div>
              <span className='las la-users'></span>
            </div> */}
          </Link>
        );
      })}
    </>
  );
};

export default Cards;
