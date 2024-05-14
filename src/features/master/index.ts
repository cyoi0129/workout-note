import { createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import MasterDataSlice from './slice';
import { fetchDbData, fetchIndexedDbMasterData } from './db';
import { MasterItemType, WorkoutType, MuscleType } from './types';

export const fetchData = createAsyncThunk('MasterData/fetchData', async () => {
  const response = await fetchDbData();
  return response;
});

export const fetchStorage = createAsyncThunk('MasterData/fetchStorage', async () => {
  const response = await fetchIndexedDbMasterData();
  return response;
});

export default MasterDataSlice.reducer;
export const selectMasterData = (state: RootState) => state.MasterData;
export const selectWorkoutTypeById = (id: number) => {
  return createSelector(selectMasterData, (state) => {
    const types: WorkoutType[] = state.types;
    return types.find((type) => type.id === id);
  });
};
export const selectMusclesByIds = (ids: number[]) => {
  return createSelector(selectMasterData, (state) => {
    const muscles: MuscleType[] = state.muscles;
    return muscles.filter(muscle => ids.includes(muscle.id));
  });
};
export const selectMasterById = (id: number) => {
  return createSelector(selectMasterData, (state) => {
    const masters: MasterItemType[] = state.masters;
    if (!masters) return;
    return masters.find((master) => master.id === id);
  });
};
