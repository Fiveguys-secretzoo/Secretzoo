import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('authorization');
export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_, thunkAPI) => {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('authorization');
    try {
      const response1 = await axios.get('https://spring.secretzoo.site/users/user');
      const data1 = response1.data;
      const response2 = await axios.get('https://spring.secretzoo.site/player/' + data1.userSequence);
      const data2 = response2.data;
      console.log(data2)
      const userData = {
        "name": data1.name,
        "nickname": data1.nickname,
        "userSequence": data1.userSequence,
        "profileNumber": data1.profileNumber,
        "mainReward": data1.mainReward,
        "email": data1.email,
        "level": data2.data.currentLevel,
        "exp": data2.data.currentExp,
        "nextExp": data2.data.nextExp,
        "prevExp": data2.data.prevExp,
      };

      return userData

    } catch (error) {
    }
  }
);

export const axiosUpdateProfileImage = createAsyncThunk(
  'user/axiosUpdateProfileImage',
  async (number, { dispatch, rejectWithValue }) => {
    try {
      await axios.put('https://spring.secretzoo.site/users/profile-number', number,);
      dispatch(getUserInfo());
    } catch (error) {
    }
  }
);

export const axiosUpdateNickname = createAsyncThunk(
  'user/axiosUpdateNickname',
  async (nickname, { dispatch, rejectWithValue }) => {
    try {
      await axios.put('https://spring.secretzoo.site/users/nickname', nickname,);
      dispatch(getUserInfo());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const axiosUpdateMainAchievement = createAsyncThunk(
  'user/axiosUpdateMainAchievement',
  async (mainAchievement, { dispatch, rejectWithValue }) => {
    try {
      await axios.put('https://spring.secretzoo.site/users/main-achievement', mainAchievement,);
      dispatch(getUserInfo())
    } catch (error) {
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
      state.userInfo = action.payload;
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

export const { setNoLoginUserInfo } = userSlice.actions;
export default userSlice.reducer;