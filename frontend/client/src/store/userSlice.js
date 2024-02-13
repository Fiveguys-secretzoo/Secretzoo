import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async config => {
  // if(!localStorage.getItem('access-token')){
  //   Swal.fire({
  //     "text" : '로그인 해요',
  //     "confirmButtonColor" : '#3085d6'
  //   });
  //   // window.location.href = 'https://secretzoo.site';
  //   return;
  // }
  const expiresAt = parseInt(localStorage.getItem('expires_at'), 10);
  if (Date.now() > expiresAt) {
    const refresh_Token = localStorage.getItem('refresh-token');
    const access_token = localStorage.getItem('access-token');
    try {
      const response = await axios.post('https://spring.secretzoo.site/auth/token/refresh', {} ,{
        headers: {
          "Authorization" : localStorage.getItem('token_type') + ' ' + access_token,
          "refresh-token" : refresh_Token,
        }
      });
      localStorage.setItem('Authorization', response.data['access-token']);
      localStorage.setItem('refresh-token', response.data['refresh-token']);
      axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access-token');
      return config;
    } catch (refreshError) {
      Swal.fire({
        "text" : '다시 로그인 해주세요',
        "confirmButtonColor" : '#3085d6'
      });
      // localStorage.clear();
      // window.location.href = 'https://secretzoo.site';
    }
    return;
  }
  axios.post('https://spring.secretzoo.site/users/check-concurrent-login', {} , {
    headers: {
      "Authorization" : localStorage.getItem('token_type') + ' ' + localStorage.getItem('access-token'),
      "refresh-token" : localStorage.getItem('refresh-token'),
    }
  }).then(Response => {
    const access_token = localStorage.getItem('access-token');
    config.headers['Authorization'] = access_token ? localStorage.getItem('token_type') + ' ' + access_token : '';
    return config;
  }).catch(error => {
    Swal.fire({
      "text" : '유효하지 않은 접근입니다.',
      "confirmButtonColor" : '#3085d6'
    });
    localStorage.clear();
    window.location.href = 'https://secretzoo.site';
  })
  axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access-token');
  return config;
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    console.log('토큰 재발급');
    const refresh_Token = localStorage.getItem('refresh-token');
    const access_token = localStorage.getItem('access-token');
    try {
      const response = await axiosInstance.post('https://spring.secretzoo.site/auth/token/refresh', {} ,{
        headers: {
          "Authorization" : localStorage.getItem('token_type') + ' ' + access_token,
          "refresh-token" : refresh_Token,
        }
      });
      localStorage.setItem('access-token', response.data['access-token']);
      localStorage.setItem('refresh-token', response.data['refresh-token']);
      axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access-token');
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
export const axiosGetDoneRewards= createAsyncThunk(
  'user/axiosGetDoneRewards',
  async (userSequence) => {
    try {
      const response = await axiosInstance.get('https://spring.secretzoo.site/rewards/done/'+ userSequence);
      return response.data;
    } catch (error) {
     throw error;
    }
  }
);
export const axiosGetTotalRewards= createAsyncThunk(
  'user/axiosGetTotalRewards',
  async (userSequence) => {
    try {
     const response = await axiosInstance.get('https://spring.secretzoo.site/rewards/total/'+ userSequence);
      return response.data;
    } catch (error) {
     throw error;
    }
  }
);
export const axiosLogout = createAsyncThunk(
  'user/axiosLogout',
  async () => {
    try {
     const response = await axiosInstance.get('https://spring.secretzoo.site/auth/logout/');
      return response.data;
    } catch (error) {
      Swal.fire({
        "text" : '로그아웃 실패',
        "confirmButtonColor" : '#3085d6'
      });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo : null,
    isLoading : false, 
    error : null,
    isAuthenticated : false,
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
      state.isAuthenticated = true;
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
        state.isAuthenticated = true;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(axiosLogout.fulfilled, (state, action) => {
        state.userInfo = null;
        state.error = action.payload;
        state.isAuthenticated = true;
      })
  },
});

export const { setNoLoginUserInfo} = userSlice.actions;
export default userSlice.reducer;