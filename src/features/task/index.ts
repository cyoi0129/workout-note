import { createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import TaskDataSlice from './slice';
import { fetchStorageTask, fetchStorageRanking, addStorageTask, updateStorageTask, updateStorageRanking, removeStorageTask, removeStorageRanking, copyStorageTasks } from './db';
import { TaskItemType, CopyDates } from './types';

export const fetchTask = createAsyncThunk('TaskData/fetchTask', async (date: string) => {
  const response = await fetchStorageTask(date);
  return response;
});

export const fetchRanking = createAsyncThunk('TaskData/fetchRanking', async () => {
  const response = await fetchStorageRanking();
  return response;
});

export const addTask = createAsyncThunk('TaskData/addTask', async (task: TaskItemType) => {
  const response = await addStorageTask(task);
  return response;
});

export const copyTasks = createAsyncThunk('TaskData/copyTasks', async (dates: CopyDates) => {
  const response = await copyStorageTasks(dates);
  return response;
});

export const removeTask = createAsyncThunk('TaskData/removeTask', async (id: number) => {
  const response = await removeStorageTask(id);
  return response;
});

export const updateTask = createAsyncThunk('TaskData/updateTask', async (task: TaskItemType) => {
  const response = await updateStorageTask(task);
  return response;
});

export const updateRanking = createAsyncThunk('TaskData/updateRanking', async (id: number) => {
  const response = await updateStorageRanking(id);
  return response;
});

export const removeRanking = createAsyncThunk('TaskData/removeRanking', async (id: number) => {
  const response = await removeStorageRanking(id);
  return response;
});

export default TaskDataSlice.reducer;
export const selectTaskData = (state: RootState) => state.TaskData;
export const { setDate } = TaskDataSlice.actions;
export const selectTaskById = (id: number) => {
  return createSelector(selectTaskData, (state) => {
    const tasks: TaskItemType[] = state.tasks;
    if (!tasks) return;
    return tasks.find((task) => task.id === id);
  });
};
export const selectRankingByMaster = (master: number) => {
  return createSelector(selectTaskData, (state) => {
    const ranking: TaskItemType[] = state.ranking;
    if (!ranking) return;
    return ranking.find((task) => task.master === master);
  });
};