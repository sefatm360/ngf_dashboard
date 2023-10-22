import React, { useState } from 'react';
import { limit } from '../../helpers/constants';

const PaginationCategory = ({
  categoryTotalData,
  categoryCurrentPage,
  paginateCategroy,
  categorySelectedPage,
}) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(categoryTotalData / limit); i++) {
    pageNumber.push(i);
  }

  const lastPage = pageNumber[pageNumber.length - 1];

  return (
    <div>
      <button
        onClick={() => {
          if (categoryCurrentPage > 1) {
            paginateCategroy(categoryCurrentPage - 1);
          }
        }}
        className='pagination-btn'
        type='button'
      >
        Previous
      </button>
      {pageNumber.map((page, index) => (
        <div
          className={`d-inline   ${
            page === categorySelectedPage && 'selected-page'
          }`}
          key={index}
        >
          {page === categoryCurrentPage ? (
            <span
              onClick={() => paginateCategroy(page)}
              className='pagination-btn'
            >
              {page}
            </span>
          ) : page === categoryCurrentPage + 1 ||
            page === categoryCurrentPage - 1 ? (
            <span
              onClick={() => paginateCategroy(page)}
              className='pagination-btn'
            >
              {page}
            </span>
          ) : page === 1 ? (
            <span
              onClick={() => paginateCategroy(page)}
              className='pagination-btn'
            >
              {page}
            </span>
          ) : page === lastPage ? (
            <span
              onClick={() => paginateCategroy(page)}
              className='pagination-btn'
            >
              {page}
            </span>
          ) : page === lastPage - 1 ? (
            <span>...</span>
          ) : (
            page === 2 && <span>...</span>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          if (categoryCurrentPage < lastPage) {
            paginateCategroy(categoryCurrentPage + 1);
          }
        }}
        className='pagination-btn'
        type='button'
      >
        Next
      </button>
    </div>
  );
};

export default PaginationCategory;
