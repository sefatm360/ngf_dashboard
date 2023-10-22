import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminContext } from '../../contexts/adminContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import {
  FETCH_ADMIN_FAIL,
  FETCH_ADMIN_START,
  FETCH_ADMIN_SUCCESS,
} from '../../helpers/constants';
import fetcher from '../../helpers/fetchApi';

const Login = () => {
  const { dispatch, adminFetching } = useAdminContext();
  const [passType, setPassType] = useState('password');
  const phone = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      phone: phone.current.value,
      password: password.current.value,
    };

    try {
      dispatch({ type: FETCH_ADMIN_START });
      const { data } = await fetcher.post({
        url: '/api/admin/auth/login',
        cType: 'application/json',
        body,
      });

      if (data.success === false) {
        dispatch({ type: FETCH_ADMIN_FAIL, payload: data });
      }

      if (data.success === true) {
        dispatch({ type: FETCH_ADMIN_SUCCESS, payload: data });
      }
    } catch (err) {
      dispatch({ type: FETCH_ADMIN_FAIL, payload: err });
      console.log(err);
    }
  };

  return (
    <div className='wrapper fadeInDown'>
      <div id='formContent'>
        <h2 className='active'>Sign In</h2>
        <div className='fadeIn first'>
          <span className='login-user-icon'>
            <i className='las la-user'></i>
          </span>
        </div>
        <form>
          <div className='login-input'>
            <h4>Email or Phone:</h4>
            <input
              type='text'
              id='login'
              name='login'
              placeholder='enter email or phone'
              ref={phone}
            />
          </div>
          <br />
          <div className='login-input'>
            <h4>Password:</h4>
            <div className='show-pass-alignment'>
              <input
                type={passType}
                id='password'
                name='login'
                placeholder='password'
                ref={password}
              />
              <span className='show-hide-icons'>
                {passType === 'password' ? (
                  <AiFillEye
                    className='show-hide-pass'
                    onClick={() => setPassType('text')}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className='show-hide-pass'
                    onClick={() => setPassType('password')}
                  />
                )}
              </span>
            </div>
          </div>
          <input
            type='submit'
            className='fadeIn fourth'
            value={adminFetching ? 'Logging in...' : 'Log In'}
            onClick={handleSubmit}
          />
        </form>

        <div id='formFooter'>
          <Link className='underlineHover' to='/forgot-password'>
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
