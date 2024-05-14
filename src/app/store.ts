import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import UserDataReducer from '../features/user';
import MasterDataReducer from '../features/master';
import TaskDataReducer from '../features/task';

export const store = configureStore({
  reducer: {
    UserData: UserDataReducer,
    MasterData: MasterDataReducer,
    TaskData: TaskDataReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;