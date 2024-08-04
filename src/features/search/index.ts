import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { RootState, AsyncThunkConfig } from '../../app/store';
import { DbFilterType, StoreSearchResultType } from './types';
import { fetchTargetUsers } from './db';
import SearchDataSlice from './slice';

export const fetchSearchData: AsyncThunk<StoreSearchResultType, DbFilterType, AsyncThunkConfig> = createAsyncThunk('SearchData/fetchSearchData', async (filter: DbFilterType) => {
  const response = await fetchTargetUsers(filter);
  return response;
});

export default SearchDataSlice.reducer;
export const selectSearchData = (state: RootState) => state.SearchData;
