import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetcher from '../../helpers/fetchApi';
import Pagination from '../../pages/Pagination/Pagination';
import GigsPage from '../SearhContentPage/GigsPage';

const limit = 50;
const SeeAllSellerGigs = () => {
  const params = new URLSearchParams(document.location.search);
  const category = params.get('category');
  const page = params.get('page');
  const type = params.get('type');
  const { id } = useParams();
  const [pageGigs, setPageGigs] = useState({ data: [], total: null });
  const [catagories, setCategories] = useState([]);
  const navigate = useNavigate();
  console.log({ id });

  useEffect(() => {
    window.scrollTo({ top: 0 });
    let skipData = 0;
    let uri = `/out/api/admin/gig/get/all/by/seller/category/status/${id}/all/${type}`;

    if (page) {
      skipData = (Number(page) - 1) * limit;
    }

    if (category && type) {
      if (category === 'all') {
        if (type === 'all') {
          uri = `/out/api/admin/gig/get/all/by/seller/category/status/${id}/all/all`;
        } else {
          uri = `/out/api/admin/gig/get/all/by/seller/category/status/${id}/all/${type}`;
        }
      } else {
        if (type === 'all') {
          uri = `/out/api/admin/gig/get/all/by/seller/category/status/${id}/${category}/all`;
        } else {
          uri = `/out/api/admin/gig/get/all/by/seller/category/status/${id}/${category}/${type}`;
        }
      }
    } else if (category && !type) {
      if (category === 'all') {
        uri = `/out/api/admin/gig/get/all/by/seller/category/status/${id}/all/${type}`;
      } else {
        uri = `/out/api/admin/gig/get/all/by/seller/category/status/${id}/${category}/all`;
      }
    } else if (!category && type) {
      if (type === 'all') {
        uri = `/out/api/admin/gig/get/all/by/seller/category/status/${id}/all/all`;
      } else {
        uri = `/out/api/admin/gig/get/all/by/seller/category/status/${id}/all/${type}`;
      }
    }

    (async function () {
      const { data } = await fetcher.get({
        url: `${uri}?limit=${limit}&skip=${skipData}`,
      });

      console.log({ data });
      setPageGigs(data);
    })();
  }, [category, type, page]);

  useEffect(() => {
    (async () => {
      const { data } = await fetcher.get({
        url: '/out/api/seller/get/all/skill-categories',
      });
      setCategories(data.data);
    })();
  }, []);

  const handleOnCategory = (newCategory) => {
    if (type) {
      navigate(
        `/sellers/details/${id}/gigs/all?category=${newCategory}&type=${type}`
      );
    } else {
      navigate(
        `/sellers/details/${id}/gigs/all?category=${newCategory}&type=all`
      );
    }
  };

  const handleChangeType = (newType) => {
    if (category) {
      navigate(
        `/sellers/details/${id}/gigs/all?category=${category}&type=${newType}`
      );
    } else {
      navigate(`/sellers/details/${id}/gigs/all?category=all&type=${newType}`);
    }
  };

  const paginate = (pageNumber) => {
    if (category && type) {
      navigate(
        `/gigs/all?category=${category}&type=${type}&page=${pageNumber}`
      );
    } else if (category && !type) {
      navigate(`/gigs/all?category=${category}&page=${pageNumber}`);
    } else if (type && !category) {
      navigate(`/gigs/all?type=${type}&page=${pageNumber}`);
    } else {
      navigate(`/gigs/all?page=${pageNumber}`);
    }
  };

  return (
    <div className='content'>
      <main>
        <div>
          <h1 className='mt-0 ml-0'>
            All {type !== 'all' && type} Gigs: {pageGigs.total}
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
                {catagories.map((item) => {
                  console.log(item);
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <h4>Status</h4>
              <select
                style={{ width: '100%' }}
                id='selectCategory'
                name='selectCategory'
                onChange={(e) => handleChangeType(e.target.value)}
                value={type.toLowerCase() || 'All'}
              >
                <option value='all'>All</option>
                <option value='pending'>Pending</option>
                <option value='approved'>Approved</option>
                <option value='rejected'>Rejected</option>
              </select>
            </div>
          </div>
          {
            <div>
              {pageGigs.data.length === 0 ? (
                <h1 className='text-center mt-5 not-found'>
                  No Gig Found !! Please try again
                </h1>
              ) : (
                <div style={{ overflowX: 'auto', borderRadius: '5px' }}>
                  <table width='100%'>
                    <thead>
                      <tr>
                        <td width='10%'>Serial</td>
                        <td width='40%'>Product</td>
                        <td width='25%'>ME</td>
                        <td width='10%'>Status</td>
                        <td width='10%'>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {pageGigs.data?.map(
                        (singleItem, index) => (
                          <GigsPage
                            key={singleItem.id}
                            gig={singleItem}
                            serial={index + 1}
                          />
                        )
                        // console.log({ singleItem })
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          }
          <div className='mt-5 text-center'>
            {pageGigs.total > 50 && (
              <Pagination
                currentPage={Number(page) || 1}
                totalData={pageGigs.total}
                paginate={paginate}
                selectedPage={Number(page) || 1}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeeAllSellerGigs;
