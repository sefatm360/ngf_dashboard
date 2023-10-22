import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Blog from '../../../pages/categoryPage/Blog';
import BlogDetails from '../../../pages/detailsPage/blogDetails/BlogDetails';
import SeeAllBlogs from '../../../pages/detailsPage/blogDetails/SeeAllBlogs';

import CreateBlog from '../../../pages/otherPages/CreateBlog';

const BlogRouterHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Blog />} />
        <Route path='/all-blogs/:type/:status' element={<SeeAllBlogs />} />
        <Route path='/create/new' element={<CreateBlog />} />
        <Route path='/:id' element={<BlogDetails />} />
      </Routes>
    </>
  );
};

export default BlogRouterHelper;
