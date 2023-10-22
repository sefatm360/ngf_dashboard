import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cards from '../../../components/Cards';
import Links from '../../../components/helperComponents/linkHelper/Links';
import SellerGigLists from '../../../components/listsComponents/SellerGigLists';
import fetcher from '../../../helpers/fetchApi';
import lib from '../../../helpers/utils';

const SellerGigDetails = () => {
  const { id } = useParams();
  const [sellerGigs, setSellerGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = new URLSearchParams(document.location.search);
  const name = params.get('seller');

  console.log({ params });

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      const { data } = await fetcher.get({
        url: `/out/api/admin/gig/get/all/by/seller/category/status/${id}/all/all?limit=15&skip=0`,
      });
      console.log(data, 'seller');
      setSellerGigs(data.data);
      setIsLoading(false);
    })();
  }, [id]);

  console.log({ sellerGigs });

  const { pending, approved, rejected, disabled } =
    lib.productSeparate(sellerGigs);

  const cards = [
    {
      id: 1,
      data: pending,
      field: 'Pending Gigs',
      path: `/sellers/details/${id}/gigs/all?type=Pending`,
      length: pending.length,
    },
    {
      id: 2,
      data: approved,
      field: 'Approved Gigs',
      path: `/sellers/details/${id}/gigs/all?type=Approved`,
      length: approved.length,
    },
    {
      id: 3,
      data: rejected,
      field: 'Rejected Gigs',
      path: `/sellers/details/${id}/gigs/all?type=Rejected`,
      length: rejected.length,
    },
  ];

  const lists = [
    {
      data: pending,
      title: 'Pending',
      path: `/sellers/details/${id}/gigs/all?type=Pending`,
      total: pending.length,
    },
    {
      data: approved,
      title: 'Approved',
      path: `/sellers/details/${id}/gigs/all?type=Approved`,
      total: approved.length,
    },
    {
      data: rejected,
      title: 'Rejected',
      path: `/sellers/details/${id}/gigs/all?type=Rejected`,
      total: rejected.length,
    },
  ];

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          {<Links id={id} name={name} category='gigs' />}
          <h1 className='queen-title'>
            {name && `${name}'s`} <span>Gigs Page</span>
          </h1>
          <div className='cards orderpage'>
            <Cards cards={cards} fetching={isLoading} />
          </div>

          {lists.map((item) => {
            console.log({ item });
            return (
              <SellerGigLists
                data={item}
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

export default SellerGigDetails;
