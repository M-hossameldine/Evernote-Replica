import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useLocationIndicator } from '../../hooks';
import { useAppDispatch } from '../../hooks';
import { useNavigate, Link } from 'react-router-dom';

import { login, userLoginThunk } from '../../store';
import { TextLink } from '../index';
import { VerticalLogo } from '../../assets/index';
import {
  AUTHPAGE,
  API_KEY,
  HOMEPAGE,
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
} from '../../constants';

interface FormValuesInterface {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required Field'),
  password: Yup.string()
    .min(8, 'Too Short, Min 8 Characters!')
    .max(25, 'Too Long! Max 25 Characters')
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must contain lowercase, uppercase, numbers and special characters'
    ),
});

const AuthForm: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState(false); // show form submission loading style
  const location = useLocationIndicator();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLogin = location.isInCurrentPath('login');

  // const submitHandler = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   console.log('email', email);
  //   console.log('password', password);

  //   setIsLoading(true);

  //   let url = '';

  //   if (isLogin) {
  //     url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
  //   } else {
  //     url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  //   }

  //   fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       email,
  //       password,
  //       returnSecureToken: true,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       setIsLoading(false);

  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         return res.json().then((data) => {
  //           console.log(data);
  //           let errorMessage = 'Authentication Failed';

  //           if (data && data.error && data.error.message) {
  //             errorMessage = data.error.message;
  //           }

  //           throw new Error(errorMessage);
  //         });
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       dispatch(login(data.idToken));
  //       navigate(HOMEPAGE);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  const formikHandler = async (values: FormValuesInterface) => {
    setIsLoading(true);
    let url = isLogin ? LOGIN_ENDPOINT : SIGNUP_ENDPOINT;

    const submitSuccessfuly = () => {
      setIsLoading(false);
      navigate(HOMEPAGE);
    };

    await dispatch(
      userLoginThunk(values.email, values.password, url, submitSuccessfuly)
    );
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={formikHandler}
    >
      {({ errors, touched }) => (
        <Form className='w-full md:w-[32rem] h-screen md:h-auto bg-white rounded-lg p-8 py-16  mx-auto mt-10 md:mt-0 relative z-10 shadow-even-3'>
          <div className='flex flex-col max-w-[20rem] mx-auto'>
            <Link to='/' className='max-w-[11rem] mx-auto'>
              <img src={VerticalLogo} alt='Evernote Logo' />
            </Link>

            <p className='text-neutral-600 mx-auto mt-5 mb-12'>
              Remember everything important.
            </p>
            <div className='relative mb-4'>
              <Field
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 shadow-even-1 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
              {errors.email && touched.email ? (
                <div className='text-xs text-red-700'>{errors.email}</div>
              ) : null}
            </div>

            <div className='relative mb-4'>
              <Field
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 shadow-even-1 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
              {errors.password && touched.password ? (
                <div className='text-xs text-red-700'>{errors.password}</div>
              ) : null}
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
                {isLogin
                  ? "Don't have an account?"
                  : 'Already have an account?'}
              </p>

              <TextLink
                text={isLogin ? 'Create account' : 'Sign in'}
                route={`${AUTHPAGE}/${isLogin ? 'register' : 'login'}`}
                className='inline-flex text-base text-green-600 '
                underline={false}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
