import { useState, useEffect } from "react";
import axios from "axios";

function DrawCard({ api, deck, clearCards, setClearCards }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (clearCards) {
      setCards([]);
      setClearCards(false);
    }
  }, [clearCards, setClearCards]);

  async function cardDraw() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${api}/${deck}/draw/`);
      const newCard = {
        code: res.data.cards[0].code,
        image: res.data.cards[0].image,
      };
      setCards((cards) => [...cards, newCard]);
      if (res.data.remaining === 0) {
        setError("Error: no cards remaining!");
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={cardDraw} disabled={loading}>
        {loading ? "Drawing..." : "GIMME A CARD!"}
      </button>
      {error && <div className="error">{error}</div>}
      <div className="cards">
        {cards.map(({ code, image }) => (
          <img key={code} src={image} alt={`card-${code}`} />
        ))}
      </div>
    </div>
  );
}

export default DrawCard;
