import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAdminContext } from '../contexts/adminContext';
import { ADMIN_LOGOUT, HAMBURGER_SHOW, url } from '../helpers/constants';
import { VscBell } from 'react-icons/vsc';
import NotificationBox from './Notifications/NotificationBox';
import { FaChevronRight } from 'react-icons/fa';
import { RiMessage3Line } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { FaChevronLeft } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { useInboxContext } from '../contexts/inboxContext';
import { Link } from 'react-router-dom';
import { useNotificationContext } from '../contexts/notificationContext';

const Header = () => {
  const { unreadCount } = useInboxContext();
  const { hamburger, dispatch } = useAdminContext();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false);
  const [navigateUrl, setNavigateUrl] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [specificValue, setSpecificValue] = useState('');
  const { unreadNotifications } = useNotificationContext();

  const handleLogout = () => {
    sessionStorage.removeItem('admin');
    dispatch({ type: ADMIN_LOGOUT });
  };

  useEffect(() => {
    window.onclick = () => {
      if (notification) {
        setNotification(false);
      }
    };
  }, [notification]);

  const history = useNavigate();

  const handleOnSearch = async () => {
    history(
      `/search-content/${navigateUrl}?type=${specificValue}&search=${searchValue}`
    );
  };

  return (
    <div className='main-content'>
      <header>
        <div
          className={`  ${hamburger ? 'hamburger-blur' : 'd-none'}`}
          onClick={() => {
            dispatch({ type: HAMBURGER_SHOW, payload: false });
          }}
        ></div>
        <div className='hamburger d-none'>
          <span>
            <FaBars
              className={`${hamburger ? 'svg-focus' : ''}`}
              onClick={() =>
                dispatch({ type: HAMBURGER_SHOW, payload: !hamburger })
              }
            />
          </span>
        </div>
        <div className='nav-buttons nav-buttons-header'>
          <button onClick={() => navigate(-1)}>
            <FaChevronLeft />
          </button>
          <button onClick={() => navigate(1)}>
            {' '}
            <FaChevronRight />{' '}
          </button>
        </div>
        <div className='search-wrapper'>
          <select
            onChange={(e) => {
              setNavigateUrl(e.target.value);
              setSpecificValue('');
            }}
            className='search-selector header-selector'
            value={navigateUrl}
            required
          >
            <option value='' disabled hidden>
              Select
            </option>
            <option value='queens'>ME's</option>
            <option value='products'>Products</option>
            <option value='orders'>Orders</option>
            {/* <option value='Gigs'>Gigs</option>
            <option value='Training'>Training</option> */}
          </select>

          {navigateUrl && (
            <select
              onChange={(e) => {
                setSpecificValue(e.target.value);
                setSearchValue('');
              }}
              className='search-selector header-selector'
              value={specificValue}
              required
            >
              <option value='' disabled hidden>
                Option
              </option>
              <option value='id'>ID</option>
              <option
                className={`${navigateUrl === 'orders' ? 'd-none' : 'd-block'}`}
                value='name'
              >
                Name
              </option>
              <option
                className={`${
                  navigateUrl === 'products' || navigateUrl === 'orders'
                    ? 'd-none'
                    : 'd-block'
                }`}
                value='phone'
              >
                Phone
              </option>
              <option
                className={`${navigateUrl === 'orders' ? 'd-block' : 'd-none'}`}
                value='date'
              >
                Date
              </option>
            </select>
          )}

          {specificValue && (
            <span className='search-details-description'>
              {' '}
              {navigateUrl === 'queens' && specificValue === 'id'
                ? 'NGF-ME'
                : navigateUrl === 'products' && specificValue === 'id'
                ? 'OTW-P'
                : navigateUrl === 'orders' && specificValue === 'id'
                ? 'OTW-O'
                : navigateUrl === 'gigs' && specificValue === 'id'
                ? 'OTW-G'
                : navigateUrl === 'training' && specificValue === 'id'
                ? 'OTW-T'
                : ''}
            </span>
          )}
          {specificValue === 'id' ? (
            <input
              className=''
              style={{ width: '100px', padding: '0' }}
              type='number'
              placeholder='Id'
              value={searchValue}
              onKeyPress={(e) => e.key === 'Enter' && handleOnSearch()}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          ) : specificValue === 'name' ? (
            <input
              className='search-input'
              type='search'
              placeholder='Search Here'
              value={searchValue}
              onKeyPress={(e) => e.key === 'Enter' && handleOnSearch()}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          ) : specificValue === 'phone' ? (
            <input
              className='search-input'
              type='number'
              placeholder='Search Here'
              value={searchValue}
              onKeyPress={(e) => e.key === 'Enter' && handleOnSearch()}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          ) : specificValue === 'date' ? (
            <input
              width='60%'
              className='search-input header-date-input'
              type='date'
              placeholder='Search Here'
              value={searchValue}
              onKeyPress={(e) => e.key === 'Enter' && handleOnSearch()}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          ) : (
            ''
          )}
          {searchValue ? (
            <button onClick={(e) => handleOnSearch()} className='search-btn '>
              <BsSearch />
            </button>
          ) : (
            <button
              disabled
              onClick={(e) => handleOnSearch()}
              className='search-btn header-search-btn'
            >
              <BsSearch />
            </button>
          )}
        </div>

        {/* moblie searchbar and notification section */}

        <div className='searchbar-notification-section'>
          <div className='search-wrapper d-block'>
            <select
              onChange={(e) => {
                setNavigateUrl(e.target.value);
                setSpecificValue('');
              }}
              className='search-selector header-selector'
              value={navigateUrl}
              required
            >
              <option value='' disabled hidden>
                Select
              </option>
              <option value='queens'>ME's</option>
              <option value='products'>Products</option>
              <option value='orders'>Orders</option>
              {/* <option value='Gigs'>Gigs</option>
            <option value='Training'>Training</option> */}
            </select>

            {navigateUrl && (
              <select
                onChange={(e) => {
                  setSpecificValue(e.target.value);
                  setSearchValue('');
                }}
                className='search-selector header-selector'
                value={specificValue}
                required
              >
                <option value='' disabled hidden>
                  Option
                </option>
                <option value='id'>ID</option>
                <option
                  className={`${
                    navigateUrl === 'orders' ? 'd-none' : 'd-block'
                  }`}
                  value='name'
                >
                  Name
                </option>
                <option
                  className={`${
                    navigateUrl === 'products' || navigateUrl === 'orders'
                      ? 'd-none'
                      : 'd-block'
                  }`}
                  value='phone'
                >
                  Phone
                </option>
                <option
                  className={`${
                    navigateUrl === 'orders' ? 'd-block' : 'd-none'
                  }`}
                  value='date'
                >
                  Date
                </option>
              </select>
            )}

            {specificValue && (
              <span className='search-details-description'>
                {' '}
                {navigateUrl === 'queens' && specificValue === 'id'
                  ? 'NGF-ME'
                  : navigateUrl === 'products' && specificValue === 'id'
                  ? 'OTW-P'
                  : navigateUrl === 'orders' && specificValue === 'id'
                  ? 'OTW-O'
                  : navigateUrl === 'gigs' && specificValue === 'id'
                  ? 'OTW-G'
                  : navigateUrl === 'training' && specificValue === 'id'
                  ? 'OTW-T'
                  : ''}
              </span>
            )}
            {specificValue === 'id' ? (
              <input
                className='search-number-input'
                style={{ width: '100px', padding: '0' }}
                type='number'
                placeholder='Id'
                value={searchValue}
                onKeyPress={(e) => e.key === 'Enter' && handleOnSearch()}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            ) : specificValue === 'name' ? (
              <input
                className='search-input'
                type='search'
                placeholder='Search Here'
                value={searchValue}
                onKeyPress={(e) => e.key === 'Enter' && handleOnSearch()}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            ) : specificValue === 'phone' ? (
              <input
                className='search-input'
                type='number'
                placeholder='Search Here'
                value={searchValue}
                onKeyPress={(e) => e.key === 'Enter' && handleOnSearch()}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            ) : specificValue === 'date' ? (
              <input
                width='60%'
                className='search-input header-date-input'
                type='date'
                placeholder='Search Here'
                value={searchValue}
                onKeyPress={(e) => e.key === 'Enter' && handleOnSearch()}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            ) : (
              ''
            )}
            {searchValue ? (
              <button onClick={(e) => handleOnSearch()} className='search-btn '>
                <BsSearch />
              </button>
            ) : (
              <button
                disabled
                onClick={(e) => handleOnSearch()}
                className='search-btn header-search-btn'
              >
                <BsSearch />
              </button>
            )}
          </div>
        </div>

        <div className='mobile-notification-area'>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => setNotification(!notification)}
            className='notification notification-btn'
          >
            <VscBell className='notification-icon' />
            {unreadNotifications ? (
              <span className='badge'>{unreadNotifications}</span>
            ) : (
              ''
            )}
          </div>
          {notification && (
            <div>
              <NotificationBox />
            </div>
          )}
        </div>
        {/* moblie searchbar and notification section end */}
        <div className='user-wrapper'>
          <div className=''>
            <Link className='notification notification-btn' to='/inbox'>
              <span>
                <RiMessage3Line className='inbox-message' />
              </span>
              {unreadCount ? <span className='badge'>{unreadCount}</span> : ''}
            </Link>
          </div>
          <div>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => setNotification(!notification)}
              className='notification notification-btn '
            >
              <VscBell className='notification-icon' />
              {unreadNotifications ? (
                <span className='badge'>{unreadNotifications}</span>
              ) : (
                ''
              )}
            </div>
            {notification && (
              <div>
                <NotificationBox />
              </div>
            )}
          </div>
          <img
            src={`${url}/get/image/admins/1635678765454-80426504.jpg`}
            alt='admin dp'
            width='40px'
            height='40px'
          />
          <div>
            {/* <h4>{admin.name}</h4>
            <small>{admin.role}</small> */}
            <button className='logut-btn' onClick={handleLogout}>
              <FiLogOut style={{ marginRight: '5px' }} />
              Logout
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
