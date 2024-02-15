import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import { changePlayState } from '../../store/playSlice'
import { SocketContext } from '../../App';
const GameResultView = ({ 
  roomName, 
  playerSequence, 
  gameInfoHandler, 
  loserPsq, 
  bestAttackPlaye,
  bestDefencePlayer,
  bestPassPlayer,
  maxAttackSuccess,
  maxDefenceSuccess,
  maxPass}) => {

  const dispatch = useDispatch();

  const socket = useContext(SocketContext);
  const players = useSelector(state => state.plays.players);
  
  return (
    <>
      
      <div className="overlay">
        <h1>{}</h1><br />
        <Button onClick={() => {
          dispatch(changePlayState(0));
          socket.emit('requestGameInfo', roomName, playerSequence, gameInfoHandler);
        }}></Button>
      </div>
    </>
  )
}

export default GameResultView;