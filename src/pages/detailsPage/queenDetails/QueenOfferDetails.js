import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Cards from '../../../components/Cards';
import Links from '../../../components/helperComponents/linkHelper/Links';
import OffersLists from '../../../components/listsComponents/OffersLists';
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
        url: `/api/admin/offers/get/queen/${id}`,
      });

      setQueenProducts(data.data);
      setIsLoading(false);
    })();
  }, [id]);

  const { pending, approved, rejected } = lib.separate(queenProducts);

  const cards = [
    { id: 1, data: pending, field: 'Pending Offers', path: '/products' },
    { id: 2, data: approved, field: 'Approved Offers', path: '/products' },
    { id: 3, data: rejected, field: 'Rejected Offers', path: '/products' },
  ];

  const lists = [
    { data: pending, title: 'Pending', path: `pending?queen=${id}` },
    { data: approved, title: 'Approved', path: `approved?queen=${id}` },
    { data: rejected, title: 'Rejected', path: `rejected?queen=${id}` },
  ];

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          {<Links id={id} name={name} category='offers' />}
          <h1 className='queen-title'>
            {name && `${name}'s`} <span>Offers Page</span>
          </h1>
          <div className='cards orderpage'>
            <Cards cards={cards} fetching={isLoading} />
          </div>

          {lists.map((item) => {
            return (
              <OffersLists
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
