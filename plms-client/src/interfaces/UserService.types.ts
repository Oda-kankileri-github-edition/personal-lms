import User from './User';
import Response from './Response';

/**
 * Request for login
 * @interface LoginRequest
 */
export interface LoginRequest {
  /** Username */
  username: string;
  /** Password */
  password: string;
}

/**
 * Response for login
 * @interface LoginResponse
 */
export interface LoginResponse extends Response {
  /** JWT Token if successful login */
  token?: string;
  /** User info if successful login */
  user?: User;
}

/**
 * Response for logout
 * logout response is a basic response
 * @interface LogoutResponse
 */
export interface LogoutResponse extends Response {}

/**
 * Request for register
 * @interface RegisterRequest
 */
export interface RegisterRequest {
  /** Username */
  username: string;
  /** Email */
  email: string;
  /** Password */
  password: string;
  /** Avatar Photo URL or image */
  avatar?: string | File; // either an url or a file
}

/**
 * Response for register
 * register response is a basic response
 * @interface RegisterResponse
 */
export interface RegisterResponse extends Response {}

/**
 * Request for update user
 * update user request is a user object but avatar might be a file
 * @interface UpdateUserRequest
 */
export interface UpdateUserRequest {
  /** User id (uuidv4) */
  id: string;
  /** Username */
  username?: string;
  /** Email */
  email?: string;
  /** Avatar Photo URL or image */
  avatar?: string | File; // either an url or a file
}

/**
 * Response for update user
 * update user response is a basic response
 * @interface UpdateUserResponse
 *
 */
export interface UpdateUserResponse extends Response {}

/**
 * Request for delete user
 * @interface DeleteUserRequest
 */
export interface DeleteUserRequest {}

/**
 * Response for delete user
 * @interface DeleteUserResponse
 */
export interface DeleteUserResponse extends Response {}

/**
 * Update password Request
 * @interface UpdatePasswordRequest
 */
export interface UpdatePasswordRequest {
  /** Current password */
  currentPassword: string;
  /** New password */
  newPassword: string;
}

/**
 * Update password Response
 * @interface UpdatePasswordResponse
 */
export interface UpdatePasswordResponse extends Response {}
