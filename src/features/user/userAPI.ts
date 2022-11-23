import { AxiosResponse } from 'axios';
import { UserLoginDTO } from '../../types/user';
import { userAPI } from '../../utils/axios';

export async function userLoginAPI(email: string, password: string): Promise<UserLoginDTO> {
  const res: AxiosResponse<UserLoginDTO> = await userAPI().post('/login', {
    email,
    password,
  });
  sessionStorage.setItem('token', res.data.token);

  return res.data;
}

export async function userGuestAPI(): Promise<UserLoginDTO> {
  const res: AxiosResponse<UserLoginDTO> = await userAPI().get('/guest');
  sessionStorage.setItem('token', res.data.token);

  return res.data;
}

export async function userRegisterAPI(email: string, password: string) {
  const res: AxiosResponse<UserLoginDTO> = await userAPI().post('/register', {
    email,
    password,
  });

  return res.data;
}
