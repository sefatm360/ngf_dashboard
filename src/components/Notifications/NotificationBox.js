import React, { useEffect, useState } from 'react';
import ShowNotification from './ShowNotification';
import { useNotificationContext } from '../../contexts/notificationContext';
import fetcher from '../../helpers/fetchApi';
import { CLEAR_NOTIFICATIONS } from '../../helpers/constants';

const NotificationBox = () => {
  const { unreadNotifications, dispatch, notifications } =
    useNotificationContext();

  const handleOnClear = async () => {
    const { data } = await fetcher.delete({
      url: `/api/admin/clear/all/notification`,
      cType: 'application/json',
    });

    if (data.success) {
      dispatch({ type: CLEAR_NOTIFICATIONS });
    }
  };

  return (
    <div className='notification-main-box-wrapper'>
      <div className='notification-box-wrapper'>
        <div className='notification-box-header'>
          <div>
            <p>Notifications</p>
          </div>
          <div>
            <span onClick={handleOnClear} className='clear-btn'>
              Clear All
            </span>
          </div>
        </div>

        <div
          className={`notification-content-box ${
            notifications.length > 10 && ' notification-content-box-height'
          }`}
        >
          {!notifications.length && (
            <div
              style={{ textAlign: 'center', color: '#000', margin: '10px 0' }}
            >
              <span style={{ color: 'rgba(17, 17, 17, 0.61)' }}>
                No notifications found
              </span>
            </div>
          )}
          {notifications.map((notification) => (
            <ShowNotification
              key={notification.id}
              notificationDetails={notification}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationBox;
