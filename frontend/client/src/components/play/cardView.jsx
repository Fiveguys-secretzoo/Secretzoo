import { useDispatch } from 'react-redux'
import { changeCardStatus } from '../../store/playSlice'

const CardView = ({ key, src, index, card, cardlength, isMyTurn, playState, psq }) => {
  const dispatch = useDispatch();

  const dragStart = (event, item) => {
    if (playState !== 1 || !isMyTurn) {
      event.preventDefault();
    }
    dispatch(changeCardStatus({ 'from': psq, 'card': item }));
  }

  return (
    <>
      <div
        onDragStart={(e) => dragStart(e, card)}
        key={index}
        draggable
        className="w-[8em] h-[13em] ml-[-4em] hover:scale(1.3) hover:-translate-y-20 hover:rotate-[20deg] hover:z-50 transition-transform duration-300"
        style={{ zIndex: cardlength - index, userSelect: false, }}
      >
        <img key={index} className="rounded-md" src={src} alt="" />
      </div>
    </>
    /* 
    <div
      onDragStart={(e) => dragStart(e, i)}
      key={index}
      draggable
      className="w-[8em] h-[13em] ml-[-4em] hover:scale(1.3) hover:-translate-y-20 hover:rotate-[20deg] hover:z-50 transition-transform duration-300"
      style={{ zIndex: cards.length - index, userSelect: false, }}
    >
      <img key={index} className="rounded-md" src={images[i]} alt="" />
    </div> 
    */
  )
}

export default CardView;