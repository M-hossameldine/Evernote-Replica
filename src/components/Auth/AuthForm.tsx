import React, { useState } from 'react';
import { useLocationIndicator } from '../../hooks';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';

import { login } from '../../store/shared-store';
import { TextLink } from '../index';
import { VerticalLogo } from '../../assets/index';
import { AUTHPAGE, API_KEY, HOMEPAGE } from '../../constants';

const AuthForm: React.FC = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // show form submission loading style
  const location = useLocationIndicator();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLogin = location.isInCurrentPath('login');

  const emailChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const passwordChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('email', email);
    console.log('password', password);

    setIsLoading(true);

    let url = '';

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);

        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            let errorMessage = 'Authentication Failed';

            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(login(data.idToken));
        navigate(HOMEPAGE);
      })
      .catch((error) => {
        console.log(error.message);
      });
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

        {isLogin && (
          <TextLink
            route=''
            text='Forgot Password?'
            underline={false}
            className='table mx-auto mt-4 text-sm text-green-450 '
          />
        )}

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
        <div className='text-sm text-center  pt-8'>
          <p className='text-sm text-neutral-500'>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>

          <TextLink
            text={isLogin ? 'Create account' : 'Sign in'}
            route={`${AUTHPAGE}/${isLogin ? 'register' : 'login'}`}
            className='text-base text-green-600'
            underline={false}
          />
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
