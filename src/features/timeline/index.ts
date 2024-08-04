import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { RootState, AsyncThunkConfig } from '../../app/store';
import { TimeLineDbResponseType } from './types';
import TimeLineDataSlice from './slice';
import { fetchStorageTimeLine } from './db';

export const fetchTimeLine: AsyncThunk<TimeLineDbResponseType, number, AsyncThunkConfig> = createAsyncThunk('TimeLineData/fetchTimeLine', async (master: number) => {
  const response = await fetchStorageTimeLine(master);
  return response;
});

export default TimeLineDataSlice.reducer;
export const selectTimeLineData = (state: RootState) => state.TimeLineData;