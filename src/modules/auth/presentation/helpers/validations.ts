import * as Yup from 'yup';

export const isEmailAlreadyUsedError = (code?: string | null) =>
  code === 'AUTH_EMAIL_IN_USE';

const email = Yup.string()
  .email('Invalid email')
  .required('Email is required!');

// Mirrors the backend: rules apply on sign-up only, login just needs a value.
export const loginValidationSchema = Yup.object().shape({
  email,
  password: Yup.string()
    .max(128, 'Too Long! Max 128 Characters')
    .required('Password is required!'),
});

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .max(100, 'Too Long! Max 100 Characters')
    .required('Name is required!'),
  email,
  password: Yup.string()
    .min(8, 'Too Short, Min 8 Characters!')
    .max(128, 'Too Long! Max 128 Characters')
    .required('Password is required!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Must contain lowercase, uppercase, numbers and special characters'
    ),
});
