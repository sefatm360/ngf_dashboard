import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Cards from '../../../components/Cards';
import Links from '../../../components/helperComponents/linkHelper/Links';
import ProductLists from '../../../components/listsComponents/ProductLists';
import fetcher from '../../../helpers/fetchApi';
import lib from '../../../helpers/utils';

const QueenProductDetails = () => {
  const { id } = useParams();
  const queen = useLocation().search;
  const [queenProducts, setQueenProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = new URLSearchParams(queen);
  const name = query.get('queen');

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      const { data } = await fetcher.get({
        url: `/api/admin/product/get/all/by-queen/for-queen/${id}`,
      });
      setQueenProducts(data.data);
      setIsLoading(false);
    })();
  }, [id]);

  const { pending, approved, rejected, disabled } =
    lib.productSeparate(queenProducts);

  const cards = [
    {
      id: 1,
      data: pending,
      field: 'Pending Products',
      path: `/me/details/${id}/products/Pending`,
      length: pending.length,
    },
    {
      id: 2,
      data: approved,
      field: 'Approved Products',
      path: `/me/details/${id}/products/Approved`,
      length: approved.length,
    },
    {
      id: 3,
      data: rejected,
      field: 'Rejected Products',
      path: `/me/details/${id}/products/Rejected`,
      length: rejected.length,
    },
    {
      id: 4,
      data: disabled,
      field: 'Disabled Products',
      path: `/me/details/${id}/products/Disabled`,
      length: disabled.length,
    },
  ];

  const lists = [
    {
      data: pending,
      title: 'Pending',
      path: `/me/details/${id}/products/Pending`,
    },
    {
      data: approved,
      title: 'Approved',
      path: `/me/details/${id}/products/Approved`,
    },
    {
      data: rejected,
      title: 'Rejected',
      path: `/me/details/${id}/products/Rejected`,
    },
    {
      data: disabled,
      title: 'Disabled',
      path: `/me/details/${id}/products/Disabled`,
    },
  ];

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          {<Links id={id} name={name} category='products' />}
          <h1 className='queen-title'>
            {name && `${name}'s`} <span>Products Page</span>
          </h1>
          <div className='cards orderpage'>
            <Cards cards={cards} fetching={isLoading} />
          </div>

          {lists.map((item) => {
            return (
              <ProductLists
                data={item.data}
                title={item.title}
                key={item.title}
                fetching={isLoading}
                path={item.path}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default QueenProductDetails;
