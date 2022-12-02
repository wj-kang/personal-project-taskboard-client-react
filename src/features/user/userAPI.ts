import { AxiosResponse } from 'axios';
import { UserLoginDTO } from '../../types/user';
import { getTokenFromStorage, userAPI } from '../../utils/axios';

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

export async function userGetAPI(token: string): Promise<UserLoginDTO> {
  const res: AxiosResponse<UserLoginDTO> = await userAPI().get('/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return res.data;
}

export async function deleteUserAPI(): Promise<void> {
  await userAPI().delete(`/`, {
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    },
    withCredentials: true,
  });
  return;
}

export async function changeUserPasswordAPI(currPassword: string, newPassword: string): Promise<void> {
  await userAPI().put(
    `/password`,
    {
      currPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromStorage()}`,
      },
      withCredentials: true,
    }
  );
  return;
}
