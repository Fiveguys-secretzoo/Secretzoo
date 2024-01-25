import { createSlice } from '@reduxjs/toolkit';

export const playSlice = createSlice({
  name: 'play',
  initialState: { 
    
  }, //TODO : change initialState
  reducers: {
    plus: state => {
      state.value += 1;
    },
    todoAdded: (state, action) => {
      
    }
    //TODO - 초기 값 추가 / 카드 턴 (from to card) 추가 / players 추가
    //TODO - admin 변경
    //TODO - 지금 턴 상태 추가
    //TODO 







  },
},);

export const { plus } = playSlice.actions;
export default playSlice.reducer;