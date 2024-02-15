import { useContext, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import { changePlayState } from '../../store/playSlice'
import { SocketContext } from '../../App';
import Swal from 'sweetalert2';


import { GiPartyPopper, GiDrippingSword, GiShieldReflect, GiTronArrow } from "react-icons/gi";

import Confetti from 'react-confetti'

const GameResultView = ({
  roomName,
  playerSequence,
  gameInfoHandler,
  loserPsq,
  bestAttackPlayer,
  bestDefencePlayer,
  bestPassPlayer,
  maxAttackSuccess,
  maxDefenceSuccess,
  maxPass }) => {
  const renderIconToString = (component) => {
    return ReactDOMServer.renderToStaticMarkup(component);
  }
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);
  const players = useSelector(state => state.plays.players);

  useEffect(() => {
    Swal.fire({
      title: `${renderIconToString(<GiPartyPopper class="inline" />)} <strong> 게임 종료 <strong> ${renderIconToString(<GiPartyPopper class="inline" />)}`,
      html: `<span class="mr-2 font-bold text-pink-300 inline">${players[loserPsq]?.pn} </span> 님이 패배하셨습니다! <br></br> <br></br>
      ${renderIconToString(<GiDrippingSword class="inline" />)} <span class="mr-2 text-xl font-bold inline"> 이번 라운드의 공격 왕 </span> ${renderIconToString(<GiDrippingSword class="inline" />)}<br></br>
      <span class="mr-2 ">${players[bestAttackPlayer]?.pn ?? '없음'} (공격 성공 ${maxAttackSuccess} 회)</span><br></br>
      ${renderIconToString(<GiShieldReflect class="inline" />)} <span class="mr-2 text-xl font-bold inline"> 이번 라운드의 수비 왕 </span> ${renderIconToString(<GiShieldReflect class="inline" />)}<br></br>
      <span class="mr-2 ">${players[bestDefencePlayer]?.pn ?? '없음'} (수비 성공 ${maxDefenceSuccess} 회)</span><br></br>
      ${renderIconToString(<GiTronArrow class="inline" />)} <span class="mr-2 text-xl font-bold inline"> 이번 라운드의 패스 왕 </span> ${renderIconToString(<GiTronArrow class="inline" />)}<br></br>
      <span class="mr-2 ">${players[bestPassPlayer]?.pn ?? '없음'} (패스 ${maxPass} 회)</span><br></br>
      `,
      timer: 10000,
      timerProgressBar: true,
    }).then(() => {
      dispatch(changePlayState(0));
      socket.emit('requestGameInfo', roomName, playerSequence, gameInfoHandler);
    })
  })
  return (
    <>
      
    </>
  )
}

export default GameResultView;