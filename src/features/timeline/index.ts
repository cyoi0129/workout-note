import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import TimeLineDataSlice from './slice';
import { fetchStorageTimeLine } from './db';

export const fetchTimeLine = createAsyncThunk('TimeLineData/fetchTimeLine', async (master: number) => {
  const response = await fetchStorageTimeLine(master);
  return response;
});

export default TimeLineDataSlice.reducer;
export const selectTimeLineData = (state: RootState) => state.TimeLineData;