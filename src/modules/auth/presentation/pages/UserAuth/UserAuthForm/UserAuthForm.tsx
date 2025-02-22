import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useLocationIndicator } from 'hooks';
import { useNavigate, Link } from 'react-router-dom';

import { useLogin, useSignup } from 'modules/auth/data/remote/authApis';
import { HOMEPAGE, ErrorsMap } from 'utils/constants';
import {
  isEmailAlreadyUsedError,
  isUserNotFoundError,
} from 'modules/auth/presentation/helpers/validations';
import { VerticalLogo } from 'assets';

import { DefaultSpinner } from 'components/Spinners';
import { TextLink } from 'components/Links';

import { AuthRouteVariants } from 'constants/routeVariants';
import { AuthMode } from 'constants/AppEnums/AuthEnums';

interface FormValuesInterface {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required!'),
  password: Yup.string()
    .min(8, 'Too Short, Min 8 Characters!')
    .max(25, 'Too Long! Max 25 Characters')
    .required('Password is required!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must contain lowercase, uppercase, numbers and special characters'
    ),
});

export const UserAuthForm: React.FC = () => {
  const location = useLocationIndicator();
  const navigate = useNavigate();

  const isLogin = location.isInCurrentPath('login');
  const [requestErrorMessage, setRequestErrorMessage] = useState<string | null>(
    null
  );
  const isEmailAlreadyUsed = isEmailAlreadyUsedError(requestErrorMessage ?? '');
  const isUserNotFound = isUserNotFoundError(requestErrorMessage ?? '');

  const [loginMutation, { isLoading: loginLoading }] = useLogin();
  const [signupMutation, { isLoading: signupLoading }] = useSignup();

  const isLoading = loginLoading || signupLoading;

  const submitHandler = async (values: FormValuesInterface) => {
    const submitSuccessfully = () => {
      navigate(HOMEPAGE);
    };

    if (isLogin) {
      loginMutation({
        payload: {
          email: values.email,
          password: values.password,
        },
        onError: error => {
          setRequestErrorMessage(error.message);
        },
      });
    } else {
      signupMutation({
        payload: {
          email: values.email,
          password: values.password,
        },
        onSuccess: submitSuccessfully,
        onError: error => {
          setRequestErrorMessage(error.message);
        },
      });
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({ errors, touched, handleChange }) => (
        <Form className="relative z-10 mx-auto mt-10 h-screen w-full rounded-lg bg-white p-8 py-16 shadow-even-3 md:mt-0 md:h-auto md:w-[32rem]">
          <div className="mx-auto flex max-w-[20rem] flex-col">
            <Link to="/" className="mx-auto max-w-[11rem]">
              <img src={VerticalLogo} alt="Evernote Logo" />
            </Link>

            <p className="mx-auto mb-12 mt-5 text-neutral-600">
              Remember everything important.
            </p>
            <div className="relative mb-4">
              <Field
                type="email"
                id="email"
                name="email"
                onChange={(e: React.ChangeEvent<any>) => {
                  handleChange(e);
                  setRequestErrorMessage(null);
                }}
                placeholder="Email"
                className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 shadow-even-1 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              {(errors.email && touched.email) ||
              isEmailAlreadyUsed ||
              isUserNotFound ? (
                <div className="mt-1 text-xs text-red-700">
                  {errors.email ?? ErrorsMap[requestErrorMessage ?? '']}
                </div>
              ) : null}
            </div>

            <div className="relative mb-4">
              <Field
                name="password"
                onChange={(e: React.ChangeEvent<any>) => {
                  handleChange(e);
                  setRequestErrorMessage(null);
                }}
                type="password"
                id="password"
                placeholder="Password"
                className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 shadow-even-1 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              {errors.password && touched.password ? (
                <div className="mt-1 text-xs text-red-700">
                  {errors.password}
                </div>
              ) : null}

              {requestErrorMessage &&
                !(isEmailAlreadyUsed || isUserNotFound) && (
                  <div className="mt-1 text-xs text-red-700">
                    {ErrorsMap[requestErrorMessage]}
                  </div>
                )}
            </div>

            {/* Call to action */}
            <button
              type={isLoading ? 'button' : 'submit'}
              aria-label={'Form Submit'}
              className="flex items-center justify-center rounded border-0 bg-green-500 px-6 py-2 text-lg text-white hover:bg-green-600 focus:outline-none"
            >
              {!isLoading && (!isLogin ? 'Sign up' : 'Sign in')}
              {isLoading && <DefaultSpinner borderColor="border-white" />}
            </button>

            {isLogin && (
              <TextLink
                route=""
                text="Forgot Password?"
                underline={false}
                className="mx-auto mt-4 table text-sm text-green-600"
              />
            )}

            {/* Terms & Privacy */}
            {!isLogin && (
              <p className="mt-3 text-center text-xs text-gray-500">
                By creating an account, you are agreeing to our
                <button
                  aria-label={'Got to Terms of Service'}
                  className="text-green-600"
                >
                  Terms of Service
                </button>
                and{' '}
                <button
                  aria-label="Go to Privacy Policy"
                  className="text-green-600"
                >
                  {' '}
                  Privacy Policy
                </button>
              </p>
            )}

            {/* toggle auth form - login/register */}
            <div className="pt-8 text-center text-sm">
              <p className="text-sm text-neutral-500">
                {isLogin
                  ? "Don't have an account?"
                  : 'Already have an account?'}
              </p>

              <TextLink
                text={isLogin ? 'Create account' : 'Sign in'}
                route={AuthRouteVariants.auth.pathname(
                  isLogin ? AuthMode.REGISTER : AuthMode.LOGIN
                )}
                className="inline-flex text-base text-green-600"
                underline={false}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserAuthForm;
