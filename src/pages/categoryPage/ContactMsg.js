import React, { useEffect, useState } from 'react';
import fetcher from '../../helpers/fetchApi';
import { IoIosMailUnread, IoIosMailOpen } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useInboxContext } from '../../contexts/inboxContext';
import { SET_ALL_MESSAGES, SET_UNREAD_COUNT } from '../../helpers/constants';
import moment from 'moment';

const ContactMsg = () => {
  const { messages, dispatch, unreadCount } = useInboxContext();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString();

  const handleClick = async (id, status) => {
    if (status === 'unread') {
      const { data } = await fetcher.put({
        url: `/api/client/update/contact/msg/${id}`,
        cType: 'application/json',
        body: { status: 'read' },
      });
      if (data.success) {
        for (const m of messages) {
          if (m.id === id) {
            messages[messages.indexOf(m)].status = 'read';
            dispatch({ type: SET_ALL_MESSAGES, payload: messages });
            dispatch({ type: SET_UNREAD_COUNT, payload: unreadCount - 1 });
            break;
          }
        }
        navigate(`/inbox/${id}`);
      } else {
        alert('Cannot open this email now.\nPlease try again!');
      }
    } else {
      navigate(`/inbox/${id}`);
    }
  };

  return (
    <div className='content'>
      <main>
        <div className='contact-msg-section'>
          <h4 className='page-header-title ' style={{ marginBottom: '10px' }}>
            Ontheway contact inbox ({messages.length})
          </h4>
          <div style={{ backgroundColor: 'white' }}>
            {messages.map((msg) => {
              const { id, msg_date, name, message, status, note } = msg;
              let unread = false;
              if (status === 'unread') unread = true;
              return (
                <div
                  key={id}
                  onClick={() => handleClick(id, status)}
                  className='msg-wrapper'
                >
                  <div className='show-sender-name'>
                    {unread ? <IoIosMailUnread /> : <IoIosMailOpen />}
                    <span
                      className={unread ? 'text-bold contact-fs' : 'contact-fs'}
                    >
                      {name}
                    </span>
                  </div>
                  <div className='show-msg '>
                    {note ? (
                      <span
                        className='contact-fs note-none'
                        style={{ color: 'blue' }}
                      >
                        <span className='text-bold note-none  contact-fs note-none'>
                          Note:{' '}
                        </span>
                        {message.length > 30 ? note.slice(0, 30) + '...' : note}
                      </span>
                    ) : (
                      <span
                        className={
                          unread
                            ? 'text-bold contact-fs note-none'
                            : 'contact-fs note-none'
                        }
                      >
                        {message.length > 30
                          ? message.slice(0, 30) + '...'
                          : message}
                      </span>
                    )}
                    <small
                      className={unread ? 'text-bold contact-fs' : 'contact-fs'}
                    >
                      {moment(msg_date).format('MMM Do YY')}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactMsg;
