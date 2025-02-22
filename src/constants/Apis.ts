export const API_KEY = 'AIzaSyDAH7lL1RuT9Rj80GqLQy4R-l8Jb1zzdpM'; // firebase project key
export const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';

// for RTK Query Api slices
export const LOGIN_URL = `:signInWithPassword?key=${API_KEY}`;
export const SIGNUP_URL = `:signUp?key=${API_KEY}`;
export const CHANGE_PASSWORD_URL = `:update?key=${API_KEY}`;

// for old Redux Thunk Actions
export const LOGIN_ENDPOINT = `${BASE_URL}:signInWithPassword?key=${API_KEY}`;
export const SIGNUP_ENDPOINT = `${BASE_URL}:signUp?key=${API_KEY}`;
export const CHANGE_PASSWORD_ENDPOINT = `${BASE_URL}:update?key=${API_KEY}`;
