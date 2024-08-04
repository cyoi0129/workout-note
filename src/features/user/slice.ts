import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userRegister, fetchUserInfo, updateUserInfo } from '.';
import { UserDataType, UserAccountType, UserStoreType } from './types';
import Cookies from 'js-cookie';

const initialAccount: UserAccountType = {
  id: 0,
  email: '',
  password: '',
  token: '',
};

const initialUserData: UserDataType = {
  id: 0,
  name: '',
  gender: '',
  brith: 0,
  stations: [],
  areas: [],
  gyms: [],
  times: [],
  bp: 0,
  sq: 0,
  dl: 0,
};

const initialState: UserStoreType = {
  error: false,
  loading: false,
  login: false,
  account: initialAccount,
  data: initialUserData,
};

const UserDataSlice = createSlice({
  name: 'UserData',
  initialState: initialState,
  reducers: {
    setUserLogout: (state) => {
      state.login = false;
      state.error = false;
      state.account = initialAccount;
      state.data = initialUserData;
      Cookies.remove('user_token');
      Cookies.remove('user_id');
    },
    clearUserError: (state) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.login = true;
        state.error = false;
        state.data = action.payload.data;
        Cookies.set('user_token', action.payload.token, { expires: 1000 });
        Cookies.set('user_id', String(action.payload.data.id), { expires: 1000 });
      } else {
        state.login = false;
        state.error = true;
        state.account = initialAccount;
        state.data = initialUserData;
        Cookies.remove('user_token');
        Cookies.remove('user_id');
      }
    });

    builder.addCase(userRegister.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.login = true;
        state.error = false;
        state.data = action.payload.data;
        Cookies.set('user_token', action.payload.token, { expires: 1000 });
        Cookies.set('user_id', String(action.payload.data.id), { expires: 1000 });
      } else {
        state.login = false;
        state.error = true;
        state.account = initialAccount;
        state.data = initialUserData;
        Cookies.remove('user_token');
        Cookies.remove('user_id');
      }
    });

    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.login = true;
        state.error = false;
        state.data = action.payload.data;
        state.account.id = action.payload.data.id;
      } else {
        state.login = false;
        state.error = true;
        state.account = initialAccount;
        state.data = initialUserData;
        Cookies.remove('user_token');
        Cookies.remove('user_id');
      }
    });

    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      if (action.payload.status === 0) {
        state.login = true;
        state.error = false;
        state.data = action.payload.data;
        state.account.id = action.payload.data.id;
      } else {
        state.login = false;
        state.error = true;
      }
    });

    builder.addCase(userLogin.rejected, (state) => {
      state.login = false;
      state.error = true;
      state.account = initialAccount;
      state.data = initialUserData;
      Cookies.remove('user_token');
      Cookies.remove('user_id');
    });

    builder.addCase(userRegister.rejected, (state) => {
      state.login = false;
      state.error = true;
      state.account = initialAccount;
      state.data = initialUserData;
      Cookies.remove('user_token');
      Cookies.remove('user_id');
    });

    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.login = false;
      state.error = true;
      state.account = initialAccount;
      state.data = initialUserData;
      Cookies.remove('user_token');
      Cookies.remove('user_id');
    });

    builder.addCase(updateUserInfo.rejected, (state) => {
      state.login = false;
      state.error = true;
    });
  },
});

export default UserDataSlice;
