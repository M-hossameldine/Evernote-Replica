// Module includes user authentication process interfacse

// signup / login success response data interface
export interface USER_AUTH_DATA_INTERFACE {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  registered?: boolean;
  localId?: string;
}
