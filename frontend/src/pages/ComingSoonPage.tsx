import { Link, useParams } from "react-router-dom";

function ComingSoonPage() {
  const { gameId } = useParams();

  return (
    <main>
      <Link to="/">← Back to games</Link>

      <h1>{gameId?.toUpperCase()}</h1>
      <p>This section is coming soon to 3DFighterCentral.</p>
    </main>
  );
}

export default ComingSoonPage;