import { Card } from 'flowbite-react'

const PlayerView = ({ pid, key, pn = "SomethingSomething" }) => {

  return (
    <>
      <Card className="max-w-sm"
      // onDragEnter={(e) => handleDragEnter(e)}
      // onDrop={(e) => handleDrop(e)}
      >
        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {pn}
        </p>
      </Card>
    </>
  );
}

export default PlayerView;