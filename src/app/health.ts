import { api_base } from './util';

/**
 * APIサーバー起動状況チェック
 * @returns
 */
export const checkApiHealth = async (): Promise<string> => {
  const url: string = api_base + '/health';
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      return "DOWN";
    });
  return response.data;
};