import type { ApiError } from './appApis.interfaces';

/**
 * Field errors from a backend `VALIDATION_ERROR`, keyed by body field path
 * (e.g. `{ email: 'Invalid email address' }`), ready for Formik `setErrors`.
 * Only `fields` are kept, so errors for fields the form doesn't show fall back
 * to the general error message. Keeps the first message per field.
 */
export const getFieldErrors = <TField extends string>(
  error: ApiError,
  fields: readonly TField[]
): Partial<Record<TField, string>> => {
  const fieldErrors: Partial<Record<TField, string>> = {};
  if (error.code !== 'VALIDATION_ERROR') return fieldErrors;

  for (const detail of error.details ?? []) {
    const field = detail.path as TField;
    if (
      detail.location === 'body' &&
      fields.includes(field) &&
      !fieldErrors[field]
    ) {
      fieldErrors[field] = detail.message;
    }
  }
  return fieldErrors;
};
