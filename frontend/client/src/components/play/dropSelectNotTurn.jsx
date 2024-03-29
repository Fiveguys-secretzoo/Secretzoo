import { Spinner } from 'flowbite-react';

const DropSelectNotTurn = ({p1}) => {

  return (
    <>
      <div className="overlay">
        <h2 className='text-white mr-2 text-xl'><span className='mr-2 font-bold text-lime-300'>{p1}</span>플레이어가 블러핑할 동물을 선택 중 입니다...!</h2>
        <Spinner aria-label="Success spinner" size="xl" />
      </div>
    </>
  )
}

export default DropSelectNotTurn;