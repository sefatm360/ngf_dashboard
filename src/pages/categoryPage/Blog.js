import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Cards from '../../components/Cards';
import BlogLists from '../../components/listsComponents/BlogLists';
import { useBlogContext } from '../../contexts/blogContext';
import { FETCH_BLOGS } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import '../../styles/blog.css';

export default function Blog() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const status = searchParams.get('blog-status') || 'All';
  const navigate = useNavigate();
  const [blogType, setBlogType] = useState('Admin');
  const [fetching, setFetching] = useState(false);
  const {
    allBlogs,
    queenAllBlogs,
    queenPendingBlogs,
    queenApprovedBlogs,
    queenRejectedBlogs,
    adminAllBlogs,
    adminPendingBlogs,
    adminApprovedBlogs,
    adminRejectedBlogs,
    dispatch: blogDispatch,
  } = useBlogContext();

  const adminBlogUrls = [
    {
      url: `/api/blog/get/all/type/status/all/all`,
      data: allBlogs,
      dataType: 'allBlogs',
    },
    {
      url: `/api/blog/get/all/type/status/admin/all`,
      data: adminAllBlogs,
      dataType: 'adminAllBlogs',
    },
    {
      url: `/api/blog/get/all/type/status/admin/pending`,
      data: adminPendingBlogs,
      dataType: 'adminPendingBlogs',
    },
    {
      url: `/api/blog/get/all/type/status/admin/approved`,
      data: adminApprovedBlogs,
      dataType: 'adminApprovedBlogs',
    },
    {
      url: `/api/blog/get/all/type/status/admin/rejected`,
      data: adminRejectedBlogs,
      dataType: 'adminRejectedBlogs',
    },
  ];

  const queensBlogUrls = [
    {
      url: `/api/blog/get/all/type/status/all/all`,
      data: allBlogs,
      dataType: 'allBlogs',
    },
    {
      url: `/api/blog/get/all/type/status/queen/all`,
      data: queenAllBlogs,
      dataType: 'queenAllBlogs',
    },
    {
      url: `/api/blog/get/all/type/status/queen/pending`,
      data: queenPendingBlogs,
      dataType: 'queenPendingBlogs',
    },
    {
      url: `/api/blog/get/all/type/status/queen/approved`,
      data: queenApprovedBlogs,
      dataType: 'queenApprovedBlogs',
    },
    {
      url: `/api/blog/get/all/type/status/queen/rejected`,
      data: queenRejectedBlogs,
      dataType: 'queenRejectedBlogs',
    },
  ];

  useEffect(() => {
    let urls = adminBlogUrls;
    if (blogType === 'ME') {
      urls = queensBlogUrls;
    }
    urls.forEach((item) => {
      const { data, url, dataType } = item;
      if (!data.total) {
        (async () => {
          const { data } = await fetcher.get({ url: url + '?limit=12&skip=0' });
          if (data.success) {
            blogDispatch({
              type: FETCH_BLOGS,
              payload: { data: data.data, total: data.total },
              dataType,
            });
          }
        })();
      }
    });
  }, [blogType]);

  const adminCards = [
    {
      id: 1,
      length: allBlogs.total,
      field: 'All Blogs',
      path: '/blog?blog-status=All',
    },
    {
      id: 2,
      length: adminAllBlogs.total,
      field: 'Admin Blogs',
      path: '/blog?blog-status=Admin',
    },
    {
      id: 3,
      length: adminPendingBlogs.total,
      field: 'Pending Blogs',
      path: '/blog?blog-status=Pending',
    },
    {
      id: 4,
      length: adminApprovedBlogs.total,
      field: 'Approved Blogs',
      path: '/blog?blog-status=Approved',
    },
    {
      id: 5,
      length: adminRejectedBlogs.total,
      field: 'Rejected Blogs',
      path: '/blog?blog-status=Rejected',
    },
  ];

  const queenCards = [
    {
      id: 1,
      length: allBlogs.total,
      field: 'All Blogs',
      path: '/blog?blog-status=All',
    },
    {
      id: 2,
      length: queenAllBlogs.total,
      field: 'ME Blogs',
      path: '/blog?blog-status=ME',
    },
    {
      id: 3,
      length: queenPendingBlogs.total,
      field: 'Pending Blogs',
      path: '/blog?blog-status=Pending',
    },
    {
      id: 4,
      length: queenApprovedBlogs.total,
      field: 'Approved Blogs',
      path: '/blog?blog-status=Approved',
    },
    {
      id: 5,
      length: queenRejectedBlogs.total,
      field: 'Rejected Blogs',
      path: '/blog?blog-status=Rejected',
    },
  ];

  const seeAllNavigate = () => {
    if (status === 'All') {
      navigate(`/blog/all-blogs/All/${status}`);
    } else {
      if (status === 'Admin' || status === 'ME') {
        navigate(`/blog/all-blogs/${blogType}/all`);
      } else {
        navigate(`/blog/all-blogs/${blogType}/${status}`);
      }
    }
  };

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <div className='blog-head-wrapper'>
            <h1>{blogType} Blogs</h1>
            <Link className='button' to='/blog/create/new'>
              Create Blog
            </Link>
          </div>
          <div className='blog-option-wrapper'>
            <button
              onClick={() => {
                setBlogType('Admin');
                navigate('/blog?blog-status=All');
              }}
              className={`blog-option ${
                blogType === 'Admin' ? 'blog-option-active' : ''
              }`}
            >
              Ontheway blog
            </button>
            <button
              onClick={() => {
                setBlogType('Queen');
                navigate('/blog?blog-status=All');
              }}
              className={`blog-option ${
                blogType === 'Queen' ? 'blog-option-active' : ''
              }`}
            >
              ME's blog
            </button>
          </div>
          <div className='cards'>
            {blogType === 'Admin' ? (
              <Cards
                active={`${status} Blogs`}
                cards={adminCards}
                fetching={fetching}
              />
            ) : (
              <Cards
                active={`${status} Blogs`}
                cards={queenCards}
                fetching={fetching}
              />
            )}
          </div>
          <div>
            <div className='blog-list-header'>
              <span>{status} Blogs</span>
              <button onClick={seeAllNavigate} className='button'>
                See all
              </button>
            </div>
            <div className='blog-list-wrapper'>
              {blogType === 'Admin' ? (
                <>
                  {status === 'All' ? (
                    <>
                      {allBlogs.data.map((blog) => (
                        <BlogLists key={blog.id} blog={blog} />
                      ))}
                    </>
                  ) : status === 'Admin' ? (
                    <>
                      {adminAllBlogs.data.map((blog) => (
                        <BlogLists key={blog.id} blog={blog} />
                      ))}
                    </>
                  ) : status === 'Pending' ? (
                    <>
                      {adminPendingBlogs.data.map((blog) => (
                        <BlogLists key={blog.id} blog={blog} />
                      ))}
                    </>
                  ) : status === 'Approved' ? (
                    <>
                      {adminApprovedBlogs.data.map((blog) => (
                        <BlogLists key={blog.id} blog={blog} />
                      ))}
                    </>
                  ) : status === 'Rejected' ? (
                    <>
                      {adminRejectedBlogs.data.map((blog) => (
                        <BlogLists key={blog.id} blog={blog} />
                      ))}
                    </>
                  ) : (
                    <>
                      {allBlogs.data.map((blog) => (
                        <BlogLists key={blog.id} blog={blog} />
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  {status === 'All' ? (
                    <>
                      {allBlogs.data.map((blog) => (
                        <BlogLists key={blog.id} blog={blog} />
                      ))}
                    </>
                  ) : status === 'Queen' ? (
                    <>
                      {queenAllBlogs.data.map((blog) => (
                        <BlogLists key={blog.id} blog={blog} />
                      ))}
                    </>
                  ) : status === 'Pending' ? (
                    <>
                      {queenPendingBlogs.data.map((blog) => (
                        <BlogLists key={blog.id} blog={blog} />
                      ))}
                    </>
                  ) : status === 'Approved' ? (
                    <>
                      {queenApprovedBlogs.data.map((blog) => (
                        <BlogLists key={blog.id} blog={blog} />
                      ))}
                    </>
                  ) : status === 'Rejected' ? (
                    <>
                      {queenRejectedBlogs.data.map((blog) => (
                        <BlogLists key={blog.id} blog={blog} />
                      ))}
                    </>
                  ) : (
                    <>
                      {allBlogs.data.map((blog) => (
                        <BlogLists key={blog.id} blog={blog} />
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
