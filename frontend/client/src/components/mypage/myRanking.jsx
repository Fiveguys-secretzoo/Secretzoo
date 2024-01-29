import React from 'react';


let data = {
  "defenseRank" : 1,
  "attackRank"  : 25,
  "passRank" : 498123,
  "playerCount": 151981513,
}


const MyRanking = () => {
  return (
    <>
      <div>
        <div>defenseRank : {data.defenseRank}</div>
        <div>attackRank : {data.attackRank}</div>
        <div>passRank : {data.passRank}</div>
      </div>
    </>
  );
};

export default MyRanking;