import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAdminContext } from '../contexts/adminContext';
import { useInboxContext } from '../contexts/inboxContext';
import { RiMessage3Line } from 'react-icons/ri';
import { ADMIN_LOGOUT } from '../helpers/constants';
import { FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
  const { hamburger, dispatch } = useAdminContext();
  const { unreadCount } = useInboxContext();

  const handleLogout = () => {
    sessionStorage.removeItem('admin');
    dispatch({ type: ADMIN_LOGOUT });
  };

  const sidebarContents = [
    { id: 1, name: 'Dashboard', path: '/' },
    { id: 2, name: `ME's`, path: '/me' },
    { id: 15, name: `ME's Offer`, path: '/me-offer' },
    { id: 3, name: 'Customers', path: '/customers' },
    { id: 4, name: 'Products', path: '/products' },
    { id: 16, name: 'Questions', path: '/questions' },
    { id: 5, name: 'Orders', path: '/orders' },
    // { id: 6, name: 'Seller', path: '/sellers' },
    // { id: 18, name: 'Buyer', path: '/buyer' },
    // { id: 7, name: 'Gigs', path: '/gigs' },
    // { id: 8, name: 'Gig Orders', path: '/gig-orders' },
    // { id: 9, name: 'Offers', path: '/offers' },
    // { id: 10, name: 'Training', path: '/training' },
    // { id: 11, name: 'Trainee', path: '/trainee' },
    // { id: 17, name: 'Blog', path: '/blog' },
    // { id: 12, name: 'Funds', path: '/funds' },
    { id: 13, name: 'Content', path: '/content' },
    { id: 14, name: 'Create Invoice', path: '/create-invoice' },
    // { id: 19, name: 'ME Connect', path: '/queen-connect' },
  ];

  return (
    <div
      className={`sidebar  ${
        hamburger === true
          ? 'sidebar-visibility-visible'
          : 'sidebar-visibility-hidden'
      } `}
    >
      <div className='sidebar-content-box'>
        <div
          className='sidebar-brand'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <span>ON THE WAY DASHBOARD</span>0 */}
          <img width='250px' src='/assets/ngf-main-logo-big.png' alt='' />
        </div>
        <div className='sidebar-menu'>
          <ul>
            {sidebarContents.map((item) => {
              const { id, name, path } = item;
              return (
                <li key={id}>
                  <NavLink
                    to={path}
                    className={(isNavActive) =>
                      isNavActive.isActive ? 'active' : ''
                    }
                  >
                    <span className='las la-igloo dashboard-icon'></span>
                    <span>{name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        {/* moblie sidebar icon area */}
        <div className='sidebar-icon-area mobile-message-icon '>
          <div className='sidebar-icon-content-box mt-3'>
            <Link className='notification notification-btn ' to='/inbox'>
              <span className='pr-0 mr-3'>
                <RiMessage3Line className='inbox-message' />
              </span>
              {unreadCount ? <span className='badge'>{unreadCount}</span> : ''}
            </Link>

            <button className='sidebar-logout-btn' onClick={handleLogout}>
              <FiLogOut style={{ marginLeft: '20px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
