import React, { useEffect, useState } from 'react';
import fetcher from '../../helpers/fetchApi';
import SingleQuestionsBlock from '../SearhContentPage/SingleQuestionsBlock';

const SeeAllQuestions = () => {
  const params = new URLSearchParams(document.location.search);
  let type = params.get('type');

  const [allQuestions, setAllQuestions] = useState({
    data: [],
    total: '',
  });

  useEffect(() => {
    let uri = `/api/product-qa/get/all/not_answered?skip=0&limit=50`;

    if (type) {
      uri = `/api/product-qa/get/all/${type}?skip=0&limit=50`;
    }

    (async function () {
      const { data } = await fetcher.get({
        url: uri,
      });

    

      if (data.success) {
        setAllQuestions({
          ...allQuestions,
          data: data.data,
          total: data.total,
        });
      }
    })();
  }, [type]);



  return (
    <div className='content'>
      <main>
        <h1 className='mt-5 mb-4'>
          {type.charAt(0).toUpperCase() + type.slice(1)} Questions
        </h1>

        <div className={`queen-page-content`}>
          {allQuestions.total === 0 ? (
            <h1 className='text-center mt-5 not-found'>
              No Question Found !!Please try again
            </h1>
          ) : (
            <div>
              {allQuestions.data?.map((question, index) => (
                <SingleQuestionsBlock
                  key={index + 1}
                  question={question}
                  type={type}
                  setAllQuestions={setAllQuestions}
                  allQuestions={allQuestions}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SeeAllQuestions;
