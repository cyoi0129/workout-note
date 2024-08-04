import { convertApiNoticeList } from './func';
import { api_base } from '../../app/util';
import Cookies from 'js-cookie';
import { ApiNoticeListResponseType, ApiRemoveNoticeResponseType } from './types';

/**
 *
 * @returns
 */
export const fetchDbNoticeList = async (): Promise<ApiNoticeListResponseType> => {
  const url: string = api_base + '/notice/' + Cookies.get('user_id');
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
    data: response.data === null ? [] : convertApiNoticeList(response.data),
    status: response.status,
  };
};

/**
 * 
 * @returns 
 */
export const removeDbMatchNotice = async (): Promise<ApiRemoveNoticeResponseType> => {
  const url: string = api_base + '/match_notice/' + Cookies.get('user_id');
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('user_token')),
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    data: response.data,
    status: response.status,
  };
};


export const removeDbMessageNotice = async (target_id: number): Promise<ApiRemoveNoticeResponseType> => {
  const url: string = api_base + '/message_notice/' + target_id;
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('user_token')),
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    data: response.data,
    status: response.status,
  };
};