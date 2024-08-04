import { createAsyncThunk, AsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState, AsyncThunkConfig } from '../../app/store';
import MasterDataSlice from './slice';
import { fetchDbMasterData, fetchIndexedDbMasterData } from './db';
import { GeneralItemType } from '../../app/types';
import { StoreMasterResponseType, StorageMasterResponseType, MuscleItemType, MenuItemType } from './types';

export const fetchMasterData: AsyncThunk<StoreMasterResponseType, void, AsyncThunkConfig> = createAsyncThunk('MasterData/fetchData', async () => {
  const response = await fetchDbMasterData();
  return response;
});

export const fetchMasterStorage: AsyncThunk<StorageMasterResponseType, void, AsyncThunkConfig> = createAsyncThunk('MasterData/fetchMasterStorage', async () => {
  const response = await fetchIndexedDbMasterData();
  return response;
});

export default MasterDataSlice.reducer;
export const selectMasterData = (state: RootState) => state.MasterData;
export const selectGymeById = (id: number) => {
  return createSelector(selectMasterData, (state) => {
    const gyms: GeneralItemType[] = state.gyms;
    return gyms.find((gym) => gym.id === id);
  });
};
export const selectGymsByIds = (ids: number[]) => {
  return createSelector(selectMasterData, (state) => {
    const gyms: GeneralItemType[] = state.gyms;
    return gyms.filter((gym) => ids.includes(gym.id));
  });
};

export const selectMusclesByIds = (ids: number[]) => {
  return createSelector(selectMasterData, (state) => {
    const muscles: MuscleItemType[] = state.muscles;
    return muscles.filter(muscle => ids.includes(muscle.id));
  });
};
export const selectMenuById = (id: number) => {
  return createSelector(selectMasterData, (state) => {
    const menus: MenuItemType[] = state.menus;
    if (!menus) return;
    return menus.find((menu) => menu.id === id);
  });
};
