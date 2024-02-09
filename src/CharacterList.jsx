import React, { useState, useEffect } from 'react';
import CharacterItem from './CharacterItem';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlive, setShowAlive] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}&name=${searchTerm}`);
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, showAlive]);

  const handlePagination = (direction) => {
    setCurrentPage((prevPage) => (direction === 'next' ? prevPage + 1 : prevPage - 1));
  };

  const handleShowAlive = () => {
    setShowAlive(true);
  };

  const handleShowDead = () => {
    setShowAlive(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className='buttons-container'>
        <button onClick={handleShowAlive}>Mostrar Vivos</button>
        <button onClick={handleShowDead}>Mostrar Muertos</button>
      </div>

      <div className='search-container'>
        <input type="text" placeholder="Buscar personajes" value={searchTerm} onChange={handleSearch} />
      </div>

      <ul>
        {characters.map(character => (
          <CharacterItem key={character.id} character={character} showAlive={showAlive} />
        ))}
      </ul>

      <div className='buttons-container'>
        <button onClick={() => handlePagination('prev')} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={() => handlePagination('next')}>Siguiente</button>
      </div>
    </div>
  );
};

export default CharacterList;
