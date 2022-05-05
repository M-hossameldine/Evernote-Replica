import React, { useState } from 'react';
import { useLocationIndicator } from '../../hooks';
import { VerticalLogo } from '../../assets/index';

const AuthForm: React.FC = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocationIndicator();

  const isLogin = location.isInCurrentPath('login');

  const emailChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const passwordChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={submitHandler}
      className='w-full md:w-[32rem] h-screen md:h-auto bg-white rounded-lg p-8 py-16  mx-auto mt-10 md:mt-0 relative z-10 shadow-even-3'
    >
      <div className='flex flex-col max-w-[20rem] mx-auto'>
        <img
          src={VerticalLogo}
          alt='Evernote Logo'
          className='max-w-[11rem] mx-auto'
        />

        <p className='text-neutral-600 mx-auto mt-5 mb-12'>
          Remember everything important.
        </p>
        <div className='relative mb-4'>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={emailChangeHandler}
            className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 shadow-even-1 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
        </div>

        <div className='relative mb-4'>
          <input
            type='password'
            id='passowrd'
            name='passowrd'
            placeholder='Password'
            value={password}
            onChange={passwordChangeHandler}
            className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 shadow-even-1 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
        </div>

        {/* Call to action */}
        <button
          type='submit'
          className='text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg'
        >
          {!isLogin ? 'Sign up' : 'Sign in'}
          {false && 'Continue'}
        </button>

        {/* Terms & Privacy */}
        {!isLogin && (
          <p className='text-xs text-center text-gray-500 mt-3'>
            By creating an account, you are agreeing to our
            <button className='text-green-600'>
              Terms of Service
            </button> and{' '}
            <button className='text-green-600'> Pirvacy Plicy</button>
          </p>
        )}

        {/* toggle auth form - login/register */}
        <p className='text-sm text-center text-neutral-500 pt-8'>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <br />
          <button type='button' className='text-base text-green-600'>
            {isLogin ? 'Create account' : 'Sign in'}
          </button>
        </p>
      </div>
    </form>
  );
};

export default AuthForm;
