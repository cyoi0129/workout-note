import { createSlice } from '@reduxjs/toolkit';
import { fetchChatData, fetchMessageData, sendMessageData } from '.';
import { ChatStoreType } from './types';

const initialState: ChatStoreType = {
  error: false,
  loading: false,
  chats: [],
  messages: [],
};

const ChatDataSlice = createSlice({
  name: 'ChatData',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChatData.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.chats = action.payload.data;
      } else {
        state.error = true;
        state.chats = [];
      }
    });

    builder.addCase(fetchMessageData.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.messages = action.payload.data;
      } else {
        state.error = true;
        state.messages = [];
      }
    });

    builder.addCase(sendMessageData.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.messages = [action.payload.data, ...state.messages].sort((a, b) => a.id - b.id);
      } else {
        state.error = true;
      }
    });

    builder.addCase(fetchChatData.rejected, (state) => {
      state.error = true;
      state.chats = [];
    });

    builder.addCase(fetchMessageData.rejected, (state) => {
      state.error = true;
      state.messages = [];
    });

    builder.addCase(sendMessageData.rejected, (state) => {
      state.error = true;
    });
  },
});

export default ChatDataSlice;
