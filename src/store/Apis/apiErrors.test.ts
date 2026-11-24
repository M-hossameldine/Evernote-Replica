import { describe, expect, it } from 'vitest';

import { getFieldErrors } from './apiErrors';

const FIELDS = ['name', 'email', 'password'] as const;

describe('getFieldErrors', () => {
  it('maps body validation details to form fields', () => {
    const fieldErrors = getFieldErrors(
      {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: [
          { location: 'body', path: 'email', message: 'Invalid email address' },
          { location: 'body', path: 'email', message: 'Second email issue' },
          { location: 'body', path: 'password', message: 'Too short' },
        ],
      },
      FIELDS
    );

    expect(fieldErrors).toEqual({
      email: 'Invalid email address',
      password: 'Too short',
    });
  });

  it('ignores unknown fields, non-body details and other error codes', () => {
    expect(
      getFieldErrors(
        {
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details: [
            { location: 'body', path: 'avatar', message: 'Not shown' },
            { location: 'query', path: 'email', message: 'Not a body field' },
          ],
        },
        FIELDS
      )
    ).toEqual({});

    expect(
      getFieldErrors(
        { code: 'AUTH_EMAIL_IN_USE', message: 'Email already exists' },
        FIELDS
      )
    ).toEqual({});
  });
});
