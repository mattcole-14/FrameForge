import { Suspense, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import CharacterModelViewer from "../components/CharacterModelViewer";
import marieRoseModel from "../assets/models/doa/marie-rose.glb";

type Character = {
  id: number;
  name: string;
  style?: string;
  fighting_style?: string;
  difficulty?: string;
  description?: string;
  image_url?: string | null;
  model_url?: string | null;
};

type Move = {
  id: number;
  character_id: number;
  category: string;
  input: string | null;
  name: string;
  hit_level: string;
  damage: number | string | null;
  startup_frames: number | string | null;
  on_block: number | string | null;
  on_hit: number | string | null;
  on_counter_hit: number | string | null;
  notes: string | null;
};

type CharacterDetailPageProps = {
  characterId?: number;
};

const VF5_TABS = [
  "Normal",
  "Tenchi In'you",
  "Sundome",
  "Jump Attacks",
  "Back Attacks",
  "Down Attacks",
  "Throws",
  "Reversals",
  "Rising Attacks",
];

const DOA_TABS = [
  "Unique Strike",
  "Throw",
  "Hold",
  "Back-Facing Strike",
  "Ground Attack",
  "Special Move",
];

export default function CharacterDetailPage({
  characterId,
}: CharacterDetailPageProps) {
  const params = useParams();
  const location = useLocation();

  const inferredGameId = params.gameId ??
    location.pathname.match(/^\/games\/([^\/]+)\//)?.[1];
  const finalGameId = inferredGameId ?? "vf5";
  const finalCharacterId = characterId ?? Number(params.characterId ?? 2);
  const isDOA = finalGameId === "doa";

  const tabCategories = isDOA ? DOA_TABS : VF5_TABS;

  const [character, setCharacter] = useState<Character | null>(null);
  const [moves, setMoves] = useState<Move[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(
    tabCategories[0]
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setActiveCategory(tabCategories[0]);
  }, [finalGameId]);

  useEffect(() => {
    setError("");
    setCharacter(null);
    setMoves([]);

    fetch(`http://127.0.0.1:8000/games/${finalGameId}/characters/${finalCharacterId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Character not found");
        }
        return res.json();
      })
      .then((data) => setCharacter(data))
      .catch((error) => {
        console.error("Error fetching character:", error);
        setError("Could not load character.");
      });

    fetch(`http://127.0.0.1:8000/games/${finalGameId}/characters/${finalCharacterId}/moves`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Moves not found");
        }
        return res.json();
      })
      .then((data) => setMoves(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching moves:", error);
        setMoves([]);
      });
  }, [finalCharacterId]);

  if (error) {
    return (
      <main className="character-detail-page">
        <Link to={`/games/${finalGameId}`}>← Back</Link>
        <p>{error}</p>
      </main>
    );
  }

  if (!character) {
    return (
      <main className="character-detail-page">
        <p>Loading character...</p>
      </main>
    );
  }

  const characterStyle = character.fighting_style ?? character.style ?? "Unknown";
  const characterDifficulty = character.difficulty ?? "Unknown";
  const characterDescription =
    character.description ?? "Character description coming soon.";

  const filteredMoves = moves.filter(
    (move) => move.category === activeCategory
  );

  return (
    <main className="character-detail-page">
      <Link to={`/games/${finalGameId}`} className="back-link">
        ← Back to {finalGameId.toUpperCase()}
      </Link>

      <section className="character-hero">

        <div className="character-model-placeholder">
          {finalGameId === "doa" && finalCharacterId === 21 ? (
            <Suspense fallback={<p>Loading 3D model...</p>}>
              <CharacterModelViewer
                modelPath={marieRoseModel}
                cameraPosition={[1.2, 1.6, 4.2]}
                modelScale={1.05}
              />
            </Suspense>
          ) : (
            <p>3D Model Coming Soon</p>
          )}
        </div>
        
        <div className="character-info">
          <p className="character-eyebrow">Character Profile</p>

          <h1>{character.name}</h1>

          <div className="character-tags">
            <span>Style: {characterStyle}</span>
            <span>Difficulty: {characterDifficulty}</span>
          </div>

          <p>{characterDescription}</p>
        </div>
      </section>

      <section className="character-moves-panel">
        <nav className="character-tabs">
          {tabCategories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        <div className="tab-header">
          <h2>{activeCategory}</h2>
          <p>
            Browse {character.name}'s {activeCategory.toLowerCase()} moves.
          </p>
        </div>

        <table className="moves-table">
          <thead>
            <tr>
              <th>Move</th>
              <th>Input</th>
              <th>Level</th>
              <th>Damage</th>
              <th>Startup</th>
              <th>Block</th>
              <th>Hit</th>
              <th>Counter Hit</th>
            </tr>
          </thead>

          <tbody>
            {filteredMoves.length === 0 ? (
              <tr>
                <td colSpan={8}>No moves found for this category.</td>
              </tr>
            ) : (
              filteredMoves.map((move) => (
                <tr key={move.id}>
                  <td>{move.name}</td>
                  <td>{move.input ?? "-"}</td>
                  <td>{move.hit_level ?? "-"}</td>
                  <td>{move.damage ?? "-"}</td>
                  <td>{move.startup_frames ?? "-"}</td>
                  <td>{move.on_block ?? "-"}</td>
                  <td>{move.on_hit ?? "-"}</td>
                  <td>{move.on_counter_hit ?? "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}