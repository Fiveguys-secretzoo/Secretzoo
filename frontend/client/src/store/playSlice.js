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
      "bluffCard": '',
      "card": '',
      "turnedPlayer": [],
    }
  }, //TODO : change initialState
  reducers: {
    initRoomInfo: (state, action) => {
      console.log(action);
      // state = JSON.parse(JSON.stringify(action.payload));
      state.roomId = action.payload.rid;
      state.roomName = action.payload.fnm;
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

    initCardInfo: (state, action) => {
      state.card = [...action.payload];
    },

    addPlayer: (state, action) => {
      let isAlreadyIn = false;
      for (let player of state.players) {
        console.log(player);

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
      state.game.status = action.payload;
    },

    changeAdmin: (state, action) => {
      console.log(`change admin to store [${action.payload}]`);
      state.adminPlayer = action.payload.adminPlayer;
    },

    changeNowTurn: (state, action) => {
      console.log(`Now Turn has been changed to ${action.payload}`);
      state.nowTurn = action.payload;
    },

    removeCardFromHand: (state, action) => {
      console.log(`removed card ${action.payload.card} from ${action.payload.pid}`);
      state.players[state.players.indexOf(action.payload.pid)].hand
        = state.players[state.players.indexOf(action.payload.pid)].hand
          .filter((e) => e !== action.payload.card)
    },

    changeCardStatus: (state, action) => {
      console.log(`change card drag to store [${action.payload.from}] [${action.payload.card}]`);
      state.game.from = action.payload.from;
      state.game.card = action.payload.card;
    },

    changeCardDrag: (state, action) => {
      console.log(`[cardDrag] changed / from : [${action.payload.from}] to : [${action.payload.to}]`)
      state.game.from = action.payload.from;
      state.game.to = action.payload.to;
    },

    changeCardDrop: (state, action) => {
      console.log(`[cardDrop] changed / from : [${action.payload.from}] to : [${action.payload.to}]`)
      state.game.from = action.payload.from;
      state.game.to = action.payload.to;


    },

    changeCardBluff: (state, action) => {
      console.log(`[cardBluff] bluffed to [${action.payload}]`)
      state.game.cardBluff = action.payload;
    },

    changeInitgameCard: (state, action) => {
      state.game.from = '';
      state.game.to = '';
      state.game.cardBluff = -1;
      state.game.card = -1;
    },

    initTurnedPlayer: (state, action) => {
      state.game.turnedPlayer = [];
    },

    addTurnedPlayer: (state, action) => {
      state.game.turnedPlayer = [...state.game.turnedPlayer, action.payload]
    },

    addPenalty: (state, action) => {
      let playerIdx;
      for (let k = 0; k < state.players.length; k++) {
        if (state.players[k].playerId === action.payload.pid) {
          playerIdx = k;
          break;
        }
      }
      state.players[playerIdx].penalty[action.payload.penalty]++;
    },

    dropCard: (state, action) => {
      let filtered = state.players[action.payload.pid].card.filter((e) => e !== action.payload.card);
      state.players[action.payload.pid].card = filtered;
    },





  },
},);

export const {
  initRoomInfo,
  initCardInfo,
  addPlayer,
  removePlayer,
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
  addTurnedPlayer,
  dropCard,

} = playSlice.actions;
export default playSlice.reducer;