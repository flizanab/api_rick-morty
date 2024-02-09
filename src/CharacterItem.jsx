import React from 'react';

function CharacterItem({ character, showAlive }) {
  const isCharacterVisible = showAlive === (character.status === 'Alive');

  return (
    <li style={{ display: isCharacterVisible ? 'block' : 'none' }}>
      <img src={character.image} alt={character.name} />
      <p>{character.name}</p>
      <p>Status: {character.status}</p>
    </li>
  );
}

export default CharacterItem;
