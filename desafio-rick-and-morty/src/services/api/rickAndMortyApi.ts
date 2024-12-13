import { Character } from '../../types/character'

export async function getCharacters(): Promise<Character[]> {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  const data = await response.json();

  return data.results.map((ch: Character) => ({
    id: ch.id,
    name: ch.name,
    species: ch.species,
    image: ch.image,
  }));
}
