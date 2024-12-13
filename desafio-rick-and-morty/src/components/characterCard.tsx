import React, { useState } from 'react';
import { Character } from "../types/character";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
  toggleFavorite: (characterId: number) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick, toggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onClick(character);
  };

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleFavorite(character.id);
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden w-full md:w-1/3 p-4 ${
        isHovered ? 'border-2 border-blue-500' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <img src={character.image} alt={character.name} className="w-full h-48 object-cover" />
      <div className="mt-4 flex justify-between items-center">
        <h3 className="text-gray-900 font-bold text-xl mb-2">{character.name}</h3>
        <button
          className="text-2xl p-2"
          onClick={handleFavoriteClick}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`${
              character.isFavorite
                ? 'text-red-500 hover:text-red-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          />
        </button>
      </div>
      <p className="text-gray-700 text-base">Species: {character.species}</p>
    </div>
  );
};

export default CharacterCard;
