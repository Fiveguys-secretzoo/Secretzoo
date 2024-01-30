import { Card } from 'flowbite-react'
import PlayerContainer from './playerContainer';


const PlayerView = ({ pid, key, pn = "SomethingSomething" }) => {

  const playerContainer = PlayerContainer();
  const { dragOver, dragEnterHandler, dropHandler } = playerContainer;

  return (
    <>
      <Card className="max-w-sm"
        onDragEnter={(e) => dragEnterHandler(e, pid)}
        onDragOver={(e) => dragOver(e, pid)}
        onDrop={(e) => dropHandler(e, pid)}
      >
        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {pn}
        </p>
      </Card>
    </>
  );
}

export default PlayerView;