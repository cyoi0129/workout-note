import { DbFilterType, StoreSearchResultType } from './types';
import { convertApiSearchData } from './func';
import { api_base } from '../../app/util';
import Cookies from 'js-cookie';

/**
 * 条件のユーザー検索
 * @param filter
 * @returns
 */
export const fetchTargetUsers = async (filter: DbFilterType): Promise<StoreSearchResultType> => {
  const url: string = api_base + '/persons';
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('user_token')),
    }),
    body: JSON.stringify(filter),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    data: response.data === null ? [] : convertApiSearchData(response.data),
    gyms: filter.Gyms,
    areas: filter.Areas,
    stations: filter.Stations,
    status: response.status,
  };
};