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
    'players': {}, // 플레이어 정보 배열 
    'adminPlayer': '',
    'nowTurn': '',
    'game': {
      "state": 0,  // 0 : 대기 , 1 : 주는 턴, 2 : 받는 턴, 3: 넘기는 턴 
      "from": '',
      "to": '',
      "bc": '',
      "c": '',
      "tp": [],
    }
  }, //TODO : change initialState
  reducers: {

    // 게임 정보 초기화 
    initRoomInfo: (state, action) => {
      console.log(action);
      // state = JSON.parse(JSON.stringify(action.payload));
      state.roomId = action.payload.rid;
      state.roomName = action.payload.rnm;
      state.roomAddress = action.payload.radr;
      state.status = action.payload.status;
      state.createdDate = action.payload.cdt;
      state.playerCount = action.payload.pc;
      state.players = { ...action.payload.ps };
      state.adminPlayer = action.payload.adm;
      state.nowTurn = action.payload.nt;
      Object.keys(action.payload.game).forEach(key => {
        state.game[key] = action.payload.game[key];
      });
      console.log(state.roomName);
    },

    initRoomName: (state, action) => {
      state.roomName = action.payload;
      console.log(`##### [initRoomName] ${action.payload}`)
    },

    // 게임 카드 초기화 
    initCardInfo: (state, action) => { // card 배열 
      state.card = [...action.payload];
    },

    // player 입장
    modifyPlayers: (state, action) => { // ps 배열
      state.players = { ...action.payload };
    },

    // play State 변경
    changePlayState: (state, action) => {
      console.log(`change status to store [${action.payload}]`);
      state.game.state = action.payload;
    },

    // 방장 변경
    changeAdmin: (state, action) => {
      console.log(`change admin to store [${action.payload}]`);
      state.adminPlayer = action.payload.adminPlayer;
    },

    // now Turn 변경 
    changeNowTurn: (state, action) => {
      console.log(`Now Turn has been changed to ${action.payload}`);
      state.nowTurn = action.payload;
    },

    // 손에서 카드 없애기
    removeCardFromHand: (state, action) => {
      console.log(`removed card ${action.payload.card} from ${action.payload.pid}`);
      state.players[state.players.indexOf(action.payload.pid)].hand
        = state.players[state.players.indexOf(action.payload.pid)].hand
          .filter((e) => e !== action.payload.card)
    },

    // 카드 상태 변경
    changeCardStatus: (state, action) => {
      console.log(`change card drag to store [${action.payload.from}] [${action.payload.card}]`);
      state.game.from = action.payload.from;
      state.game.c = action.payload.card;
    },

    // 카드 드래그 시 변경
    changeCardDrag: (state, action) => {
      console.log(`[cardDrag] changed / from : [${action.payload.from}] to : [${action.payload.to}]`)
      state.game.from = action.payload.from;
      state.game.to = action.payload.to;
    },

    // 카드 드롭 시 변경
    changeCardDrop: (state, action) => {
      console.log(`[cardDrop] changed / from : [${action.payload.from}] to : [${action.payload.to}]`)
      state.game.from = action.payload.from;
      state.game.to = action.payload.to;
    },

    // 카드 속이기 시 변경
    changeCardBluff: (state, action) => {
      console.log(`[cardBluff] bluffed to [${action.payload}]`)
      state.game.bc = action.payload;
    },

    // 게임 카드 초기화 
    changeInitgameCard: (state, action) => {
      state.game.from = '';
      state.game.to = '';
      state.game.bc = -1;
      state.game.c = -1;
    },

    // 턴 보냈던 플레이어 초기화 
    initTurnedPlayer: (state) => {
      state.game.tp = [];
    },

    // 턴 보냈던 플레이어 추가
    changeTurnedPlayer: (state, action) => {
      state.game.tp = [...action.payload]
    },

    // 패널티 추가
    changePenalty: (state, action) => { // psq, penalty
      console.log(`#####[changePenalty] payload`)
      console.log(action.payload);
      state.players[action.payload.psq].pen = [...action.payload.pen];
      console.log(state.players[action.payload.psq].pen);
    },

    // 카드 드롭 // TODO 받은거 달아주기 
    dropCard: (state, action) => {
      let filtered = state.players[action.payload.pid].card.filter((e) => e !== action.payload.card);
      state.players[action.payload.pid].hand = filtered;
    },

    changeCardFromHand: (state, action) => {
      console.log(`##### [changeCardFromHand] activated.`)
      console.log(action.payload.playerSequenceNumber);
      console.log(state);
      console.log(state.players);
      console.log(state.players[action.payload.playerSequenceNumber].hand);
      console.log(action.payload.hand);
      state.players[action.payload.playerSequenceNumber].hand = [...action.payload.hand]
    }





  },
},);

export const {
  initRoomInfo,
  initCardInfo,
  initRoomName,
  modifyPlayers,
  changePlayState,
  changeAdmin,
  changeNowTurn,
  removeCardFromHand,
  changeCardStatus,
  changeCardDrag,
  changeCardDrop,
  changeCardBluff,
  changeInitgameCard,
  initTurnedPlayer,
  changeTurnedPlayer,
  dropCard,
  changePenalty,
  changeCardFromHand,
} = playSlice.actions;
export default playSlice.reducer;