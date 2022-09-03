import axiosInstance from './axiosInstance';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  LogoutResponse,
} from '@interfaces/UserService.types';

export default class UserService {
  public async login(req: LoginRequest) {
    return await axiosInstance.post<LoginResponse>(`/login`, {}, { auth: req });
  }
  public async logout() {
    return await axiosInstance.post<LogoutResponse>(`/logout`);
  }
  public async register(req: RegisterRequest) {
    return await axiosInstance.post<RegisterResponse>(`/register`, req);
  }
  public async updateUser(req: UpdateUserRequest) {
    return await axiosInstance.put<UpdateUserResponse>(`/user`, req);
  }
  public async deleteUser() {
    return await axiosInstance.delete<DeleteUserResponse>(`/user`);
  }
  public async updatePassword(req: UpdatePasswordRequest) {
    return await axiosInstance.put<UpdatePasswordResponse>(
      `/user/password`,
      req
    );
  }
}
