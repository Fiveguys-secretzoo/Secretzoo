/* 자료구조 game Info.players.player.score 순으로 nest */


const models = () => {
  // 동물 이름을 미리 저장
  const animals = ['cat','dog','tiger','whale','sheep','fox','deer','pig'];

  // 동물 마다 score 유형
  const score = {
    attackSuccess : 0,
    attackFail : 0,
    defenseSuccess : 0,
    defenseFail : 0,
    trust : 0,
    distrust : 0,
    lie : 0,
    truth : 0,
  }

  // 플레이어의 정보를 담을 객체 
  const Player = (id) => {
    let playerId = '';
    let playerName = '';
    let socketId = id;
    let hand = [];
    let penalty = [];
    let datas = {}
    let scores = {
      'round' : 0,
      'turn' : 0,
      'attackAttempt' : 0,
      'attackSuccess' : 0,
      'defenseAttempt' : 0,
      'defenseSuccess' : 0,
      'passCount' : 0,
    }
    for(let animal of animals){
      scores[animal] = {...score};
    }

    return {
      playerId,
      playerName,
      socketId,
      hand,
      penalty,
      datas,
      scores,
    };
  }

  // 게임 정보 객체
  const roomInfo = {
    'roomId':'',
    'roomName':'',
    'roomPassword':'',
    'roomAddress':'',
    'status':'',
    'createdDate':'',
    'card': Array.from({ length: 64 }, (_, i) => i + 1),
    'playerCount': 0,
    'players':[], // 플레이어 정보 배열 
  }

  return{
    animals, 
    score,
    Player,
    roomInfo,
  }
}

export default models;