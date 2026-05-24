import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        3DFighterCentral
      </Link>

      <nav>
        <Link to="/games/vf5">VF5</Link>
        <Link to="/games/tekken">Tekken</Link>
        <Link to="/games/doa">DOA</Link>
        <Link to="/games/soulcalibur">Soul Calibur</Link>
      </nav>
    </header>
  );
}

export default Navbar;