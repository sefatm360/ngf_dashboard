import moment from 'moment/moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../helpers/constants';

const BlogLists = ({ blog }) => {
  const { id, title, thumbnail, author_name, author_id, post_date, status } =
    blog;
  return (
    <div className='single-blog-wrapper'>
      <Link className='blog-image-wrapper' to={`/blog/${id}`}>
        <img
          width='100%'
          height='100%'
          style={{ objectFit: 'cover' }}
          src={`${url}/get/image/blog_thumbnails/${thumbnail}`}
          alt='ontheway blog thumbnail'
        />
        <div className='single-blog-title'>
          <small>
            {title} - {status}
          </small>
        </div>
      </Link>
      <div className='single-blog-footer'>
        <span>
          <span className='fw-bold'>Author: </span>
          {author_id ? (
            <Link to={`/me/details/${author_id}`}>
              {author_name.split(' ')[0]}
            </Link>
          ) : (
            <>{author_name}</>
          )}
        </span>
        <span>{moment(post_date).format('ll')}</span>
      </div>
    </div>
  );
};

export default BlogLists;
