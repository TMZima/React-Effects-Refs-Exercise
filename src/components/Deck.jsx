import { useState, useEffect } from "react";
import axios from "axios";
import DrawCard from "./DrawCard";

function Deck() {
  const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shuffling, setShuffling] = useState(false);
  const [clearCards, setClearCards] = useState(false);

  useEffect(() => {
    async function getDeck() {
      try {
        const res = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        setDeck(res.data.deck_id);
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    getDeck();
  }, []);

  async function shuffleDeck() {
    setShuffling(true);
    try {
      await axios.get(`${API_BASE_URL}/${deck}/shuffle/`);
      setClearCards(true);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setShuffling(false);
    }
  }

  if (loading) return <div>Loading deck...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="Deck">
      <button onClick={shuffleDeck} disabled={shuffling}>
        {shuffling ? "Shuffling..." : "Shuffle"}
      </button>
      <DrawCard
        api={API_BASE_URL}
        deck={deck}
        clearCards={clearCards}
        setClearCards={setClearCards}
      />
    </div>
  );
}

export default Deck;
