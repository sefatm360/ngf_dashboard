import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const handlePasswordReset = () => {};
  return (
    <div className='wrapper fadeInDown'>
      <div id='formContent'>
        <h2 className='active'>Forgot Password</h2>
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
            />
          </div>
          <input
            type='submit'
            className='fadeIn fourth'
            value='Reset Password (temporary disabled)'
            disabled
            onClick={handlePasswordReset}
          />
        </form>

        <div id='formFooter'>
          <Link className='underlineHover' to='/login'>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
