import "./VF5Page.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gameBg from "../assets/game-bg.png";
import vf5Logo from "../assets/vf5-logo.png";
import akiraImg from "../assets/image/vf/akira.png";
import aoiImg from "../assets/image/vf/aoi.png";
import blazeImg from "../assets/image/vf/blaze.png";
import bradImg from "../assets/image/vf/brad.png";
import duralImg from "../assets/image/vf/dural.png";
import eileenImg from "../assets/image/vf/eileen.png";
import gohImg from "../assets/image/vf/goh.png";
import jackyImg from "../assets/image/vf/jacky.png";
import jeanImg from "../assets/image/vf/jean.png";
import jeffryImg from "../assets/image/vf/jeffry.png";
import kageImg from "../assets/image/vf/kage.png";
import leiImg from "../assets/image/vf/lei.png";
import lionImg from "../assets/image/vf/lion.png";
import paiImg from "../assets/image/vf/pai.png";
import sarahImg from "../assets/image/vf/sarah.png";
import shunImg from "../assets/image/vf/shun.png";
import takaImg from "../assets/image/vf/taka.png";
import vanessaImg from "../assets/image/vf/vanessa.png";
import wolfImg from "../assets/image/vf/wolf.png";
import lauImg from "../assets/image/vf/lau.png";

type Character = {
  id: number;
  name: string;
  style: string;
  difficulty: string;
};

const characterImages: Record<number, string> = {
  1: akiraImg,
  2: aoiImg,
  3: jeanImg,
  4: eileenImg,
  5: jackyImg,
  6: paiImg,
  7: lauImg,
  8: wolfImg,
  9: jeffryImg,
  10: kageImg,
  11: sarahImg,
  12: shunImg,
  13: lionImg,
  14: leiImg,
  15: vanessaImg,
  16: bradImg,
  17: gohImg,
  18: blazeImg,
  19: takaImg,
  20: duralImg,
};

function VF5Page() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8002/games/vf5/characters")
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch(() =>
        setError("Could not load characters. Make sure the backend is running.")
      );
  }, []);

  return (
  <main
    className="vf5-page"
    style={{ backgroundImage: `url(${gameBg})` }}
  >
    <Link to="/" className="back-link">
      ← Back to games
    </Link>

    <section className="vf5-hero">
  <img src={vf5Logo} alt="Virtua Fighter 5 logo" className="game-logo" />

  <p>Browse VF5 characters, move lists, combos, and frame data.</p>
</section>

    <h2 className="roster-title">Character Roster</h2>

    {error && <p>{error}</p>}

    <section className="character-grid">
  {characters.map((character) => (
    <Link
      key={character.id}
      to={`/games/vf5/characters/${character.id}`}
      className="character-card"
    >
      {characterImages[character.id] && (
        <img
          src={characterImages[character.id]}
          alt={`${character.name}`}
          className="character-card-img"
        />
      )}

      <div className="character-card-info">
        <h3>{character.name}</h3>
        <p>Style: {character.style}</p>
        <p>Difficulty: {character.difficulty}</p>
      </div>
    </Link>
  ))}
</section>
  </main>
  );
}

export default VF5Page;