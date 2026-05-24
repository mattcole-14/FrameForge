import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import VF5Page from "./pages/VF5Page";
import CharacterPage from "./pages/CharacterPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import DOAPage from "./pages/DOAPage";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games/vf5" element={<VF5Page />} />
        <Route path="/games/doa" element={<DOAPage />} />

        {/* Keep this only as a test page */}
        <Route
          path="/games/vf5/aoi-test"
          element={<CharacterDetailPage characterId={2} />}
        />

        {/* DOA character detail pages */}
        <Route
          path="/games/doa/characters/:characterId"
          element={<CharacterDetailPage />}
        />

        {/* Shared character pages for all games */}
        <Route
          path="/games/:gameId/characters/:characterId"
          element={<CharacterPage />}
        />

        <Route path="/games/:gameId" element={<ComingSoonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;