import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import fetcher from '../../../helpers/fetchApi';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({ description: '' });

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: `/api/blog/get/single/admin-queen/${id}`,
      });
      console.log(data);
      if (data.success) {
        setBlog(data.data);
      }
    })();
  }, []);
  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <h1>Blog details</h1>
          <div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.description),
              }}
            ></p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogDetails;
