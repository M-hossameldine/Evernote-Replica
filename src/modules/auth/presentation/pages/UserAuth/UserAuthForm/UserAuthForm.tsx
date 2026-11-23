import React, { useState } from 'react';
import { Link, useNavigate, useMatch } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import {
  useRegisterMutation,
  useLoginMutation,
} from '~modules/auth/data/remote/authApis';

import {
  isEmailAlreadyUsedError,
  loginValidationSchema,
  registerValidationSchema,
} from '~modules/auth/presentation/helpers/validations';
import type { ApiError } from '~store/Apis/appApis.interfaces';

import { TextLink } from '~components/Links';
import { DefaultSpinner } from '~components/Loading';

import { VerticalLogo } from '~assets';

import { AuthMode } from '~constants/AppEnums/AuthEnums';
import { getErrorMessage } from '~constants/errors';
import { CommonRouteVariants, AuthRouteVariants } from '~constants';

interface FormValuesInterface {
  name: string;
  email: string;
  password: string;
}

const inputClassName =
  'w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 shadow-even-1 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200';

export const UserAuthForm: React.FC = () => {
  const navigate = useNavigate();
  const loginRouteMatch = useMatch(
    AuthRouteVariants.auth.pathname(AuthMode.LOGIN)
  );
  const isLogin = !!loginRouteMatch;

  const [requestError, setRequestError] = useState<ApiError | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isEmailAlreadyUsed = isEmailAlreadyUsedError(requestError?.code);
  const requestErrorMessage = requestError ? getErrorMessage(requestError) : '';

  const [registerMutation, { isLoading: registerLoading }] =
    useRegisterMutation();
  const [loginMutation, { isLoading: loginLoading }] = useLoginMutation();

  const isLoading = loginLoading || registerLoading;

  const submitHandler = async (values: FormValuesInterface) => {
    setIsSubmitted(true);

    const callbacks = {
      onSuccess: () => {
        navigate(CommonRouteVariants.userHomePage.pathname());
      },
      onError: (error: ApiError) => {
        setRequestError(error);
      },
    };

    if (isLogin) {
      loginMutation({
        payload: { email: values.email, password: values.password },
        ...callbacks,
      });
    } else {
      registerMutation({
        payload: {
          name: values.name.trim(),
          email: values.email,
          password: values.password,
        },
        ...callbacks,
      });
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={
        isLogin ? loginValidationSchema : registerValidationSchema
      }
      onSubmit={submitHandler}
      validateOnChange={isSubmitted}
      validateOnBlur={isSubmitted}
    >
      {({ errors, touched, handleChange }) => (
        <Form className="relative z-10 mx-auto mt-10 h-screen w-full rounded-lg bg-white p-8 shadow-even-3 md:mt-0 md:h-auto md:w-[32rem]">
          <div className="mx-auto flex max-w-[20rem] flex-col">
            <Link
              to={CommonRouteVariants.publicHomePage.pathname()}
              className="mx-auto max-w-[11rem]"
            >
              <img src={VerticalLogo} alt="Evernote Logo" />
            </Link>

            <p className="mx-auto mb-12 mt-5 text-neutral-600">
              Remember everything important.
            </p>

            {!isLogin && (
              <div className="relative mb-4">
                <Field
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e: React.ChangeEvent<any>) => {
                    handleChange(e);
                    setRequestError(null);
                  }}
                  autoComplete="name"
                  placeholder="Name"
                  className={inputClassName}
                />

                {isSubmitted && errors.name && touched.name ? (
                  <div className="mt-1 text-xs text-red-700">{errors.name}</div>
                ) : null}
              </div>
            )}

            <div className="relative mb-4">
              <Field
                type="email"
                id="email"
                name="email"
                onChange={(e: React.ChangeEvent<any>) => {
                  handleChange(e);
                  setRequestError(null);
                }}
                autoComplete="email"
                placeholder="Email"
                className={inputClassName}
              />

              {isSubmitted &&
              ((errors.email && touched.email) || isEmailAlreadyUsed) ? (
                <div className="mt-1 text-xs text-red-700">
                  {errors.email ?? requestErrorMessage}
                </div>
              ) : null}
            </div>

            <div className="relative mb-4">
              <Field
                name="password"
                onChange={(e: React.ChangeEvent<any>) => {
                  handleChange(e);
                  setRequestError(null);
                }}
                type="password"
                id="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                placeholder="Password"
                className={inputClassName}
              />

              {isSubmitted && errors.password && touched.password ? (
                <div className="mt-1 text-xs text-red-700">
                  {errors.password}
                </div>
              ) : null}

              {isSubmitted && requestError && !isEmailAlreadyUsed && (
                <div className="mt-1 text-xs text-red-700">
                  {requestErrorMessage}
                </div>
              )}
            </div>

            {/* Call to action */}
            <button
              type={isLoading ? 'button' : 'submit'}
              aria-label={'Form Submit'}
              className="flex items-center justify-center rounded border-0 bg-green-500 px-6 py-2 text-lg text-white hover:bg-green-600 focus:outline-none"
              onClick={() => {
                setIsSubmitted(true);
              }}
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
