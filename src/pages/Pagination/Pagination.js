import React, { useState } from 'react';
import { limit } from '../../helpers/constants';

const Pagination = ({ totalData, currentPage, paginate, selectedPage }) => {
  const [pageNum, setPageNum] = useState(1);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalData / limit); i++) {
    pageNumber.push(i);
  }

  const lastPage = pageNumber[pageNumber.length - 1];

  const handleSubmit = (e) => {
    e.preventDefault();
    paginate(Number(pageNum));
  };

  return (
    <div>
      <form className='paginate-input' onSubmit={handleSubmit}>
        <input
          onChange={(e) => setPageNum(e.target.value)}
          type='number'
          min='1'
          max={`${lastPage}`}
          required
          placeholder='page'
          value={pageNum}
        />
        <input type='submit' value='Jump' />
      </form>
      <button
        onClick={() => {
          if (currentPage > 1) {
            paginate(currentPage - 1);
          }
        }}
        className='pagination-btn'
        type='button'
      >
        Previous
      </button>
      {pageNumber.map((page, index) => (
        <div
          className={`d-inline   ${page === selectedPage && 'selected-page'}`}
          key={index}
        >
          {page === currentPage ? (
            <span onClick={() => paginate(page)} className='pagination-btn'>
              {page}
            </span>
          ) : page === currentPage + 1 || page === currentPage - 1 ? (
            <span onClick={() => paginate(page)} className='pagination-btn'>
              {page}
            </span>
          ) : page === 1 ? (
            <span onClick={() => paginate(page)} className='pagination-btn'>
              {page}
            </span>
          ) : page === lastPage ? (
            <span onClick={() => paginate(page)} className='pagination-btn'>
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
          if (currentPage < lastPage) {
            paginate(currentPage + 1);
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

export default Pagination;
