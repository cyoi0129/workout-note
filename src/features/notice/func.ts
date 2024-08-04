import { DbNoticeItemType, NoticeItemType } from './types';

/**
 * 
 * @param data 
 * @returns 
 */
export const convertApiNotice = (data: DbNoticeItemType): NoticeItemType => {
  return {
    id: data.Id,
    user_id: data.UserID,
    chat_id: data.ChatID,
    type: data.Type,
  };
};

/**
 * 
 * @param data 
 * @returns 
 */
export const convertApiNoticeList = (data: DbNoticeItemType[]): NoticeItemType[] => {
  const result: NoticeItemType[] = [];
  data.forEach((item) => {
    result.push(convertApiNotice(item));
  });
  return result;
};
