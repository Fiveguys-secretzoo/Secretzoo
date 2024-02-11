import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
  const authorization = sessionStorage.getItem('authorization');
  config.headers.Authorization = authorization ? authorization : '';
  return config;
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    console.log('토큰 재발급');
    const refresh_Token = sessionStorage.getItem('refresh_token');
    const access_token = sessionStorage.getItem('authorization');
    try {
      const response = await axiosInstance.post('https://spring.secretzoo.site/auth/token/refresh', {} ,{
        headers: {
          "access_token" : access_token,
          "refresh_token" : refresh_Token,
        }
      });
      sessionStorage.setItem('authorization', 'Bearer ' + response.data.access_token);
      sessionStorage.setItem('refresh_token', response.data.refresh_token);
      axiosInstance.defaults.headers.common['Authorization'] = sessionStorage.getItem('authorization');
      return axiosInstance(originalRequest);
    } catch (refreshError) {
    }
  }
  return Promise.reject(error);
});

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_, thunkAPI) => {
    try {
      const response1 = await axiosInstance.get('https://spring.secretzoo.site/users/user');
      const data1 = response1.data;
      const response2 = await axiosInstance.get('https://spring.secretzoo.site/players/'+ data1.userSequence);
      const data2 = response2.data;
      console.log(data2)
      const userData = {
        "name" : data1.name,
        "nickname": data1.nickname,
        "userSequence": data1.userSequence,
        "profileNumber": data1.profileNumber,
        "mainReward" : data1.mainReward,
        "email" : data1.email,
        "level" : data2.data.currentLevel,
        "exp" : data2.data.currentExp,
        "nextExp" : data2.data.nextExp,
        "prevExp" : data2.data.prevExp,
      };
      sessionStorage.setItem('userName',data1.userId);
      
      return userData

    } catch (error) {
    }
  }
);

export const axiosUpdateProfileImage = createAsyncThunk(
  'user/axiosUpdateProfileImage',
  async (number, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.put('https://spring.secretzoo.site/users/profile-number', number,);
      dispatch(getUserInfo());
    } catch (error) {
    }
  }
);

export const axiosUpdateNickname = createAsyncThunk(
  'user/axiosUpdateNickname',
  async (nickname, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.put('https://spring.secretzoo.site/users/nickname', nickname,);
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
      await axiosInstance.put('https://spring.secretzoo.site/users/main-achievement', mainAchievement,);
      dispatch(getUserInfo()) 
    } catch (error) {
    }
  }
);
export const axiosCheckPassword = createAsyncThunk(
  'user/axiosCheckPassword',
  async (password) => {
    try {
      await axiosInstance.post('https://spring.secretzoo.site/users/password', password);
    } catch (error) {
      throw error;
    }
  }
);

export const axiosUpdatePassword = createAsyncThunk(
  'user/axiosUpdatePassword',
  async (password) => {
    try {
      axiosInstance.put('https://spring.secretzoo.site/users/password', password)
    } catch (error) {
     throw error;
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
    setNoLoginUserInfo(state) {
      state.userInfo = {
        name: 'noLoginUser',
        nickname: sessionStorage.getItem('userNickname'),
        mainReward: '로그인 하세요',
        profileNumber: '000',
        level: '0',
        userSequence: uuidv4(),
      };
      state.isLoading = false;
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