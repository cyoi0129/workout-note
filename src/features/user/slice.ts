import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from '.';
import { UserStoreType } from './types';
import Cookies from 'js-cookie';

const initialState: UserStoreType = {
  error: false,
  login: false,
  user: '',
};

const UserDataSlice = createSlice({
  name: 'UserData',
  initialState: initialState,
  reducers: {
    setUserLogout: (state) => {
      state.login = false;
      state.error = false;
      state.user = '';
      Cookies.remove('user');
    },
    setUserLogin: (state) => {
      state.login = true;
      state.error = false;
      state.user = String(Cookies.get('user'));
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
        state.user = action.payload.user;
        Cookies.set('user', action.payload.user, { expires: 30 });
      } else {
        state.login = false;
        state.error = true;
        state.user = '';
        Cookies.remove('user');
      }
    });

    builder.addCase(userLogin.rejected, (state) => {
      state.login = false;
      state.error = true;
      state.user = '';
      Cookies.remove('user');
    });
  },
});

export default UserDataSlice;
