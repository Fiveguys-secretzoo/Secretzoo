import { createSlice } from '@reduxjs/toolkit';

export const playSlice = createSlice({
  name: 'play',
  initialState: {
    'roomId': '',
    'roomName': '',
    'roomPassword': '',
    'roomAddress': '',
    'status': 0,
    'createdDate': '',
    'card': [],
    'playerCount': 1,
    'players': [], // 플레이어 정보 배열 
    'adminPlayer': '',
    'nowTurn': '',
    'onBoard': {
      "status": 0,  // 0 : 대기 , 1 : 주는 턴, 2 : 받는 턴, 3: 넘기는 턴 
      "from": '',
      "to": '',
      "cardBluff": '',
      "card": '',
      "availablePlayer": [],
    }
  }, //TODO : change initialState
  reducers: {
    initRoomInfo: (state, action) => {
      console.log(action);
      // state = JSON.parse(JSON.stringify(action.payload));
      state.roomId = action.payload.roomId;
      state.roomName = action.payload.roomName;
      state.roomAddress = action.payload.roomAddess;
      state.status = action.payload.status;
      state.createdDate = action.payload.createDate;
      state.playerCount = action.payload.playerCount;
      state.players = [...action.payload.players];
      state.adminPlayer = action.payload.adminPlayer;
      state.nowTurn = action.payload.nowTurn;
      Object.keys(action.payload.onBoard).forEach(key => {
        state.onBoard[key] = action.payload.onBoard[key];
      });
      console.log(state.roomName);
    },
    initCardInfo: (state, action) => {
      state.card = [...action.payload];
    },

    addPlayer: (state, action) => {
      let isAlreadyIn = false;
      for (let player in state.players) {
        if (player.playerId === action.payload.playerId) {
          isAlreadyIn = true;
          break;
        }
      }
      if (!isAlreadyIn) {
        state.players = [...state.players, action.payload];
      }
      console.log(`##### player added, ${action.payload}`)
      console.log(state.players);
    },
    removePlayer: (state, action) => {
      console.log(`remove player to store [${action.payload}]`);
      state.players = [...state.players.filter((e) => (
        e.playerId !== action.payload
      ))]
    },
    changePlayState: (state, action) => {
      console.log(`change status to store [${action.payload}]`);
      state.onBoard.status = action.payload;
    },
    changeAdmin: (state, action) => {
      console.log(`change admin to store [${action.payload}]`);
      state.adminPlayer = action.payload.adminPlayer;
    },
    changeCardStatus: (state, action) => {
      console.log(`change card drag to store [${action.payload.from}] [${action.payload.card}]`);
      state.onBoard.from = action.payload.from;
      state.onBoard.card = action.payload.card;
    },
    changeCardDrag: (state, action) => {
      console.log(action.payload)
      state.onBoard.to = action.payload;
    },
    changeCardDrop: (state, action) => {
      state.onBoard.to = action.payload;
    },
    //TODO - 초기 값 추가 / 카드 턴 (from to card) 추가 / players 추가
    //TODO - admin 변경
    //TODO - 지금 턴 상태 추가
    //TODO






  },
},);

export const {
  initRoomInfo,
  initCardInfo,
  addPlayer,
  removePlayer,
  changePlayState,
  changeAdmin,
  changeCardStatus,
} = playSlice.actions;
export default playSlice.reducer;