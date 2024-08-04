import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { RootState, AsyncThunkConfig } from '../../app/store';
import { fetchDbNoticeList, removeDbMatchNotice, removeDbMessageNotice } from './db';
import NoticeDataSlice from './slice';
import { ApiNoticeListResponseType, ApiRemoveNoticeResponseType } from './types';

export const fetchNoticeData: AsyncThunk<ApiNoticeListResponseType, void, AsyncThunkConfig> = createAsyncThunk('NoticeData/fetchNoticeData', async () => {
  const response = await fetchDbNoticeList();
  return response;
});

export const removeMatchNoticeData: AsyncThunk<ApiRemoveNoticeResponseType, void, AsyncThunkConfig> = createAsyncThunk('NoticeData/removeMatchNoticeData', async () => {
  const response = await removeDbMatchNotice();
  return response;
});

export const removeMessageNoticeData: AsyncThunk<ApiRemoveNoticeResponseType, number, AsyncThunkConfig> = createAsyncThunk('NoticeData/removeMessageNoticeData', async (target_id: number) => {
  const response = await removeDbMessageNotice(target_id);
  return response;
});

export default NoticeDataSlice.reducer;
export const selectNoticeData = (state: RootState) => state.NoticeData;
