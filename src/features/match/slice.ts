import { createSlice } from '@reduxjs/toolkit';
import { fetchMatchListData, fetchExistMatch, sendMatchRequest, replyMatchRequest } from '.';
import { MatchStoreType } from './types';

const initialState: MatchStoreType = {
  error: false,
  loading: false,
  matches: [],
  exists: [],
};

const MatchDataSlice = createSlice({
  name: 'MatchData',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMatchListData.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.matches = action.payload.data;
      } else {
        state.error = true;
        state.matches = [];
      }
    });

    builder.addCase(fetchExistMatch.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.exists = action.payload.data;
      } else {
        state.error = true;
        state.exists = [];
      }
    });

    builder.addCase(sendMatchRequest.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.exists = [action.payload.data.id,...state.exists];
      } else {
        state.error = true;
      }
    });

    builder.addCase(replyMatchRequest.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.matches.filter(item => item.id !== action.payload.data.id);
      } else {
        state.error = true;
      }
    });

    builder.addCase(fetchMatchListData.rejected, (state) => {
      state.error = true;
      state.matches = [];
    });

    builder.addCase(fetchExistMatch.rejected, (state) => {
      state.error = true;
      state.exists = [];
    });
    builder.addCase(sendMatchRequest.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(replyMatchRequest.rejected, (state) => {
      state.error = true;
    });
  },
});

export default MatchDataSlice;
