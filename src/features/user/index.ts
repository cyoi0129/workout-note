import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { UserLoginRequestType } from './types';
import UserDataSlice from './slice';
import { userDbLogin } from './db';

export const userLogin = createAsyncThunk('UserData/userLogin', async (request: UserLoginRequestType) => {
  const response = await userDbLogin(request);
  return response;
});

export default UserDataSlice.reducer;
export const { setUserLogout, setUserLogin, clearUserError } = UserDataSlice.actions;
export const selectUserData = (state: RootState) => state.UserData;