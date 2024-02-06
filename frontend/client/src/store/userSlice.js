import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('authorization');
export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_, thunkAPI) => {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('authorization');
    try {
      const response = await axios.get('https://spring.secretzoo.site/api/users/user');
      const data = response.data;
      const userData = {
        "name" : data.name,
        "nickname": data.nickname,
        "userSequence": data.userSequence,
        "profileNumber": data.profileNumber,
        "email" : data.email,
      };
      return userData

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const axiosUpdateProfileImage = createAsyncThunk(
  'user/axiosUpdateProfileImage',
  async (number, { dispatch, rejectWithValue }) => {
    try {
      await axios.put('https://spring.secretzoo.site/api/users/profile-number', number,);
      dispatch(getUserInfo());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const axiosUpdateNickname = createAsyncThunk(
  'user/axiosUpdateNickname',
  async (nickname, { dispatch, rejectWithValue }) => {
    try {
      await axios.put('https://spring.secretzoo.site/api/users/nickname', nickname,);
      dispatch(getUserInfo());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const axiosUpdateMainAchievement = createAsyncThunk(
  'user/axiosUpdateNickname',
  async (mainAchievement, { dispatch, rejectWithValue }) => {
    try {
      await axios.put('https://spring.secretzoo.site/api/users/main-achievement', mainAchievement,);
      dispatch(getUserInfo());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    isLoading: false, 
    error: null
  },
  reducers: {
    setNoLoginUserInfo(state, action) {
      state.entity = action.payload;
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { setNoLoginUserInfo} = userSlice.actions;
export default userSlice.reducer;