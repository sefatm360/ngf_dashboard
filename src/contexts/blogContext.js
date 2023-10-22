import React, { useContext, useReducer } from 'react';
import blogReducer from '../reducers/blogReducer';
const BlogContext = React.createContext();

const initialState = {
  allBlogs: {
    total: 0,
    data: [],
  },
  queenAllBlogs: {
    total: 0,
    data: [],
  },
  queenPendingBlogs: {
    total: 0,
    data: [],
  },
  queenApprovedBlogs: {
    total: 0,
    data: [],
  },
  queenRejectedBlogs: {
    total: 0,
    data: [],
  },
  adminAllBlogs: {
    total: 0,
    data: [],
  },
  adminPendingBlogs: {
    total: 0,
    data: [],
  },
  adminApprovedBlogs: {
    total: 0,
    data: [],
  },
  adminRejectedBlogs: {
    total: 0,
    data: [],
  },
};

const BlogContextProvidor = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  return (
    <BlogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  return useContext(BlogContext);
};

export default BlogContextProvidor;
