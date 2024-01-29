import { createSlice } from '@reduxjs/toolkit';

export const playSlice = createSlice({
  name: 'play',
  initialState: {
    'roomId': '',
    'roomName': '',
    'roomPassword': '',
    'roomAddress': '',
    'status': '',
    'createdDate': '',
    'card': [],
    'playerCount': 1,
    'players': [], // 플레이어 정보 배열 
    'adminPlayer': '',
    'nowTurn': '',
    'onBoard': {
      "status": '',  // 0 : 대기 , 1 : 주는 턴, 2 : 받는 턴, 3: 넘기는 턴 
      "from": '',
      "to": '',
      "cardBluff": '',
      "card": '',
      "availablePlayer": [],
    }
  }, //TODO : change initialState
  reducers: {
    initGameState: (state, action) => {

    },
    addPlayer: (state, action) => {
      state.value += action.payload;
    },
    removePlayer: (state, action) => {

    },
    changeGameState: (state, action) => {

    },
    changeAdmin: (state, action) => {

    },
    changeCardStatus: (state, action) => {

    }
    //TODO - 초기 값 추가 / 카드 턴 (from to card) 추가 / players 추가
    //TODO - admin 변경
    //TODO - 지금 턴 상태 추가
    //TODO 







  },
},);

export const { plus } = playSlice.actions;
export default playSlice.reducer;