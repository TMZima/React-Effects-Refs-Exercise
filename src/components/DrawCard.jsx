import { useState, useEffect } from "react";
import axios from "axios";

function DrawCard({ api, deck }) {
  const [img, setImg] = useState("");

  async function cardDraw() {
    const res = await axios.get(`${api}/${deck}/draw/`);

    setImg(res.data.cards[0].image);
  }

  return (
    <div>
      <button onClick={() => cardDraw()}>GIMME A CARD!</button>
      <img src={img} />
    </div>
  );
}

export default DrawCard;
