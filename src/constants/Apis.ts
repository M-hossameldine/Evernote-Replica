export const API_KEY = 'AIzaSyDAH7lL1RuT9Rj80GqLQy4R-l8Jb1zzdpM'; // firebase project key
const BASE_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts';

export const LOGIN_ENDPOINT = `${BASE_ENDPOINT}:signInWithPassword?key=${API_KEY}`;
export const SIGNUP_ENDPOINT = `${BASE_ENDPOINT}:signUp?key=${API_KEY}`;
export const CHANGE_PASSWORD_ENDPOINT = `${BASE_ENDPOINT}:update?key=${API_KEY}`;
