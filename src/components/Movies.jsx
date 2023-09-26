import React, { useState, useEffect } from 'react';
import './Movies.css';

const MovieSuggestions = () => {
  const [filteredText, setFilteredText] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);
  const [selectedMovieInfo, setSelectedMovieInfo] = useState(null);
  const [suggestions, setSuggestions] = useState([
    'one-piece',
    'spider-man',
    'jackie chan',
    'harry-potter',
    'jaws',
    'resident evil',
    'the lion king',
    'alien vs predator',
    'the matrix',
    'zombie',
    'madea',
    'the great gatsby',
    'insidious',
    'star wars'
  ]);

  const movieData = async (searchTerm) => {
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=ae0b0db1`);
    const data = await response.json();
    setFilteredArray(data.Search || []);
  }

  const fetchMovieInfo = async (imdbID) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=ae0b0db1`);
    const data = await response.json();
    setSelectedMovieInfo(data);
    console.log(data)
  }

  const handleChange = (e) => {
    setFilteredText(e.target.value.toLowerCase());
  };

  const handleFilter = () => {
    movieData(filteredText);
  };

  const handleRandomSuggestionClick = () => {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    movieData(suggestions[randomIndex]);
  };

  const handleSuggestionClick = (suggestion) => {
    movieData(suggestion);
  };

  const handlePosterClick = (imdbID) => {
    fetchMovieInfo(imdbID);
  };

  useEffect(() => {
    movieData('jurassic-world');
  }, []);

  return (
    <div>
      <h1>
        <a href="#" className='movie-title' onClick={handleRandomSuggestionClick}>
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
          maxLength={30}
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
      {filteredArray.length > 0 ? (
  filteredArray.map((movie, index) => (
    <div className='movie-item' key={index}>
      <li>
        <h2 style={{ color: 'yellow', fontFamily: 'Poppins' }}>
          {movie.Title}
        </h2>
        <img src={movie.Poster} alt={`${movie.Title} Poster`} onClick={() => handlePosterClick(movie.imdbID)} />
        {selectedMovieInfo && selectedMovieInfo.imdbID === movie.imdbID && (
          <div className="movie-info">
            <h3>{selectedMovieInfo.Title}</h3>
            <h4>Director: {selectedMovieInfo.Director}</h4>
            <p>Actors: {selectedMovieInfo.Actors}</p>
            <p>Genre: {selectedMovieInfo.Genre}</p>
            <p>Runtime: {selectedMovieInfo.Runtime}</p>
            <p>Year: {selectedMovieInfo.Year}</p>
            <p>Plot: {selectedMovieInfo.Plot}</p>

          </div>
        )}
      </li>
    </div>
  ))
) : (
  <div className="no-movie-found">
    Can't find any movies matching your search. 
    <div className='no-movie-icon'>
      <img src='https://www.iconpacks.net/icons/2/free-sad-face-icon-2691-thumb.png' alt="Sad face" />
    </div>
  </div>
)}
      </ul>
      {/* {selectedMovieInfo && (
        <div className="selected-movie-info">
          <h2>{selectedMovieInfo.Title}</h2>
          <h4>Director: {selectedMovieInfo.Director}</h4>
          <p>Plot: {selectedMovieInfo.Plot}</p>
          <p>Runtime: {selectedMovieInfo.Runtime}</p>
          <p>Actors: {selectedMovieInfo.Actors}</p>
        </div>
      )} */}
      <div className='suggestions-container'>
        <h3 className='second-header'>Popular Movie Suggestions:</h3>
        <div className='suggestions-list'>
          {suggestions.map((suggestion, index) => (
            <div className="suggestion" key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      </div>
      <footer>
        <p className="footer"> 2023 Movie.TV. All Rights Reserved to Tony Vu.</p>
      </footer>
    </div>
  );
};

export default MovieSuggestions;
