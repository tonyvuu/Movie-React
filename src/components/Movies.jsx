import React, { useState, useEffect } from 'react';
import '../App.css';

const movieSuggestions = () => {
  const [filteredText, setFilteredText] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);

  const movieData = async (searchTerm) => {
    const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=ae0b0db1`);
    const data = await response.json();
    setFilteredArray(data.Search);
    console.log(data);
  }

  const handleChange = (e) => {
    setFilteredText(e.target.value.toLowerCase());
  };

  const handleFilter = () => {
    movieData(filteredText);
  };
  

  useEffect(() => {
    movieData('spider-man');
  }, []);


  return (
    <div>
      <h1>
        <a href="/" className='movie-title' >
          MOVIE.TV
          <img
            src="https://media2.giphy.com/media/9rg3jLvkmuw5cIY0be/giphy.gif?cid=6c09b95273iy6q8qn9zdou8ipzq9qlua0ns7no4div0onzxk&ep=v1_stickers_related&rid=giphy.gif&ct=s"
            alt="MovieTV Logo"
            className="logo"
          />
        </a>
      </h1>
      <div className='search-bar'>
        <input
          className='search-input'
          type="text"
          value={filteredText}
          onChange={handleChange}
          placeholder="Search For a Movie.."
        />
        <button className='search-button' onClick={handleFilter}>
          Search
        </button>
      </div>
      <ul className='list-container'>
        {filteredArray.map((movie, index) => (
          <div className='movie-item' key={index}>
            <li>
              <h2 style={{ color: 'yellow', fontFamily: 'Poppins' }}>
                {movie.Title}
              </h2>
              <p>{movie.Year}</p>
              <img src={movie.Poster} alt={`${movie.Title} Poster`} />
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
;}  

export default movieSuggestions;
