import { DbMessageItemType, MessageItemType, DbSendMessageItemType, DbChatItemType, ChatItemType } from './types';

/**
 * 
 * @param data 
 * @returns 
 */
export const convertApiMessage = (data: DbMessageItemType): MessageItemType => {
  return {
    id: data.Id,
    chatID: data.ChatID,
    sender: data.Sender,
    receiver: data.Receiver,
    content: data.Content,
    date: data.Date,
  };
};

/**
 * 
 * @param data 
 * @returns 
 */
export const convertApiChat = (data: DbChatItemType): ChatItemType => {
  return {
    id: data.Id,
    targetId: data.TargetId,
    targetName: data.TargetName,
    message: data.Message,
    date: data.Date,
  };
};

/**
 * 
 * @param data 
 * @returns 
 */
export const convertApiMessageList = (data: DbMessageItemType[]): MessageItemType[] => {
  const result: MessageItemType[] = [];
  data.forEach((item) => {
    result.push(convertApiMessage(item));
  });
  return result;
};

/**
 * 
 * @param data 
 * @returns 
 */
export const convertApiChatList = (data: DbChatItemType[]): ChatItemType[] => {
  const result: ChatItemType[] = [];
  data.forEach((item) => {
    result.push(convertApiChat(item));
  });
  return result;
};

/**
 * 
 * @param data 
 * @returns 
 */
export const convert2SendMessage = (data: MessageItemType): DbSendMessageItemType => {
  return {
    ChatID: data.chatID,
    Sender: data.sender,
    Receiver: data.receiver,
    Content: data.content,
    Date: data.date,
  };
};
/**
 * 
 * @param data 
 * @returns 
 */
export const createMarkup = (data: string | undefined) => {
  const dataStr = data ? data.replace(/&/g, '&lt;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/`/g, '&#x60;') : '';
  return { __html: dataStr.replace(/\n/g, '<br />') };
};