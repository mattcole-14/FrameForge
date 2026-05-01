import { useEffect, useState } from "react";
import "./App.css";

type Character = {
  id: number;
  name: string;
  fighting_style: string;
  difficulty: string;
};

type Move = {
  id: number;
  character_id: number;
  input: string | null;
  name: string;
  hit_level: string | null;
  damage: number | string | null;
  startup_frames: number | null;
  active_frames: number | null;
  on_block: number | string | null;
  on_hit: number | string | null;
  on_counter_hit: number | string | null;
  dodge_direction: string | null;
  notes: string;
};

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [moves, setMoves] = useState<Move[]>([]);
  const [moveSearch, setMoveSearch] = useState("");
  const [hitLevelFilter, setHitLevelFilter] = useState("");


  useEffect(() => {
    fetch("http://127.0.0.1:8000/characters")
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  function handleCharacterClick(character: Character) {
    setSelectedCharacter(character);
     setMoveSearch("");
    setHitLevelFilter("");
   

    fetch(`http://127.0.0.1:8000/characters/${character.id}/moves`)
      .then((response) => response.json())
      .then((data) => setMoves(data))
      .catch((error) => console.error("Error fetching moves:", error));
  }
 
  const filteredMoves = moves.filter((move) => {
  const search = moveSearch.trim().toLowerCase();

  const matchesSearch =
    search === "" ||
    move.name.toLowerCase().includes(search) ||
    String(move.hit_level).toLowerCase().includes(search) ||
    String(move.notes).toLowerCase().includes(search);

  const matchesHitLevel =
    hitLevelFilter === "" ||
    String(move.hit_level).toLowerCase().includes(hitLevelFilter.toLowerCase());

  return matchesSearch && matchesHitLevel;
});

  return (
    <main>
      <h1>VF5 FrameLab</h1>
      <p>Virtua Fighter 5 frame data, moves, and character tools.</p>

      <h2>Character Roster</h2>

      {characters.map((character) => (
        <button key={character.id} onClick={() => handleCharacterClick(character)}>
          {character.name}
        </button>
      ))}

      {selectedCharacter && (
        <section>
          <h2>{selectedCharacter.name}</h2>
          <p>Style: {selectedCharacter.fighting_style}</p>
          <p>Difficulty: {selectedCharacter.difficulty}</p>

          <h3>Move List</h3>

          <input
            type="text"
            placeholder="Search moves..."
            value={moveSearch}
            onChange={(e) => setMoveSearch(e.target.value)}
          />
          <select
          value={hitLevelFilter}
          onChange={(e) => setHitLevelFilter(e.target.value)}
        >
          <option value="">All Hit Levels</option>
          <option value="high">High</option>
          <option value="Middile">Middle</option>
          <option value="low">Low</option>
          <option value="throw">Throw</option>
          <option value="Special low">Special low</option>
        </select>

          <table>
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
              {filteredMoves.map((move) => (
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
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}

export default App;  