import PlayerContainer from './playerContainer';
import './playerView.css';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoPersonOutline } from "react-icons/io5";
import { LuSwords } from "react-icons/lu";import Lottie from 'react-lottie';

import emptySlot from '../../assets/lottie/emptySlot.json'
import orangeCircle from '../../assets/lottie/orangeCircle.json'
import blackCircle from '../../assets/lottie/blackCircle.json'
import greyCircle from '../../assets/lottie/greyCircle.json'
import brownCircle from '../../assets/lottie/brownCircle.json'
import pinkCircle from '../../assets/lottie/pinkCircle.json'
import whiteCircle from '../../assets/lottie/whiteCircle.json'
import greenCircle from '../../assets/lottie/greenCircle.json'
import blueCircle from '../../assets/lottie/blueCircle.json'
import { GiTigerHead, GiSniffingDog, GiDeer, GiPig, GiFox, GiSheep, GiSpermWhale} from "react-icons/gi";
import { FaCat } from "react-icons/fa";

import '../../style/playerView.css'

const PlayerView = ({ roomName, psq, key, pn = "빈 플레이어", activate = false, setCards, animalList, video = "", count }) => {

  const playerContainer = PlayerContainer();
  const { dragOver, dragEnterHandler, dropHandler } = playerContainer;
  const c = count;
  const nowTurnPlayer = useSelector(state => state.plays.nowTurn);
  const turnedPlayer = useSelector(state => state.plays.game.tp);
  const players = useSelector(state => state.plays.players);
  const [penalty, setPenalty] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const prevPen = useRef((players && players[psq])?.pen ?? [0, 0, 0, 0, 0, 0, 0, 0]);
  const animalIconList = [
    <GiTigerHead className='w-5 h-5 ml-1' color='#FF8911'/> ,
    <FaCat className='w-5 h-5 ml-1' color='black'/>,
    <GiSniffingDog  className='w-5 h-5 ml-1' color='#B2A59B'/>,
    <GiDeer className='w-5 h-5 ml-1' color='#9B4444'/>,
    <GiPig className='w-5 h-5 ml-1' color='#FFB0B0'/>,
    <GiFox className='w-5 h-5 ml-1' color='#FC6736'/>,
    <GiSheep className='w-5 h-5 ml-1' color='#A7D397'/>,
    <GiSpermWhale className='w-5 h-5 ml-1' color='#0766AD'/> ,
  ]  ;
  const playState = useSelector(state => state.plays.game.state);

  useEffect(() => {
    const currentPen = (players && players[psq])?.pen ?? [0, 0, 0, 0, 0, 0, 0, 0];
    // console.log(`[currentPen]`);
    // console.log(currentPen);
    if (psq && prevPen.current !== currentPen) {
      setPenalty(currentPen);
      prevPen.current = currentPen;
    }
    // console.log(prevPen.current);
    // console.log(penalty);
  }, [psq, players, players?.[psq]?.pen]);

  const lottieArray =
    [orangeCircle,
      blackCircle,
      greyCircle,
      brownCircle,
      pinkCircle,
      whiteCircle,
      greenCircle,
      blueCircle]

  const defaultOption = {
    loop: false,
    autoplay: false,
    animationData: emptySlot,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const penaltyOption = (i) => ({
    loop: true,
    autoplay: true,
    animationData: lottieArray[i],
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  })

  // TODO 위에 올렸을 때 가능하냐 안하냐에 따라서 효과를 다르게 주는 것...!!

  return (
    <>
      <div className={(c===6)?`bg-white border-2 border-yellow-400 rounded w-96 h-52 m-2 item item${c}`:`bg-white rounded w-96 h-52 m-2 item item${c}`}
        key={key}
        onDragStart={(e) => e.preventDefault()}
        onDragEnter={(e) => dragEnterHandler(e, psq)}
        onDragOver={(e) => dragOver(e, psq)}
        onDrop={(e) => dropHandler(e, psq, setCards)}
      >
        <div className={(playState>=1)&&(psq===nowTurnPlayer)?'border-4 border-red-700':''}>
          <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-blue text-center">
            {(psq===nowTurnPlayer)?<LuSwords className="inline-block"/>:''}
            {pn}
            {(psq===nowTurnPlayer)?<LuSwords className="inline-block"/>:''} 
          </p>
        </div>
        <div className="flex flex-1">
          <div className="w-2/3 h-2/3 pb-5">
            {video}
          </div>
          <div className="w-1/3">
            {penalty.map((key, value) => ( /*value : 동물 index */
              <>
                <div className="animationContainer">
                  {animalIconList[value]}
                  {Array.from({ length: key }, (_, i) => (
                    <div className="animation" key={i}>
                      <Lottie
                        options={penaltyOption(value)}
                        height={18}
                        width={18}
                        isClickToPauseDisabled={true}
                      />
                    </div>
                  ))}
                  {Array.from({ length: 4 - key }, (_, i) => (
                    <div className="animation" key={i}>
                      <Lottie
                        options={defaultOption}
                        height={18}
                        width={18}
                        isClickToPauseDisabled={true}
                      />
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  // 지금 턴 지난 플레이어 <br></br>
  // {turnedPlayer.map((value) => { return `[${value}]` })}
  // 지금 턴 플레이어 <br></br>
  // [{nowTurnPlayer}]
  // {(psq === sessionStorage.getItem('userName')) &&
  //   <App psq={psq} />
  // }
}

export default PlayerView;
