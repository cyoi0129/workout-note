import { ApiExistResponseType, ApiMatchListResponseType, ApiMatchResponseType, DbMatchItemType, DbSendMatchItemType } from './types';
import { convertApiMatchList, convertApiMatch } from './func';
import { api_base } from '../../app/util';
import Cookies from 'js-cookie';

/**
 *
 * @returns
 */
export const fetchDbMatchList = async (): Promise<ApiMatchListResponseType> => {
  const url: string = api_base + '/match/' + Cookies.get('user_id');
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
    data: response.data === null ? [] : convertApiMatchList(response.data),
    status: response.status,
  };
};

/**
 * 既存のマッチユーザーリストを取得
 * @returns
 */
export const fetchExistMatchData = async (): Promise<ApiExistResponseType> => {
  const url: string = api_base + '/exists/' + Cookies.get('user_id');
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
    data: response.data === null ? [] : response.data,
    status: response.status,
  };
};

/**
 * 
 * @param match 
 * @returns 
 */
export const sendDbMatchRequest = async (match: DbSendMatchItemType): Promise<ApiMatchResponseType> => {
  const url: string = api_base + '/match';
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('user_token')),
    }),
    body: JSON.stringify(match),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    data: convertApiMatch(response.data),
    status: response.status,
  };
}

/**
 * 
 * @param match 
 * @returns 
 */
export const replyDbMatchRequest = async (match: DbMatchItemType): Promise<ApiMatchResponseType> => {
  const url: string = api_base + '/match/' + match.Id;
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('user_token')),
    }),
    body: JSON.stringify(match),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    data: convertApiMatch(response.data),
    status: response.status,
  };
}