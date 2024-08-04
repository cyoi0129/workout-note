import { createSlice } from '@reduxjs/toolkit';
import { fetchNoticeData, removeMatchNoticeData, removeMessageNoticeData } from '.';
import { NoticeStoreType } from './types';

const initialState: NoticeStoreType = {
  error: false,
  loading: false,
  notices: [],
  matches: 0,
  messages: [],
};

const NoticeDataSlice = createSlice({
  name: 'NoticeData',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNoticeData.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.notices = action.payload.data;
        state.matches = state.notices.filter(item => item.type === "REQUEST").length;
        state.messages = state.notices.filter(item => item.type === "MESSAGE").map(item => item.chat_id);
      } else {
        state.error = true;
        state.notices = [];
        state.matches = 0;
        state.messages = [];
      }
    });

    builder.addCase(removeMatchNoticeData.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.notices = state.notices.filter(item => item.type!== "REQUEST");
        state.matches = 0;
      } else {
        state.error = true;
        state.notices = [];
        state.matches = 0;
        state.messages = [];
      }
    });

    builder.addCase(removeMessageNoticeData.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.notices = state.notices.filter(item => item.chat_id !== action.payload.data);
        state.messages = state.messages.filter(item => item !== action.payload.data);
      } else {
        state.error = true;
        state.notices = [];
        state.matches = 0;
        state.messages = [];
      }
    });

    builder.addCase(fetchNoticeData.rejected, (state) => {
      state.error = true;
      state.notices = [];
      state.matches = 0;
      state.messages = [];
    });
    builder.addCase(removeMatchNoticeData.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(removeMessageNoticeData.rejected, (state) => {
      state.error = true;
    });
  },
});

export default NoticeDataSlice;
