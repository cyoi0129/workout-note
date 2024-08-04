export interface MessageItemType {
  id: number;
	chatID: number;
	sender: number;
	receiver: number;
	content: string;
	date: string;
}

export interface ChatItemType {
	id: number;
  targetId: number;
  targetName: string;
	message: string;
	date: string;
}

export interface DbSendMessageItemType {
	ChatID: number;
	Sender: number;
	Receiver: number;
	Content: string;
	Date: string;
}

export interface DbChatItemType {
	Id: number;
  TargetId: number;
  TargetName: string;
	Message: string;
	Date: string;
}

export interface DbMessageItemType extends DbSendMessageItemType {
  Id: number;
}

export interface ChatStoreType {
  error: boolean;
  loading: boolean;
  chats: ChatItemType[];
  messages: MessageItemType[];
}

export interface ApiChatResponseType {
  data: ChatItemType[];
  status: number;
}

export interface ApiMessageListResponseType {
  data: MessageItemType[];
  status: number;
}

export interface ApiSendMessageResponseType {
  data: MessageItemType;
  status: number;
}