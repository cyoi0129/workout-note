import { ApiChatResponseType, ApiMessageListResponseType, DbSendMessageItemType, ApiSendMessageResponseType } from './types';
import { convertApiMessageList, convertApiMessage, convertApiChatList } from './func';
import { api_base } from '../../app/util';
import Cookies from 'js-cookie';

/**
 *
 * @returns
 */
export const fetchDbChatList = async (): Promise<ApiChatResponseType> => {
  const url: string = api_base + '/chats/' + Cookies.get('user_id');
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
    data: response.data === null ? [] : convertApiChatList(response.data),
    status: response.status,
  };
};

/**
 *
 * @param chat_id
 * @returns
 */
export const fetchDbMessageList = async (chat_id: number): Promise<ApiMessageListResponseType> => {
  const url: string = api_base + '/messages/' + chat_id;
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
    data: response.data === null ? [] : convertApiMessageList(response.data),
    status: response.status,
  };
};

/**
 *
 * @param message
 * @returns
 */
export const sendDbMessage = async (message: DbSendMessageItemType): Promise<ApiSendMessageResponseType> => {
  const url: string = api_base + '/message';
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: String(Cookies.get('user_token')),
    }),
    body: JSON.stringify(message),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
  return {
    data: convertApiMessage(response.data),
    status: response.status,
  };
};

export const connectWebSocket = (chat_id: number) => {
  const uri = "ws://localhost:8080/ws/" + chat_id + '?' + new URLSearchParams({ user: String(Cookies.get('user_id')) });
  const ws = new WebSocket(uri);

  ws.onopen = () => {
    console.log('Connected');
  };

  ws.onmessage = (e) => {
    console.log(e.data);
  };

  ws.send("test message");
};
