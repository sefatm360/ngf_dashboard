import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { limit } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';
import Pagination from '../../pages/Pagination/Pagination';
import ProductPage from '../SearhContentPage/ProductPage';
import Spinner from '../Spinner';

const SeeAllProducts = () => {
  const params = new URLSearchParams(document.location.search);
  const category = params.get('category');
  const page = params.get('page');
  const type = params.get('type');
  const [isLoading, setIsLoading] = useState(false);
  const [pageProducts, setPageProducts] = useState({ data: [], total: null });
  const [filteredDate, setFilteredDate] = useState({
    fromDate: '',
    toDate: '',
  });

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0 });
    let skipData = 0;
    let uri = `/api/admin/product/get/all/`;

    if (page) {
      skipData = (Number(page) - 1) * limit;
    }

    if (category && type) {
      if (category === 'all') {
        if (type === 'all') {
          uri = `/api/admin/product/get/all/`;
        } else {
          uri = `/api/admin/product/get/all/${type}`;
        }
      } else {
        if (type === 'all') {
          uri = `/api/admin/product/get/all/for-admin/by-category/${category}/`;
        } else {
          uri = `/api/admin/product/get/all/for-admin/by-category/${category}/${type}`;
        }
      }
    } else if (category && !type) {
      if (category === 'all') {
        uri = `/api/admin/product/get/all/`;
      } else {
        uri = `/api/admin/product/get/all/for-admin/by-category/${category}`;
      }
    } else if (!category && type) {
      if (type === 'all') {
        uri = `/api/admin/product/get/all/`;
      } else {
        uri = `/api/admin/product/get/all/${type}`;
      }
    }

    setFilteredDate({ fromDate: '', toDate: '' });
    (async function () {
      setIsLoading(true);
      const { data } = await fetcher.get({
        url: `${uri}?limit=${limit}&skip=${skipData}`,
      });
  
      if (data.success) {
        setPageProducts(data);
      }
      setIsLoading(false);
    })();
  }, [category, type, page]);

  const handleOnCategory = (newCategory) => {
    if (type) {
      navigate(`/products/all?category=${newCategory}&type=${type}`);
    } else {
      navigate(`/products/all?category=${newCategory}`);
    }
  };

  const handleChangeType = (newType) => {
    if (category) {
      navigate(`/products/all?category=${category}&type=${newType}`);
    } else {
      navigate(`/products/all?type=${newType}`);
    }
  };

  const handleFilterDate = async () => {
    let uri = `/api/admin/product/get/all/date-range/status/category/all/all?from=${filteredDate.fromDate}&to=${filteredDate.toDate}`;
    if (category && type) {
      uri = `/api/admin/product/get/all/date-range/status/category/${type}/${category}?from=${filteredDate.fromDate}&to=${filteredDate.toDate}`;
    } else if (category) {
      uri = `/api/admin/product/get/all/date-range/status/category/all/${category}?from=${filteredDate.fromDate}&to=${filteredDate.toDate}`;
    } else if (type) {
      uri = `/api/admin/product/get/all/date-range/status/category/${type}/all?from=${filteredDate.fromDate}&to=${filteredDate.toDate}`;
    }

    const { data } = await fetcher.get({ url: uri });
    setPageProducts(data);
  };

  const paginate = (pageNumber) => {
    if (category && type) {
      navigate(
        `/products/all?category=${category}&type=${type}&page=${pageNumber}`
      );
    } else if (category && !type) {
      navigate(`/products/all?category=${category}&page=${pageNumber}`);
    } else if (type && !category) {
      navigate(`/products/all?type=${type}&page=${pageNumber}`);
    } else {
      navigate(`/products/all?page=${pageNumber}`);
    }
  };

  return (
    <div className='content'>
      <main>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <h1 className='mt-0 ml-0'>
              All {type !== 'all' && type} Products: {pageProducts.total}
            </h1>
            <div className='edit-form-modal'>
              <div>
                <h4>Category</h4>
                <select
                  style={{ width: '100%' }}
                  id='selectCategory'
                  name='selectCategory'
                  onChange={(e) => handleOnCategory(e.target.value)}
                  defaultValue={category || 'All'}
                >
                  <option value='all'>All</option>
                  <option value='Food'>Food</option>
                  <option value='Shirt'>Shirt</option>
                  <option value='Pant'>Pant</option>
                  <option value='Panjabi'>Panjabi</option>
                  <option value='ShareeAndBlouse'>Sharee &amp; Blouse</option>
                  <option value='KurtiAndPants'>
                    Single kurti &amp; Pants
                  </option>
                  <option value='SalwarKameez'>Salwar kameez</option>
                  <option value='LadiesShoes'>Ladies Shoes</option>
                  <option value='Jewellery'>Jewellery</option>
                  <option value='CoupleCollection'>Couple Collection</option>
                  <option value='HijabBorkhaGown'>
                    Hijab Borkha &amp; Gown
                  </option>
                  <option value='FashionAccessories'>
                    Fashion Accessories
                  </option>
                  <option value='Grocery'>Grocery</option>
                  <option value='MensFashion'>Men's Fashion</option>
                  <option value='SkinCare'>Skin Care</option>
                  <option value='HairCare'>Hair Care</option>
                  <option value='MakeupItems'>Makeup Items</option>
                  <option value='BabyProducts'>Baby Products</option>
                  <option value='HomeDecor'>Home Decor</option>
                  <option value='Accessories'>Accessories</option>
                  <option value='Stationary'>Stationary</option>
                  <option value='Toys'>Toys</option>
                  <option value='Others'>Others</option>
                </select>
              </div>
              <div>
                <h4>Status</h4>
                <select
                  style={{ width: '100%' }}
                  id='selectCategory'
                  name='selectCategory'
                  onChange={(e) => handleChangeType(e.target.value)}
                  defaultValue={type || 'All'}
                >
                  <option value='all'>All</option>
                  <option value='pending'>Pending</option>
                  <option value='approved'>Approved</option>
                  <option value='rejected'>Rejected</option>
                  <option value='disabled'>Deleted</option>
                </select>
              </div>
              <div style={{ marginLeft: '10px' }}>
                <h4>Filter Product by Date Range</h4>
                <div>
                  <div>
                    <input
                      type='date'
                      onChange={(e) => {
                        setFilteredDate({
                          ...filteredDate,
                          fromDate: e.target.value,
                        });
                      }}
                      style={{ width: '40%' }}
                      name=''
                      id=''
                      value={filteredDate.fromDate}
                    />
                    <input
                      type='date'
                      onChange={(e) => {
                        setFilteredDate({
                          ...filteredDate,
                          toDate: e.target.value,
                        });
                      }}
                      style={{ width: '40%' }}
                      name=''
                      id=''
                      value={filteredDate.toDate}
                    />
                    <button
                      style={{ height: '100%' }}
                      className='apply-btn ml-3'
                      onClick={handleFilterDate}
                      disabled={
                        filteredDate.fromDate && filteredDate.toDate
                          ? false
                          : true
                      }
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {
              <div>
                {pageProducts.data.length === 0 ? (
                  <h1 className='text-center mt-5 not-found'>
                    No Product Found !! Please try again
                  </h1>
                ) : (
                  <div style={{ overflowX: 'auto', borderRadius: '5px' }}>
                    <table width='100%'>
                      <thead>
                        <tr>
                          <td width='10%'>Serial</td>
                          <td width='40%'>Product</td>
                          <td width='25%'>Queen</td>
                          <td width='15%'>Category</td>
                          <td width='10%'>Status</td>
                          <td width='10%'>Action</td>
                        </tr>
                      </thead>
                      <tbody>
                        {pageProducts.data?.map((singleItem, index) => (
                          <ProductPage
                            key={singleItem.id}
                            product={singleItem}
                            serial={index + 1}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            }
            <div className='mt-5 text-center'>
              {pageProducts.total > 50 && (
                <Pagination
                  currentPage={Number(page) || 1}
                  totalData={pageProducts.total}
                  paginate={paginate}
                  selectedPage={Number(page) || 1}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SeeAllProducts;
