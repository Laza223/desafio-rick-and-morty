import React, { useEffect, useState } from 'react';
import CharacterCard from "./components/characterCard";
import CharacterDetail from "./components/characterDetail";
import { Character } from "./types/character";
import "./index.css";

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchCriteria, setSearchCriteria] = useState<{
    species: string;
    status: string;
    gender: string;
  }>({
    species: '',
    status: '',
    gender: '',
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setCharacters(data.results);
    };
    fetchCharacters();
  }, []);

  const toggleFavorite = (characterId: number) => {
    const updatedCharacters = characters.map((character) => {
      if (character.id === characterId) {
        return { ...character, isFavorite: !character.isFavorite };
      }
      return character;
    });
    setCharacters(updatedCharacters);
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const sortCharacters = () => {
    const sortedCharacters = [...characters].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
    if (sortDirection === 'asc') {
      setCharacters(sortedCharacters);
      setSortDirection('desc');
    } else {
      setCharacters(sortedCharacters.reverse());
      setSortDirection('asc');
    }
  };

  const filteredCharacters = characters.filter((character) => {
    return (
      character.species.toLowerCase().includes(searchCriteria.species.toLowerCase()) &&
      character.status.toLowerCase().includes(searchCriteria.status.toLowerCase()) &&
      character.gender.toLowerCase().includes(searchCriteria.gender.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Buscar por especie"
            value={searchCriteria.species}
            onChange={(e) =>
              setSearchCriteria({ ...searchCriteria, species: e.target.value })
            }
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Buscar por género"
            value={searchCriteria.gender}
            onChange={(e) =>
              setSearchCriteria({ ...searchCriteria, gender: e.target.value })
            }
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={sortCharacters}
        >
          Ordenar A-Z - Z-A
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            toggleFavorite={toggleFavorite}
            handleCharacterClick={handleCharacterClick}
            isFavorite={character.isFavorite}
          />
        ))}
      </div>
      {selectedCharacter && (
        <CharacterDetail
          character={selectedCharacter}
          onClick={() => {}}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

export default App;
