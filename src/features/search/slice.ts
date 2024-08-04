import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchData } from '.';
import { SearchStoreType } from './types';
import Cookies from 'js-cookie';

const initialState: SearchStoreType = {
  error: false,
  loading: false,
  gyms: [],
  areas: [],
  stations: [],
  data: [],
};

const SearchDataSlice = createSlice({
  name: 'SearchData',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchData.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.error = false;
        state.data = action.payload.data.filter(item => item.id !== Number(Cookies.get('user_id')));
        state.areas = action.payload.areas;
        state.stations = action.payload.stations;
        state.gyms = action.payload.gyms;
      } else {
        state.error = true;
        state.data = [];
      }
    });

    builder.addCase(fetchSearchData.rejected, (state) => {
      state.error = true;
      state.data = [];
    });
  },
});

export default SearchDataSlice;
