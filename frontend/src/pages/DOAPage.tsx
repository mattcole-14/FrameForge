import { Link } from "react-router-dom";
import "./DOAPage.css";
import { useEffect, useState } from "react";

import doaBg from "../assets/doabg-page.png";
import doaLogo from "../assets/doa-logo.png";

import ayaneImg from "../assets/image/doa/ayane.png";
import kasumiImg from "../assets/image/doa/kasumi.png";
import hayateImg from "../assets/image/doa/hayate.png";
import hayabusaImg from "../assets/image/doa/hayabusa.png";
import hitomiImg from "../assets/image/doa/hitomi.png";
import leifangImg from "../assets/image/doa/leifang.png";
import tinaImg from "../assets/image/doa/tina.png";
import bassImg from "../assets/image/doa/bass.png";
import jannImg from "../assets/image/doa/jann.png";
import zackImg from "../assets/image/doa/zack.png";
import helenaImg from "../assets/image/doa/helena.png";
import kokoroImg from "../assets/image/doa/kokoro.png";
import lisaImg from "../assets/image/doa/lisa.png";
import christieImg from "../assets/image/doa/christie.png";
import bradImg from "../assets/image/doa/brad.png";
import eliotImg from "../assets/image/doa/eliot.png";
import baymanImg from "../assets/image/doa/bayman.png";
import milaImg from "../assets/image/doa/mila.png";
import rigImg from "../assets/image/doa/rig.png";
import momijiImg from "../assets/image/doa/momiji.png";
import marieImg from "../assets/image/doa/marie.png";
import honokaImg from "../assets/image/doa/honoka.png";
import nyotenguImg from "../assets/image/doa/nyotengu.png";
import phaseImg from "../assets/image/doa/phase.png";
import raidouImg from "../assets/image/doa/raidou.png";
import rachelImg from "../assets/image/doa/rachel.png";
import naotoraImg from "../assets/image/doa/naotora.png";
import maiImg from "../assets/image/doa/mai.png";
import kulaImg from "../assets/image/doa/kula.png";
import nicoImg from "../assets/image/doa/nico.png";
import diegoImg from "../assets/image/doa/diego.png";
import tamakiImg from "../assets/image/doa/tamaki.png";

const characterImages: Record<number, string> = {
  1: kasumiImg,
  2: ayaneImg,
  3: hayateImg,
  4: hayabusaImg,
  5: hitomiImg,
  6: leifangImg,
  7: tinaImg,
  8: bassImg,
  9: jannImg,
  10: zackImg,
  11: helenaImg,
  12: kokoroImg,
  13: lisaImg,
  14: christieImg,
  15: bradImg,
  16: eliotImg,
  17: baymanImg,
  18: milaImg,
  19: rigImg,
  20: momijiImg,
  21: marieImg,
  22: honokaImg,
  23: nyotenguImg,
  24: phaseImg,
  25: raidouImg,
  26: rachelImg,
  27: naotoraImg,
  28: maiImg,
  29: kulaImg,
  30: nicoImg,
  31: diegoImg,
  32: tamakiImg,
};

type DOACharacter = {
  id: number;
  name: string;
  fighting_style?: string;
  difficulty?: string;
};

function DOAPage() {
  const [characters, setCharacters] = useState<DOACharacter[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8002/games/doa/characters")
      .then((res) => res.json())
      .then((data) => setCharacters(data))
      .catch(() => setError("Could not load DOA characters. Is the backend running?"));
  }, []);

  return (
    <main className="doa-page" style={{ backgroundImage: `url(${doaBg})` }}>
      <section className="doa-hero">
        <img src={doaLogo} alt="Dead or Alive logo" className="doa-logo" />

        <p className="doa-eyebrow">Character Select</p>

        <p className="doa-description">
          Explore DOA characters, move lists, throws, holds, and special actions.
        </p>
      </section>

      {error && <p className="error">{error}</p>}

      <section className="doa-character-grid">
        {characters.map((character) => (
          <Link
            key={character.id}
            to={`/games/doa/characters/${character.id}`}
            className="doa-character-card"
          >
            <div className="doa-character-image-wrap">
              {characterImages[character.id] && (
                <img
                  src={characterImages[character.id]}
                  alt={character.name}
                  className="doa-character-image"
                />
              )}
            </div>

            <div className="doa-character-info">
              <h2>{character.name}</h2>
              <p>{character.fighting_style}</p>
              <span>{character.difficulty}</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default DOAPage;
