import { Spinner } from 'flowbite-react';

const DropSelectNotTurn = () => {

  return (
    <>
      <div className="overlay">
        <h2>다른 플레이어가 선택 중 입니다...!</h2>
        <Spinner aria-label="Success spinner" size="xl" />
      </div>
    </>
  )
}

export default DropSelectNotTurn;