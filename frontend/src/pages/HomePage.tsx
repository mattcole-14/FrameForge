import { Link } from "react-router-dom";
import "./HomePage.css";
import logo from "../assets/3dfc-logo.png";
import homeBg from "../assets/home-bg.png";
import vfLogo from "../assets/vf-logo.png";
import tekkenLogo from "../assets/tekken-logo.png";
import doaLogo from "../assets/doa-logo.png";
import soulcaliburLogo from "../assets/soulcalibur-logo.png";

const games = [
  {
    id: "vf5",
    title: "Virtua Fighter 5",
    logo: vfLogo,
    subtitle: "Precision, spacing, and classic 3D fundamentals.",
    status: "Available",
    path: "/games/vf5",
  },
  {
    id: "tekken",
    title: "Tekken",
    logo: tekkenLogo,
    subtitle: "Movement, punishment, and explosive offense.",
    status: "Coming Soon",
    path: "/games/tekken",
  },
  {
    id: "doa",
    title: "Dead or Alive",
    logo: doaLogo,
    subtitle: "Fast counters, holds, and momentum shifts.",
    status: "Available",
    path: "/games/doa",
  },
  {
    id: "soulcalibur",
    title: "Soulcalibur",
    logo: soulcaliburLogo,
    subtitle: "Weapon-based 3D combat and ring control.",
    status: "Coming Soon",
    path: "/games/soulcalibur",
  },
];

export default function HomePage() {
  return (
    <main
      className="home-page"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <section className="home-hero">
        <img src={logo} alt="3D Fighter Central logo" className="home-logo" />

        <p className="home-eyebrow">3D Fighting Game Hub</p>

        <h1 className="home-title">
          3D Fighter <span>Central</span>
        </h1>

        <p className="home-description">
          A central hub for 3D fighting games — characters, move lists, combos,
          and frame data all in one place.
        </p>
      </section>

      <section className="game-grid">
        {games.map((game) => {
          const isAvailable = game.status === "Available";

          const cardContent = (
            <>
              <div className="game-card-top">
                <span
                  className={`game-status ${
                    isAvailable ? "available" : "soon"
                  }`}
                >
                  {game.status}
                </span>
              </div>

              <div className="game-card-body">
                <div className="game-logo-wrap">
                  <img
                    src={game.logo}
                    alt={`${game.title} logo`}
                    className="game-logo"
                  />
                </div>

                <h2>{game.title}</h2>
                <p>{game.subtitle}</p>
              </div>
            </>
          );

          if (isAvailable) {
            return (
              <Link to={game.path} className="game-card" key={game.id}>
                {cardContent}
              </Link>
            );
          }

          return (
            <article className="game-card disabled" key={game.id}>
              {cardContent}
            </article>
          );
        })}
      </section>
    </main>
  );
}