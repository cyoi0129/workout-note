import { UserLoginRequestType, DbUserResponseType } from './types';
import { api_base } from '../../app/util';

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
export const userDbLogin = async (request: UserLoginRequestType): Promise<DbUserResponseType> => {
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
    status: response.status,
    user: response.token,
  };
};
