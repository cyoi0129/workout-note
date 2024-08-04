import { createAsyncThunk, AsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState, AsyncThunkConfig } from '../../app/store';
import { fetchDbChatList, fetchDbMessageList, sendDbMessage } from './db';
import ChatDataSlice from './slice';
import { DbSendMessageItemType, ApiChatResponseType, ApiMessageListResponseType, ApiSendMessageResponseType, ChatItemType } from './types';

export const fetchChatData: AsyncThunk<ApiChatResponseType, void, AsyncThunkConfig> = createAsyncThunk('ChatData/fetchChatData', async () => {
  const response = await fetchDbChatList();
  return response;
});

export const fetchMessageData: AsyncThunk<ApiMessageListResponseType, number, AsyncThunkConfig> = createAsyncThunk('ChatData/fetchMessageData', async (chat_id: number) => {
  const response = await fetchDbMessageList(chat_id);
  return response;
});

export const sendMessageData: AsyncThunk<ApiSendMessageResponseType, DbSendMessageItemType, AsyncThunkConfig> = createAsyncThunk('ChatData/sendMessageData', async (message: DbSendMessageItemType) => {
  const response = await sendDbMessage(message);
  return response;
});

export default ChatDataSlice.reducer;
export const selectChatData = (state: RootState) => state.ChatData;
export const selectChatById = (id: number) => {
  return createSelector(selectChatData, (state) => {
    const chats: ChatItemType[] = state.chats;
    if (!chats) return;
    return chats.find((chat) => chat.id === id);
  });
};