import "../scss/App.scss";
import { useEffect, useState } from "react";
import { fetchCharacters } from "../services/fetch";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Filters from "./Filters";
import CharacterSection from "./CharacterSection";
import CharacterDetail from "./CharacterDetail";
import Footer from "./Footer";

function App() {
  // Variables de estado

  const [characters, setCharacters] = useState([]);
  const [filterHouse, setFilterHouse] = useState("all");
  const [filterCharacter, setFilterCharacter] = useState("");
  const [characterNotFound, setCharacterNotFound] = useState(false);
  // Use effect

  useEffect(() => {
    fetchCharacters().then((data) => {
      setCharacters(data);
    });
  }, []);

  // Funciones Handler

  const handleFilterHouse = (house) => {
    setFilterHouse(house);
  };

  const handleFilterCharacter = (filterValue) => {
    setFilterCharacter(filterValue);
    setCharacterNotFound(filteredCharacter.length === 0);
  };

  const findCharacter = (id) => {
    return characters.find((character) => character.id === id);
  };

  // Variables HTML

  const filteredHouse =
    filterHouse === "all"
      ? characters
      : characters.filter(
          (character) =>
            character.house.toLowerCase() === filterHouse.toLowerCase()
        );

  let filteredCharacter = characters.filter((character) =>
    character.name.toLowerCase().includes(filterCharacter.toLowerCase())
  );

  const filteredSection =
    filterHouse === "all" ? filteredCharacter : filteredHouse;

  return (
    <div>
      <Header />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Filters
                  filterHouse={filterHouse}
                  handleFilterHouse={handleFilterHouse}
                  filterCharacter={filterCharacter}
                  handleFilterCharacter={handleFilterCharacter}
                  cnf={characterNotFound}
                  notFound={setCharacterNotFound}
                />
                <CharacterSection
                  characters={filteredSection}
                  cnf={characterNotFound}
                />
              </>
            }
          />
          <Route
            path="/character/:id"
            element={<CharacterDetail findCharacter={findCharacter} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
