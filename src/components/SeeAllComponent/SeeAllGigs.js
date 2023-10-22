import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetcher from '../../helpers/fetchApi';
import Pagination from '../../pages/Pagination/Pagination';
import GigsPage from '../SearhContentPage/GigsPage';

const limit = 50;
const SeeAllGigs = () => {
  const params = new URLSearchParams(document.location.search);
  const category = params.get('category');
  const page = params.get('page');
  const type = params.get('type');
  const [pageGigs, setPageGigs] = useState({ data: [], total: null });
  const [catagories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    let skipData = 0;
    let uri = `/out/api/admin/gig/get/all/`;

    if (page) {
      skipData = (Number(page) - 1) * limit;
    }

    if (category && type) {
      if (category === 'all') {
        if (type === 'all') {
          uri = `/out/api/admin/gig/get/all/`;
        } else {
          uri = `/out/api/gig/get/${type}/all/`;
        }
      } else {
        if (type === 'all') {
          uri = `/out/api/gig/get/all/by-category/${category}/`;
        } else {
          uri = `/out/api/gig/get/status-and-category/${type}/${category}`;
        }
      }
    } else if (category && !type) {
      if (category === 'all') {
        uri = `/out/api/admin/gig/get/all/`;
      } else {
        uri = `/out/api/gig/get/all/by-category/${category}`;
      }
    } else if (!category && type) {
      if (type === 'all') {
        uri = `/out/api/admin/gig/get/all/`;
      } else {
        uri = `/out/api/gig/get/${type}/all/`;
      }
    }

    (async function () {
      const { data } = await fetcher.get({
        url: `${uri}?limit=${limit}&skip=${skipData}`,
      });
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
      navigate(`/gigs/all?category=${newCategory}&type=${type}`);
    } else {
      navigate(`/gigs/all?category=${newCategory}`);
    }
  };

  const handleChangeType = (newType) => {
    if (category) {
      navigate(`/gigs/all?category=${category}&type=${newType}`);
    } else {
      navigate(`/gigs/all?type=${newType}`);
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
                  return (
                    <option key={item.id} value={item.name}>
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
                defaultValue={type || 'All'}
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
                        <td width='40%'>Gig</td>
                        <td width='25%'>Seller</td>
                        <td width='10%'>Status</td>
                        <td width='10%'>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {pageGigs.data?.map((singleItem, index) => (
                        <GigsPage
                          key={singleItem.gig_id}
                          gig={singleItem}
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

export default SeeAllGigs;
