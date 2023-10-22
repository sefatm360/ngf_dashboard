import React from 'react';
import { Route, Routes } from 'react-router';
import Products from '../../../pages/categoryPage/Products';
import ProductsUpdataeRequest from '../../../pages/categoryPage/ProductsUpdataeRequest';
import ProductDetails from '../../../pages/detailsPage/ProductDetails';
import AddProduct from '../../../pages/otherPages/AddProduct';
import SeeAllProducts from '../../SeeAllComponent/SeeAllProducts';
// import SingleQueenAllProducts from '../../SeeAllComponent/SingleQueenAllProducts';

const ProductRouterHelper = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route
          path='/products-update-request'
          element={<ProductsUpdataeRequest />}
        />
        <Route path='/details/:id/*' element={<ProductDetails />} />
        <Route path='/all' element={<SeeAllProducts />} />
      </Routes>
    </>
  );
};

export default ProductRouterHelper;
