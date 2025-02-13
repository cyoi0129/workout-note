import { createSlice } from '@reduxjs/toolkit';
import { fetchMasterData, fetchMasterStorage, fetchMasterJson } from '.';
import { MasterStoreType } from './types';
import { intialIndexedDb } from './db';
import Cookies from 'js-cookie';

const initialState: MasterStoreType = {
  error: false,
  loading: false,
  lines: [],
  areas: [],
  gyms: [],
  menus: [],
  muscles: [],
  stations: [],
};

const MasterDataSlice = createSlice({
  name: 'MasterData',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMasterData.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.loading = false;
        state.lines = action.payload.data.lines;
        state.areas = action.payload.data.areas;
        state.gyms = action.payload.data.gyms;
        state.stations = action.payload.data.stations;
        state.muscles = action.payload.data.muscles;
        state.menus = action.payload.data.menus;
        Cookies.set('master', '1', { expires: 1000 });
        intialIndexedDb(action.payload);
      } else {
        state.error = true;
        state.loading = false;
        state.lines = [];
        state.areas = [];
        state.gyms = [];
        state.stations = [];
        state.muscles = [];
        state.menus = [];
        Cookies.remove('master');
      }
    });
    builder.addCase(fetchMasterJson.fulfilled, (state, action) => {
      state.error = false;
      state.loading = false;
      state.lines = action.payload.data.lines;
      state.areas = action.payload.data.areas;
      state.gyms = action.payload.data.gyms;
      state.stations = action.payload.data.stations;
      state.muscles = action.payload.data.muscles;
      state.menus = action.payload.data.menus;
      Cookies.set('master', '1', { expires: 1000 });
      intialIndexedDb(action.payload);
    });
    builder.addCase(fetchMasterStorage.fulfilled, (state, action) => {
      state.error = false;
      state.loading = false;
      state.lines = action.payload.data.lines;
      state.areas = action.payload.data.areas;
      state.gyms = action.payload.data.gyms;
      state.stations = action.payload.data.stations;
      state.muscles = action.payload.data.muscles;
      state.menus = action.payload.data.menus;
    });
    builder.addCase(fetchMasterData.rejected, (state) => {
      state.error = true;
      state.loading = false;
      state.lines = [];
      state.areas = [];
      state.gyms = [];
      state.stations = [];
      state.muscles = [];
      state.menus = [];
      Cookies.remove('master');
    });
    builder.addCase(fetchMasterData.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
  },
});

export default MasterDataSlice;
