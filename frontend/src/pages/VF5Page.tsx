import "./VF5Page.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gameBg from "../assets/game-bg.png";
import vf5Logo from "../assets/vf5-logo.png";
import aoiImg from "../assets/characters/vf/aoi.png";


type Character = {
  id: number;
  name: string;
  style: string;
  difficulty: string;
};

const characterImages: Record<number, string> = {
  2: aoiImg,
};

function VF5Page() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/characters")
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