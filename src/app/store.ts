import { configureStore, ThunkAction, Action, Dispatch } from '@reduxjs/toolkit';
import UserDataReducer from '../features/user';
import MasterDataReducer from '../features/master';
import TaskDataReducer from '../features/task';
import TimeLineDataReducer from '../features/timeline';
import SearchDataReducer from '../features/search';
import ChatDataReducer from '../features/chat';
import MatchDataReducer from '../features/match';
import NoticeDataReducer from '../features/notice';

export const store = configureStore({
  reducer: {
    UserData: UserDataReducer,
    MasterData: MasterDataReducer,
    TaskData: TaskDataReducer,
    TimeLineData: TimeLineDataReducer,
    SearchData: SearchDataReducer,
    ChatData: ChatDataReducer,
    MatchData: MatchDataReducer,
    NoticeData: NoticeDataReducer,
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

export type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: RootState;
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown
}