import { useState, useRef, useEffect } from "react";
import axios from "axios";
import DrawCard from "./DrawCard";

function Deck() {
  const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

  const [deck, setDeck] = useState(null);

  useEffect(() => {
    async function getDeck() {
      const res = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      setDeck(res.data.deck_id);
    }
    getDeck();
  }, []);

  return (
    <div className="Deck">
      <DrawCard api={API_BASE_URL} deck={deck} />
    </div>
  );
}

export default Deck;
