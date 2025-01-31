import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import "./DrawCard.css";

function DrawCard({ api, deck, clearCards, setClearCards }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (clearCards) {
      setCards([]);
      setError(null);
      setClearCards(false);
    }
  }, [clearCards, setClearCards]);

  useEffect(() => {
    if (drawing) {
      intervalRef.current = setInterval(() => {
        cardDraw();
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [drawing]);

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
        setError("Error: No cards remaining!");
        setDrawing(false);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function toggleDrawing() {
    setDrawing((prevDrawing) => !prevDrawing);
  }

  return (
    <div className="draw-card-container">
      <div className="buttons">
        <button
          className="Deck-gimme"
          onClick={toggleDrawing}
          disabled={loading}
        >
          {drawing ? "Stop drawing" : "Start drawing"}
        </button>
        {error && <div className="error">{error}</div>}
      </div>
      <div className="cards">
        {cards.map(({ code, image }) => (
          <Card key={code} name={`card-${code}`} image={image} />
        ))}
      </div>
    </div>
  );
}

export default DrawCard;
