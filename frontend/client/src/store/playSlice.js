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
    initRoomInfo: (state, action) => {
      state = JSON.parse(JSON.stringify(action.payload));
      // state.roomId = action.payload.roomId;
      // state.roomName = action.payload.roomName;
      // state.roomAddress = action.payload.roomAddess;
      // state.status = action.payload.status;
      // state.createdDate = action.payload.createDate;
      // state.playerCount = action.payload.playerCount;
      // state.players = [...action.payload.players];
      // state.adminPlayer = action.payload.adminPlayer;
      // state.nowTurn = action.payload.nowTurn;
      // state.onBoard = JSON.parse(JSON.stringify(action.payload.onBoard));
    },
    initCardInfo: (state, action) => {
      state.card = [...action.payload];
    },

    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter((e) => (
        e.playerId !== action.payload.playerId
      ))
    },
    changeGameState: (state, action) => {
      state.status = action.payload.status;
    },
    changeAdmin: (state, action) => {
      state.adminPlayer = action.payload.adminPlayer
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