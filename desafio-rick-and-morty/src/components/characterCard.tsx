import React, { useState } from 'react';
import { Character } from "../types/character";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

interface CharacterCardProps {
  character: Character;
  toggleFavorite: (characterId: number) => void;
  handleCharacterClick: (character: Character) => void;
  isFavorite: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  toggleFavorite,
  handleCharacterClick,
  isFavorite,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    handleCharacterClick(character);
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
          {isFavorite ? (
            <FontAwesomeIcon icon={faHeart} className="text-red-500" />
          ) : (
            <FontAwesomeIcon icon={faHeartBroken} className="text-gray-500" />
          )}
        </button>
      </div>
      <p className="text-gray-700 text-base">Especie: {character.species}</p>
    </div>
  );
};

export default CharacterCard;
