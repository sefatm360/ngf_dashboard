import React, { useState } from 'react';
import { useAdminContext } from '../../contexts/adminContext';
import { HIDE_MODAL } from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const ReplyModal = ({ setUpdateSpinner, data }) => {
  const { item, setAllQuestions, allQuestions } = data;
  const { id } = item || {};
  const [questionReply, setQuestionReply] = useState({ answer: '' });
  const { dispatch: adminDispatch } = useAdminContext();
  const handleReply = async (e) => {
    e.preventDefault();

    try {
      setUpdateSpinner(true);
      const { data } = await fetcher.put({
        url: `/api/product-qa/answer/question/${id}`,
        cType: 'application/json',
        body: { answer: questionReply?.answer },
      });

      
      setUpdateSpinner(false);
      if (data.success) {
        const restQuestion = allQuestions?.data?.filter(
          (question) => question.id !== item.id
        );

        setAllQuestions({
          ...allQuestions,
          data: restQuestion,
        });
      }
    } catch (err) {
      console.log(err);
      setUpdateSpinner(false);
    }
    adminDispatch({ type: HIDE_MODAL });
  };

  return (
    <div>
      <form onSubmit={handleReply}>
        <div className='first-row'>
          <label htmlFor='reply-question'>
            <span>Reply for {item?.product_name}</span>
            <input
              type='text'
              id='reply-question'
              name='reply'
              placeholder='Give Reply'
              style={{ width: 'auto' }}
              onChange={(e) => {
                setQuestionReply({ ...questionReply, answer: e.target.value });
              }}
              required
            />
          </label>
        </div>

        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default ReplyModal;
