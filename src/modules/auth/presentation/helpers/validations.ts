export const isEmailAlreadyUsedError = (error: string) => {
  return error?.includes?.("auth/email-already-in-use");
};

export const isUserNotFoundError = (error: string) => {
  return error?.includes?.("auth/user-not-found");
};
