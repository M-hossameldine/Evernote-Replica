import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocationIndicator, useAppDispatch, useAppSelector } from "hooks";
import { useNavigate, Link } from "react-router-dom";

import {
  selectHasAuthError,
  selectAuthErrorMsgCode,
  resetAuthErrors,
  useLoginMutation,
  useSignupMutation,
} from "store";
import { AUTHPAGE, HOMEPAGE, ErrorsMap } from "utils/constants";

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
      "Must contain lowercase, uppercase, numbers and special characters",
    ),
});

export const AuthForm: React.FC = () => {
  const location = useLocationIndicator();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authHasError = useAppSelector(selectHasAuthError);
  const authErrorCode = useAppSelector(selectAuthErrorMsgCode);

  const isLogin = location.isInCurrentPath("login");

  const loginMutation = useLoginMutation();
  const signupMutation = useSignupMutation();

  const [authMutation, { isLoading }] = isLogin
    ? loginMutation
    : signupMutation;

  function resetAuthErrorHandler() {
    if (authHasError) {
      dispatch(resetAuthErrors());
    }
  }

  const formikHandler = async (values: FormValuesInterface) => {
    const submitSuccessfully = () => {
      navigate(HOMEPAGE);
    };

    await authMutation({
      email: values.email,
      password: values.password,
      onSuccess: submitSuccessfully,
    });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={formikHandler}
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
                  resetAuthErrorHandler();
                  handleChange(e);
                }}
                placeholder="Email"
                className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 shadow-even-1 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              {(errors.email && touched.email) ||
              ["EMAIL_EXISTS", "GENERIC_ERROR_MESSAGE"].includes(
                authErrorCode,
              ) ? (
                <div className="mt-1 text-xs text-red-700">
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
                className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 shadow-even-1 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              {errors.password && touched.password ? (
                <div className="mt-1 text-xs text-red-700">
                  {errors.password}
                </div>
              ) : null}

              {authErrorCode &&
                !["EMAIL_EXISTS", "GENERIC_ERROR_MESSAGE"].includes(
                  authErrorCode,
                ) && (
                  <div className="mt-1 text-xs text-red-700">
                    {ErrorsMap[authErrorCode]}
                  </div>
                )}
            </div>

            {/* Call to action */}
            <button
              type={isLoading ? "button" : "submit"}
              className="flex items-center justify-center rounded border-0 bg-green-500 px-6 py-2 text-lg text-white hover:bg-green-600 focus:outline-none"
            >
              {!isLoading && (!isLogin ? "Sign up" : "Sign in")}
              {isLoading && <DefaultSpinner borderColor="border-white" />}
            </button>

            {isLogin && (
              <TextLink
                route=""
                text="Forgot Password?"
                underline={false}
                className="mx-auto mt-4 table text-sm text-green-450"
              />
            )}

            {/* Terms & Privacy */}
            {!isLogin && (
              <p className="mt-3 text-center text-xs text-gray-500">
                By creating an account, you are agreeing to our
                <button className="text-green-600">
                  Terms of Service
                </button> and{" "}
                <button className="text-green-600"> Privacy Policy</button>
              </p>
            )}

            {/* toggle auth form - login/register */}
            <div className="pt-8 text-center text-sm">
              <p className="text-sm text-neutral-500">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>

              <TextLink
                text={isLogin ? "Create account" : "Sign in"}
                route={`${AUTHPAGE}/${isLogin ? "register" : "login"}`}
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

export default AuthForm;
