import { UserLoginRequestType, StoreUserDataType, DbUserDataType } from './types';
import { convertApiUserData } from './func';
import { api_base } from '../../app/util';
import Cookies from 'js-cookie';

/**
 * パスワードをハッシュ化
 * @param text
 * @returns
 */
const sha256 = async (text: string): Promise<string> => {
  const uint8 = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', uint8);
  return Array.from(new Uint8Array(digest))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * ユーザーログイン
 * @param request
 * @returns
 */
export const userDbLogin = async (request: UserLoginRequestType): Promise<StoreUserDataType> => {
  const url: string = api_base + '/login';
  const password = await sha256(request.password);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ Email: request.email, Password: password }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    data: convertApiUserData(response.data.Info),
    status: response.status,
    token: response.data.Token,
  };
};

/**
 * ユーザーログイン
 * @param request
 * @returns
 */
export const userDbRegister = async (request: UserLoginRequestType): Promise<StoreUserDataType> => {
  const url: string = api_base + '/user';
  const password = await sha256(request.password);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ Email: request.email, Password: password }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    data: convertApiUserData(response.data.Info),
    status: response.status,
    token: response.data.Token,
  };
};

/**
 * ユーザー情報の取得
 * @returns
 */
export const fetchUserDbInfo = async (): Promise<StoreUserDataType> => {
  const url: string = api_base + '/person/' + String(Cookies.get('user_id'));
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('user_token')),
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    data: convertApiUserData(response.data),
    status: response.status,
    token: ''
  }
};

/**
 * ユーザー情報の更新
 * @param user_data 
 * @returns 
 */
export const updateUserDbInfo = async (user_data: DbUserDataType): Promise<StoreUserDataType> => {
  const url: string = api_base + '/person/' + String(Cookies.get('user_id'));
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('user_token')),
    }),
    body: JSON.stringify(user_data),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    data: convertApiUserData(response.data),
    status: response.status,
    token: ''
  }
};