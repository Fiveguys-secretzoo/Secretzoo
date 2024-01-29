

const CardView = ({ cardNumber, cardLength, index }) => {

  const imageRoute = (item) => {
    return require(`../../assets/img/card/0${Math.floor(item / 8)}/00${item % 8}.png`);
  }

  return (
    <>
      <div
        key={cardNumber}
        draggable
        className="card"
        style={{ zIndex: cardLength - index }}
      >
        <img className="card-image" src={() => imageRoute(cardNumber)} alt="" />
      </div>
    </>
  );
}

export default CardView;