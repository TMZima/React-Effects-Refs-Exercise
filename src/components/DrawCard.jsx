import { useState, useEffect } from "react";
import axios from "axios";

function DrawCard({ api, deck }) {
  const [cards, setCards] = useState([]);

  async function cardDraw() {
    const res = await axios.get(`${api}/${deck}/draw/`);

    const newCard = {
      code: res.data.cards[0].code,
      image: res.data.cards[0].image,
    };

    setCards((cards) => [...cards, newCard]);

    if (res.data.remaining === 0) {
      alert("Error: no cards remaining!");
    }
  }

  return (
    <>
      <button onClick={() => cardDraw()}>GIMME A CARD!</button>
      <div>
        {cards.map(({ code, image }) => (
          <img key={code} src={image} alt={`card-${code}`} />
        ))}
      </div>
    </>
  );
}

export default DrawCard;
