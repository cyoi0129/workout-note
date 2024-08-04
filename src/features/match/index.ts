import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { RootState, AsyncThunkConfig } from '../../app/store';
import { fetchDbMatchList, fetchExistMatchData, sendDbMatchRequest, replyDbMatchRequest } from './db';
import MatchDataSlice from './slice';
import { ApiMatchListResponseType, ApiExistResponseType, DbSendMatchItemType, ApiMatchResponseType, DbMatchItemType } from './types';

export const fetchMatchListData: AsyncThunk<ApiMatchListResponseType, void, AsyncThunkConfig> = createAsyncThunk('MatchData/fetchMatchListData', async () => {
  const response = await fetchDbMatchList();
  return response;
});

export const fetchExistMatch: AsyncThunk<ApiExistResponseType, void, AsyncThunkConfig> = createAsyncThunk('MatchData/fetchExistMatch', async () => {
  const response = await fetchExistMatchData();
  return response;
});

export const sendMatchRequest: AsyncThunk<ApiMatchResponseType, DbSendMatchItemType, AsyncThunkConfig> = createAsyncThunk('MatchData/sendMatchRequesta', async (match: DbSendMatchItemType) => {
  const response = await sendDbMatchRequest(match);
  return response;
});

export const replyMatchRequest: AsyncThunk<ApiMatchResponseType, DbMatchItemType, AsyncThunkConfig> = createAsyncThunk('MatchData/replyMatchRequesta', async (match: DbMatchItemType) => {
  const response = await replyDbMatchRequest(match);
  return response;
});

export default MatchDataSlice.reducer;
export const selectMatchData = (state: RootState) => state.MatchData;