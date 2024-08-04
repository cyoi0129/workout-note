export interface NoticeItemType {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
}

export interface DbNoticeItemType {
  Id: number;
  UserID: number;
  ChatID: number;
  Type: string; // "REQUEST", "MESSAGE"
}

export interface NoticeStoreType {
  error: boolean;
  loading: boolean;
  notices: NoticeItemType[];
  matches: number;
  messages: number[];
}

export interface ApiNoticeListResponseType {
  data: NoticeItemType[];
  status: number;
}

export interface ApiRemoveNoticeResponseType {
  data: number;
  status: number;
}