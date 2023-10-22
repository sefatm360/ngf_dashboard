import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import BlogLists from '../../../components/listsComponents/BlogLists';
import fetcher from '../../../helpers/fetchApi';
import Pagination from '../../Pagination/Pagination';

const perPage = 20;
const SeeAllBlogs = () => {
  const [blog, setBlog] = useState({ data: [], total: 0 });
  const navigate = useNavigate();
  const { type, status } = useParams();
  const [searchParams, _setSearchParams] = useSearchParams();
  const page = searchParams.get('page');

  useEffect(() => {
    let pageNumber = 0;

    if (page) {
      pageNumber = (page - 1) * perPage;
    }
    (async () => {
      const { data } = await fetcher.get({
        url: `/api/blog/get/all/type/status/${type}/${status}?limit=${perPage}&skip=${pageNumber}`,
      });
      if (data.success) {
        setBlog({ data: data.data, total: data.total });
      }
    })();
  }, [status, type]);

  const paginate = (pageNumber) => {
    navigate(`/blog/all-blogs/${type}/${status}?&page=${pageNumber}`);
  };

  return (
    <div>
      <div className='content'>
        <main>
          {/* <div>
            <select defaultValue={status || 'all'}>
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div> */}
          {blog.total ? (
            <div className='blog-list-wrapper'>
              {blog.data.map((blog) => (
                <BlogLists key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className='text-center mt-5'>
              <span>No blog found...</span>
            </div>
          )}
          <div className='text-center mt-5'>
            {blog.total > 20 ? (
              <Pagination
                currentPage={Number(page) || 1}
                totalData={blog.total}
                paginate={paginate}
                selectedPage={Number(page) || 1}
              />
            ) : (
              ''
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SeeAllBlogs;
