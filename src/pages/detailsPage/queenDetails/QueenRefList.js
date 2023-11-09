import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QueensPages from '../../../components/SearhContentPage/QueensPages';
import Spinner from '../../../components/Spinner';
import fetcher from '../../../helpers/fetchApi';

export default function QueenRefList() {
  const [queenRef, setQueenRef] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsloading(true);
    (async () => {
      const { data } = await fetcher.get({
        url: `/api/admin/queen/get/all/ref/queen/${id}`,
      });
      if (data.success) {
        setQueenRef(data.data);
      }
      setIsloading(false);
    })();
  }, [id]);

  return (
    <div className='content'>
      <div className='center-info'>
        <main>
          <h3>ME reference list ({queenRef.length})</h3>
          <hr />
          {isLoading ? (
            <Spinner />
          ) : (
            <div className={`queen-page-content`}>
              {!queenRef.length ? (
                <span>No Reference queen of this queen</span>
              ) : (
                <div>
                  {queenRef.map((queen, index) => (
                    <Link
                      key={queen.id}
                      className='single-queen-link'
                      to={`/me/details/${queen.id}`}
                    >
                      <QueensPages queen={queen} serial={index + 1} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
