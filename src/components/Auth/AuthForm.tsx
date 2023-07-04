import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocationIndicator, useAppDispatch, useAppSelector } from "hooks";
import { useNavigate, Link } from "react-router-dom";

import {
  loginThunk,
  selectAuthLoading,
  selectHasAuthError,
  selectAuthErrorMsgCode,
  resetAuthErrors,
} from "store";
import {
  AUTHPAGE,
  HOMEPAGE,
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
  ErrorsMap,
} from "utils/constants";

import { VerticalLogo } from "assets";

import { TextLink, DefaultSpinner } from "components";

interface FormValuesInterface {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required!"),
  password: Yup.string()
    .min(8, "Too Short, Min 8 Characters!")
    .max(25, "Too Long! Max 25 Characters")
    .required("Password is required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must contain lowercase, uppercase, numbers and special characters"
    ),
});

const AuthForm: React.FC = () => {
  const location = useLocationIndicator();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authIsLoading = useAppSelector(selectAuthLoading);
  const authHasError = useAppSelector(selectHasAuthError);
  const authErrorCode = useAppSelector(selectAuthErrorMsgCode);

  const isLogin = location.isInCurrentPath("login");

  function resetAuthErrorHandler() {
    if (authHasError) {
      dispatch(resetAuthErrors());
    }
  }

  const formikHandler = async (values: FormValuesInterface) => {
    const url = isLogin ? LOGIN_ENDPOINT : SIGNUP_ENDPOINT;

    const submitSuccessfully = () => {
      navigate(HOMEPAGE);
    };

    await dispatch(
      loginThunk({
        email: values.email,
        password: values.password,
        url,
        successHandler: submitSuccessfully,
      })
    );
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={formikHandler}
    >
      {({ errors, touched, handleChange }) => (
        <Form className="w-full md:w-[32rem] h-screen md:h-auto bg-white rounded-lg p-8 py-16  mx-auto mt-10 md:mt-0 relative z-10 shadow-even-3">
          <div className="flex flex-col max-w-[20rem] mx-auto">
            <Link to="/" className="max-w-[11rem] mx-auto">
              <img src={VerticalLogo} alt="Evernote Logo" />
            </Link>

            <p className="text-neutral-600 mx-auto mt-5 mb-12">
              Remember everything important.
            </p>
            <div className="relative mb-4">
              <Field
                type="email"
                id="email"
                name="email"
                onChange={(e: React.ChangeEvent<any>) => {
                  resetAuthErrorHandler();
                  handleChange(e);
                }}
                placeholder="Email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 shadow-even-1 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />

              {(errors.email && touched.email) ||
              ["EMAIL_EXISTS", "GENERIC_ERROR_MESSAGE"].includes(
                authErrorCode
              ) ? (
                <div className="text-xs text-red-700 mt-1">
                  {errors.email ?? ErrorsMap[authErrorCode]}
                </div>
              ) : null}
            </div>

            <div className="relative mb-4">
              <Field
                name="password"
                onChange={(e: React.ChangeEvent<any>) => {
                  resetAuthErrorHandler();
                  handleChange(e);
                }}
                onKey
                type="password"
                id="password"
                placeholder="Password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 shadow-even-1 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />

              {errors.password && touched.password ? (
                <div className="text-xs text-red-700 mt-1">
                  {errors.password}
                </div>
              ) : null}

              {authErrorCode &&
                !["EMAIL_EXISTS", "GENERIC_ERROR_MESSAGE"].includes(
                  authErrorCode
                ) && (
                  <div className="text-xs text-red-700 mt-1">
                    {ErrorsMap[authErrorCode]}
                  </div>
                )}
            </div>

            {/* Call to action */}
            <button
              type={authIsLoading ? "button" : "submit"}
              className="flex justify-center items-center text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
            >
              {!authIsLoading && (!isLogin ? "Sign up" : "Sign in")}
              {authIsLoading && <DefaultSpinner />}
            </button>

            {isLogin && (
              <TextLink
                route=""
                text="Forgot Password?"
                underline={false}
                className="table mx-auto mt-4 text-sm text-green-450 "
              />
            )}

            {/* Terms & Privacy */}
            {!isLogin && (
              <p className="text-xs text-center text-gray-500 mt-3">
                By creating an account, you are agreeing to our
                <button className="text-green-600">
                  Terms of Service
                </button> and{" "}
                <button className="text-green-600"> Privacy Policy</button>
              </p>
            )}

            {/* toggle auth form - login/register */}
            <div className="text-sm text-center  pt-8">
              <p className="text-sm text-neutral-500">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>

              <TextLink
                text={isLogin ? "Create account" : "Sign in"}
                route={`${AUTHPAGE}/${isLogin ? "register" : "login"}`}
                className="inline-flex text-base text-green-600 "
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
