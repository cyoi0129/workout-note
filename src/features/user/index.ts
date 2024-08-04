import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { RootState, AsyncThunkConfig } from '../../app/store';
import { UserLoginRequestType, StoreUserDataType, UserDataType } from './types';
import UserDataSlice from './slice';
import { convert2ApiUserData } from './func';
import { userDbLogin, fetchUserDbInfo, updateUserDbInfo, userDbRegister } from './db';

export const userLogin: AsyncThunk<StoreUserDataType, UserLoginRequestType, AsyncThunkConfig> = createAsyncThunk('UserData/userLogin', async (request: UserLoginRequestType) => {
  const response = await userDbLogin(request);
  return response;
});

export const userRegister: AsyncThunk<StoreUserDataType, UserLoginRequestType, AsyncThunkConfig> = createAsyncThunk('UserData/userRegister', async (request: UserLoginRequestType) => {
  const response = await userDbRegister(request);
  return response;
});

export const fetchUserInfo: AsyncThunk<StoreUserDataType, void, AsyncThunkConfig> = createAsyncThunk('UserData/fetchUserInfo', async () => {
  const response = await fetchUserDbInfo();
  return response;
});

export const updateUserInfo: AsyncThunk<StoreUserDataType, UserDataType, AsyncThunkConfig> = createAsyncThunk('UserData/updateUserInfo', async (data: UserDataType) => {
  const db_data = convert2ApiUserData(data);
  const response = await updateUserDbInfo(db_data);
  return response;
});

export default UserDataSlice.reducer;
export const { setUserLogout, clearUserError } = UserDataSlice.actions;
export const selectUserData = (state: RootState) => state.UserData;
