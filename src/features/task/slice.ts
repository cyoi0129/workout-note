import { createSlice } from '@reduxjs/toolkit';
import { fetchTask, addTask, updateTask, updateRanking, fetchRanking, removeTask, removeRanking, copyTasks } from '.';
import { TaskStoreType } from './types';
import { date2Str } from './func';

const initialState: TaskStoreType = {
  error: false,
  date: date2Str(new Date()),
  tasks: [],
  ranking: [],
};

const TaskDataSlice = createSlice({
  name: 'TaskData',
  initialState: initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTask.fulfilled, (state, action) => {
      state.error = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchRanking.fulfilled, (state, action) => {
      state.error = false;
      state.ranking = action.payload;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.error = false;
      state.tasks = [action.payload, ...state.tasks];
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.error = false;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      state.tasks = [action.payload, ...state.tasks];
    });
    builder.addCase(updateRanking.fulfilled, (state, action) => {
      state.error = false;
      state.ranking = action.payload;
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      state.error = false;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    });
    builder.addCase(removeRanking.fulfilled, (state, action) => {
      state.error = false;
      state.ranking = state.ranking.filter((item) => item.id !== action.payload);
    });
    builder.addCase(copyTasks.fulfilled, (state, action) => {
      state.error = false;
      state.tasks = action.payload;
    });
  },
});

export default TaskDataSlice;
