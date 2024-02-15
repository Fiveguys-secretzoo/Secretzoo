import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

const axiosInstance = axios.create();
/* 토큰재발급, 중복로그인 */
axiosInstance.interceptors.request.use(async config => {
  const expiresAt = parseInt(sessionStorage.getItem('expires_at'), 10);
  if (Date.now() > expiresAt) {
    const refresh_Token = sessionStorage.getItem('refresh-token');
    const access_token = sessionStorage.getItem('access-token');
    try {
      const response = await axios.post('https://spring.secretzoo.site/auth/token/refresh', {} ,{
        headers: {
          "Authorization" : sessionStorage.getItem('token_type') + ' ' + access_token,
          "refresh-token" : refresh_Token,
        }
      });
      const expiresIn = response.data['expires_in'] - 600000; 
      const expiresAt = Date.now() + expiresIn;
      sessionStorage.setItem('Authorization', response.data['access-token']);
      sessionStorage.setItem('refresh-token', response.data['refresh-token']);
      sessionStorage.setItem('expires_at', expiresAt.toString());
      config.headers.Authorization = sessionStorage.getItem('token_type') + ' ' + sessionStorage.getItem('access-token');
      return config;
    } catch (refreshError) {
      Swal.fire({
        "text" : '다시 로그인 해주세요',
        "confirmButtonColor" : '#3085d6'
      });
      sessionStorage.clear();
      setTimeout(() => {
        window.location.href = 'https://secretzoo.site';
      },500);
      return;
    }
  }
  axios.get('https://spring.secretzoo.site/users/check-concurrent-login', {
    headers: {
      "Authorization" : sessionStorage.getItem('token_type') + ' ' + sessionStorage.getItem('access-token'),
      "refresh-token" : sessionStorage.getItem('refresh-token'),
    }
  }).then(Response => {
    config.headers.Authorization = sessionStorage.getItem('token_type') + ' ' + sessionStorage.getItem('access-token');
    return config;
  }).catch(error => {
    console.log(error) 
    Swal.fire({
      "text" : '유효하지 않은 접근입니다.',
      "confirmButtonColor" : '#3085d6'
    });
    sessionStorage.clear();
    setTimeout(() => {
      window.location.href = 'https://secretzoo.site';
    },500);
  })

  
  config.headers.Authorization = sessionStorage.getItem('token_type') + ' ' + sessionStorage.getItem('access-token');
  return config;
});

/* 유저정보 */
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
        "name": data1.name,
        "nickname": data1.nickname,
        "userSequence": data1.userSequence.toString(),
        "profileNumber": data1.profileNumber,
        "mainReward": data1.mainReward,
        "email": data1.email,
        "level": data2.data.currentLevel,
        "exp": data2.data.currentExp,
        "nextExp": data2.data.nextExp,
        "prevExp": data2.data.prevExp,
      };
      sessionStorage.setItem('userName',data1.userId);
      sessionStorage.setItem('userNickname', data1.nickname);
      sessionStorage.setItem('userSequence', data1.userSequence.toString());
      return userData

    } catch (error) {
    }
  }
);
/* 프로필 이미지 변경 */
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
/* 닉네임 */
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

/* 메인 업적 변경 */
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

/* 비밀번호 체크 */
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

/* 비밀번호 변경 */
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

/* 완료업적 조회 */
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

/* 모든 업적 조회 */
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

/* 닉네임 */
export const axiosLogout = createAsyncThunk(
  'user/axiosLogout',
   () => {
    try {
     const response =  axios.post('https://spring.secretzoo.site/auth/logout', {} ,{
      headers: {
        "Authorization" : sessionStorage.getItem('token_type') + ' ' + sessionStorage.getItem('access-token'),
      }
    });
      return response.data;
    } catch (error) {
      Swal.fire({
        "text" : '로그아웃 실패',
        "confirmButtonColor" : '#3085d6'
      });
    }
  }
);

/* 유저 슬라이스 */
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo : null,
    isLoading : false, 
    error : null,
    isAuthenticated : false,
  },
  reducers: {
    /* 비회원  */
    setNoLoginUserInfo(state) {
      state.userInfo = {
        name: 'noLoginUser',
        nickname: sessionStorage.getItem('userNickname'),
        mainReward: '로그인 하세요',
        profileNumber: '000',
        level: '0',
        userSequence: uuidv4(),
      };
      sessionStorage.setItem('userSequence', state.userInfo.userSequence.toString());
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    resetUserInfo: (state) => {
      state.userInfo = null;
    }
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

export const { setNoLoginUserInfo, resetUserInfo } = userSlice.actions;
export default userSlice.reducer;