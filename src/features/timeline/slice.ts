import { createSlice } from '@reduxjs/toolkit';
import { fetchTimeLine } from '.';
import { TimeLineStoreType } from './types';

const initialState: TimeLineStoreType = {
  error: false,
  master: 0,
  tasks: [],
};

const TimeLineDataSlice = createSlice({
  name: 'TimeLineData',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTimeLine.fulfilled, (state, action) => {
      state.error = false;
      state.master = action.payload.master;
      state.tasks = action.payload.tasks;
    });
  },
});

export default TimeLineDataSlice;
