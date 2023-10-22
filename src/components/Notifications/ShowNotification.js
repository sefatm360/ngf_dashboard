import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useNotificationContext } from '../../contexts/notificationContext';
import {
  SET_ALL_NOTIFICATIONS,
  SET_UNREAD_NOTIFICATION_COUNT,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const ShowNotification = ({ notificationDetails }) => {
  const { id, count, msg, status, time, type, update_id } = notificationDetails;
  const { notifications, dispatch, unreadNotifications } =
    useNotificationContext();

  const handleOnClick = async (id, status) => {
    if (status === 'unread') {
      const { data } = await fetcher.put({
        url: `/api/admin/update/notification`,
        cType: 'application/json',
        body: { id },
      });
      if (data.success) {
        const filterData = [...notifications].find(
          (singleData) => singleData.id === id
        );
        filterData['status'] = 'read';

        dispatch({ type: SET_ALL_NOTIFICATIONS, payload: notifications });
        dispatch({
          type: SET_UNREAD_NOTIFICATION_COUNT,
          payload: unreadNotifications - 1,
        });
      }
    }
  };

  return (
    <>
      {type === 'new-product' ? (
        <Link
          onClick={() => handleOnClick(id, status)}
          className={`d-block ${
            status === 'read' ? ' read-notification-msg' : ''
          }`}
          to={`/products`}
        >
          <div className='notification-content'>
            <p className='notification-msg'>
              <span className='count-number'> {count}</span> {msg}
            </p>
            <p>
              <span className='notification-time'>
                {moment(time).fromNow()}
              </span>{' '}
            </p>
          </div>
        </Link>
      ) : type === 'new-queen' ? (
        <Link
          onClick={() => handleOnClick(id, status)}
          className={`d-block ${
            status === 'read' ? ' read-notification-msg' : ''
          }`}
          to={`/me`}
        >
          <div className='notification-content'>
            <p className='notification-msg'>
              <span className='count-number'> {count}</span> {msg}
            </p>
            <p>
              <span className='notification-time'>
                {moment(time).fromNow()}
              </span>
            </p>
          </div>
        </Link>
      ) : type === 'new-order' ? (
        <Link
          onClick={() => handleOnClick(id, status)}
          className={`d-block ${
            status === 'read' ? ' read-notification-msg' : ''
          }`}
          to={`/orders`}
        >
          <div className='notification-content'>
            <p className='notification-msg'>
              <span className='count-number'> {count}</span> {msg}
            </p>
            <p>
              <span className='notification-time'>
                {moment(time).fromNow()}
              </span>
            </p>
          </div>
        </Link>
      ) : type === 'product-updated' ? (
        <Link
          onClick={() => handleOnClick(id, status)}
          className={`d-block ${
            status === 'read' ? ' read-notification-msg' : ''
          }`}
          to={`/products/details/${update_id}`}
        >
          <div className='notification-content'>
            <p className='notification-msg'>
              <span className='count-number'>
                <span className='main-color'>OTW-P {update_id}</span>
              </span>{' '}
              -{msg}
            </p>
            <p>
              <span className='notification-time'>
                {moment(time).fromNow()}
              </span>
            </p>
          </div>
        </Link>
      ) : type === 'queen-updated' ? (
        <Link
          onClick={() => handleOnClick(id, status)}
          className={`d-block ${
            status === 'read' ? ' read-notification-msg' : ''
          }`}
          to={`/me/details/${update_id}`}
        >
          <div className='notification-content'>
            <p className='notification-msg'>
              <span className='count-number'>
                <span className='main-color'>NGF-ME {update_id}</span>{' '}
              </span>{' '}
              -{msg}
            </p>
            <p>
              <span className='notification-time'>
                {moment(time).fromNow()}
              </span>
            </p>
          </div>
        </Link>
      ) : (
        <Link
          className={`d-block ${
            status === 'read' ? ' read-notification-msg' : ''
          }`}
          to=''
        >
          <div className='notification-content'>
            <p className='notification-msg'>
              <span className='count-number'> {count}</span> {msg}
            </p>
            <p>
              <span className='notification-time'>
                {moment(time).fromNow()}
              </span>
            </p>
          </div>
        </Link>
      )}
    </>
  );
};

export default ShowNotification;
