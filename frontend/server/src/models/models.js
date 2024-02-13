/* 자료구조 game Info.players.player.score 순으로 nest */


const models = () => {
  // 동물 이름을 미리 저장
  const animals = ['tiger', 'cat', 'dog', 'deer', 'pig', 'fox', 'sheep', 'whale'];
  const animalIds = ['TIGER01', 'CAT02', 'DOG03', 'DEER04', 'PIG05', 'FOX06', 'SHEEP07', 'WHALE08'];
  // 동물 마다 score 유형
  const score = {
    atks: 0, // attack Success
    atkf: 0, // attack Fail
    atkl: 0, // attack lie
    atkt: 0, // attack truth
    defs: 0, // defence Success
    deff: 0, // defence fail
    deft: 0, // defence Trust
    defd: 0, // defence Distrust

  }

  // 플레이어의 정보를 담을 객체 
  const Player = (playerSequenceNumber, socketId, playerNickName) => {
    let psq = playerSequenceNumber; // player Sequence Number
    let pn = playerNickName; // player Nick Name
    let sid = socketId; // socket Id 
    let hand = []; // hand 
    let pen = [0, 0, 0, 0, 0, 0, 0, 0]; //penalty
    let sc = {
      'r': 0, // round Count
      't': 0, // turn Count 
      'p': 0, // pass Count
      'atka': 0, // attack Attempt
      'atks': 0, // attack Success
      'defa': 0, // defence Attempt
      'defs': 0, // defence Success
    }

    let count = 0;
    for (let animal of animals) {
      sc[animal][animalScore] = { ...score };
      sc[animal] = {...sc[animal], 'animalId' : animalIds[count ++]}
    }

    return {
      psq,
      pn,
      sid,
      hand,
      pen,
      sc,
    };
  }

  // 게임 정보 객체
  const roomInfo = {
    'rid': '', // room Id 
    'rnm': '', // room Name
    'rpw': '', // room Password
    'radr': '', // room Address
    'status': 0, // status 0 : waiting, 1 : playing 
    'cdt': '', // createdDate 
    'card': Array.from({ length: 64 }, (_, i) => i), // card
    'pc': 1, // player Count
    'ps': {}, // players 
    'adm': '', // adminPlayer
    'nt': '', // nowTurn 
    'game': { // onBoard
      // 0 : 대기, 1 : 시작, 2 : 주는 턴, 3 : 받는 턴, 4: 넘기는 턴 
      'state': 0, // status -> state
      'fr': '', // from 
      'to': '', // to 
      'bc': '', // cardBluff
      'c': '', // card
      'tp': [], // turnedPlayer
    }
  }

  return {
    animals,
    animalIds,
    score,
    Player,
    roomInfo,
  }
}

export default models;