

const PlayerView = ({ pid, key, pn = "SomethingSomethingSomethingWewin" }) => {

  return (
    <>
      <div className="playerSlot" 
      // onDragEnter={(e) => handleDragEnter(e)}
      // onDrop={(e) => handleDrop(e)}
      >
        {pn}
      </div>
    </>
  );
}

export default PlayerView;