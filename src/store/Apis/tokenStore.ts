/**
 * In-memory holder for the short-lived access token.
 *
 * Deliberately not persisted (no localStorage / Redux persistence): the token
 * is restored on page load by calling the refresh endpoint, which relies on
 * the httpOnly refresh cookie that scripts cannot read.
 */
let accessToken: string | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};
