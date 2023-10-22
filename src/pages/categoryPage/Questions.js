import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaReply } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Cards from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { useAdminContext } from '../../contexts/adminContext';
import { useQuestionContext } from '../../contexts/QuestionContext';
import {
  FETCH_QUESTION_ANSWER_SUCCESS,
  FETCH_QUESTION_DELETED_SUCCESS,
  FETCH_QUESTION_NOT_ANSWER_SUCCESS,
  SHOW_MODAL,
  url,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const Questions = () => {
  const {
    questionsNotAnswer,
    questionsAnswered,
    questionsDeleted,
    dispatch: questionDispatch,
  } = useQuestionContext();

  const { dispatch: adminDispatch } = useAdminContext();
  const [fetching, setFetching] = useState(false);
  const questionLimit = 50;

  const urls = [
    {
      url: `/api/product-qa/get/all/answered?skip=0&limit=${questionLimit}`,
      dispatch: questionDispatch,
      action: FETCH_QUESTION_ANSWER_SUCCESS,
      check: questionsAnswered,
    },
    {
      url: `/api/product-qa/get/all/not_answered?skip=0&limit=${questionLimit}`,
      dispatch: questionDispatch,
      action: FETCH_QUESTION_NOT_ANSWER_SUCCESS,
      check: questionsNotAnswer,
    },
    {
      url: `/api/product-qa/get/all/deleted?skip=0&limit=${questionLimit}`,
      dispatch: questionDispatch,
      action: FETCH_QUESTION_DELETED_SUCCESS,
      check: questionsDeleted,
    },
  ];

  useEffect(() => {
    urls.forEach((item) => {
      const { url, action, dispatch, check } = item;
      if (!check.total) {
        setFetching(true);
        (async function () {
          const { data } = await fetcher.get({
            url: url,
          });

          dispatch({ type: action, payload: data });
          setFetching(false);
        })();
      }
    });
  }, []);

  const cards = [
    {
      id: 1,
      length: questionsNotAnswer.total,
      field: 'Not Answered',
      path: '/questions/all?type=not-answered',
    },
    {
      id: 2,
      length: questionsAnswered.total,
      field: 'Answered',
      path: '/questions/all?type=answered',
    },
    {
      id: 3,
      length: questionsDeleted.total,
      field: 'Deleted',
      path: '/questions/all?type=deleted',
    },
  ];

  const lists = [
    {
      data: questionsNotAnswer.data,
      title: 'Not Answered',
      path: 'not-answered',
    },
    { data: questionsAnswered.data, title: 'Answered', path: 'answered' },
    {
      data: questionsDeleted.data,
      title: 'Deleted',
      path: 'deleted',
    },
  ];

  const handleDlt = (id) => {
    setFetching(true);
    let uri = `/api/product-qa/delete/question/${id}/customer`;

    try {
      (async function () {
        const { data } = await fetcher.delete({
          url: uri,
        });
        if (data.success) {
          alert('successfully deleted');
        }
        setFetching(false);
      })();
    } catch (error) {
      setFetching(false);
    }
  };

  return (
    <div>
      <div className='content'>
        <main>
          <h1 className='page-header-title'>Questions</h1>

          <div className='cards orderpage'>
            <Cards cards={cards} fetching={fetching} />
          </div>

          <div className='recent-grid queen-list-page'>
            {lists?.map((item) => {
              const { data, title, path } = item;
              return (
                <div className='customers' key={title}>
                  <div className='card'>
                    <div className='card-header'>
                      <h3>{title} Questions</h3>
                      <Link to={`/questions/all?type=${path}`}>See All</Link>
                    </div>
                    <div className='card-body'>
                      {!fetching ? (
                        <>
                          {data ? (
                            <>
                              {data.slice(0, 5).map((item) => {
                                const { id, product_name, question } = item;
                           

                                return (
                                  <div key={id} className='questions-wrapper'>
                                    <div className='questions-box'>
                                      <div className=' left-part'>
                                        {product_name} -
                                        <span className='main-color'>
                                          P{id}
                                        </span>
                                        <p>{question}</p>
                                      </div>
                                      <div
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}>
                                        <div className='mr-3'>
                                          {title === 'Not Answered' && (
                                            <button
                                              className='reply-btn'
                                              type='button'
                                              onClick={() => {
                                                adminDispatch({
                                                  type: SHOW_MODAL,
                                                  payload: {
                                                    modal: 'Reply',
                                                    item,
                                                  },
                                                });
                                              }}>
                                              <FaReply />
                                            </button>
                                          )}
                                        </div>
                                        <div className=''>
                                          {title !== 'Deleted' && (
                                            <button
                                              onClick={() =>
                                                handleDlt(item?.id)
                                              }
                                              className='dlt-btn'
                                              type='button'>
                                              <MdDeleteOutline />
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <h3 className='spinner'>No {title} Questions</h3>
                          )}
                        </>
                      ) : (
                        <Spinner />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Questions;
