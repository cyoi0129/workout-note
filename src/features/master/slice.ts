import { createSlice } from '@reduxjs/toolkit';
import { fetchData, fetchStorage } from '.';
import { MasterStoreType } from './types';
import { intialIndexedDb } from './db';
import Cookies from 'js-cookie';

const initialState: MasterStoreType = {
  error: false,
  types: [],
  muscles: [],
  masters: [],
};

const MasterDataSlice = createSlice({
  name: 'MasterData',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.types = action.payload.types;
        state.muscles = action.payload.muscles;
        state.masters = action.payload.masters;
        Cookies.set('master', '1', { expires: 30 });
        intialIndexedDb(action.payload.types, action.payload.muscles, action.payload.masters);
      } else {
        state.error = true;
        state.types = [];
        state.muscles = [];
        state.masters = [];
        Cookies.remove('master');
      }
    });
    builder.addCase(fetchStorage.fulfilled, (state, action) => {
      state.types = action.payload.types;
      state.muscles = action.payload.muscles;
      state.masters = action.payload.masters;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.error = true;
      state.types = [];
      state.muscles = [];
      state.masters = [];
      Cookies.remove('master');
    });
  },
});

export default MasterDataSlice;
