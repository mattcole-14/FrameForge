import { Link } from "react-router-dom";
import "./DOAPage.css";

import doaBg from "../assets/doabg-page.png";
import doaLogo from "../assets/doa-logo.png";
import marieRoseImg from "../assets/characters/doa/marie.png";

const doaCharacters = [
  {
    id: 21,
    name: "Marie Rose",
    fightingStyle: "Systema",
    difficulty: "Beginner",
    image: marieRoseImg,
  },
];

function DOAPage() {
  return (
    <main
      className="doa-page"
      style={{ backgroundImage: `url(${doaBg})` }}
    >
      <section className="doa-hero">
        <img src={doaLogo} alt="Dead or Alive logo" className="doa-logo" />

        <p className="doa-eyebrow">Character Select</p>

        <p className="doa-description">
          Explore DOA characters, move lists, throws, holds, and special actions.
        </p>
      </section>

      <section className="doa-character-grid">
        {doaCharacters.map((character) => (
          <Link
            key={character.id}
            to={`/games/doa/characters/${character.id}`}
            className="doa-character-card"
          >
            <div className="doa-character-image-wrap">
              <img
                src={character.image}
                alt={character.name}
                className="doa-character-image"
              />
            </div>

            <div className="doa-character-info">
              <h2>{character.name}</h2>
              <p>{character.fightingStyle}</p>
              <span>{character.difficulty}</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default DOAPage;
