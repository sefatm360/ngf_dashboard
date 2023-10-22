import React, { useState } from 'react';
import { FaReply } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { useAdminContext } from '../../contexts/adminContext';
import { SHOW_MODAL, url } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const SingleQuestionsBlock = ({
  question: singleQuestion,
  type,
  setAllQuestions,
  allQuestions,
}) => {
  const [fetching, setFetching] = useState(false);
  const [singleQuestionData, setSingleQuestionData] = useState(singleQuestion);
  const { dispatch: adminDispatch } = useAdminContext();
  const { id, question, answer, product_name } = singleQuestionData || {};

  const handleDlt = async (id) => {
    setFetching(true);

    try {
      // let uri = `/api/product-qa/delete/question/${id}/customer`;

      const { data } = await fetcher.delete({
        url: `/api/product-qa/delete/question/${id}/customer`,
      });

      if (data.success) {
        const restQuestion = allQuestions.data?.filter(
          (question) => question.id !== id
        );

        // setAllQuestions({ ...allQuestions, data: restQuestion });
      }
      setFetching(false);
    } catch (error) {
      setFetching(false);
    }
  };
  return (
    <>
      <div className='questions-wrapper'>
        <div className='questions-box'>
          <div className=' left-part'>
            {product_name} -<span className='main-color'>P{id}</span>
            <p>
              <b>Question:</b> {question}
            </p>
            <p>
              <b>Answer:</b> {answer}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div className='mr-3'>
              {type === 'not-answered' && (
                <button
                  className='reply-btn'
                  type='button'
                  onClick={() => {
                    adminDispatch({
                      type: SHOW_MODAL,
                      payload: {
                        modal: 'Reply',
                        item: singleQuestion,
                        setAllQuestions,
                        allQuestions,
                      },
                    });
                  }}
                >
                  <FaReply />
                </button>
              )}
            </div>
            <div className=''>
              {type !== 'deleted' && (
                <button
                  onClick={() => handleDlt(id)}
                  className='dlt-btn'
                  type='button'
                >
                  <MdDeleteOutline />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleQuestionsBlock;
