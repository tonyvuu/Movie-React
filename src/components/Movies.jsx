import React, { useState, useEffect } from 'react'; //imported react, useState, and useEffect to this component
import './Movies.css'; //imported movie.css 

const MovieSuggestions = () => { // an arrow functional component named MovieSuggestion
  const [filteredText, setFilteredText] = useState(''); // filteredText is my declared state variable and setFilteredText is updating the data 
  //with useState to pass into that state variable (filteredText)
  const [filteredArray, setFilteredArray] = useState([]); //filteredArray (variable) is being updated by setFilteredArray by using useState
  const [selectedMovieInfo, setSelectedMovieInfo] = useState(null); //it initiliaze selectedMovieInfo with the value of null 
  //then it uses 'useState' hook to manage the state of variable (selectedMovieInfo)
  const [suggestions, setSuggestions] = useState([ // useState is holding all of the pre-title I inputted, that then pass on to the stored suggestion variable
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

  const movieData = async (searchTerm) => { // asynchronous arrow function that has a parameter called searchTerm
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=ae0b0db1`);// assigned response variable to store the fetch api data
    const data = await response.json(); // a function that reads the response like fetch and interpret it as JSON data, making it usable js object then store into data variable
    setFilteredArray(data.Search || []);// the data is pulling inside of the array called Search and then filteredArray is being updated with the function setFilteredArray 
  }

  const fetchMovieInfo = async (imdbID) => { //asynchronous arrow function that has a parameters called imdbID
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=ae0b0db1`);// assigned response variable to store the fetch api data
    const data = await response.json();// a function that reads the response like fetch and interpret it as JSON data, making it usable js object then store into data variable
    setSelectedMovieInfo(data); //selectedMovieInfo (state variable) is being updated by the function setSelectedMovieInfo
    console.log(data)// console.log allows it to show up on the console 
  }

  const handleChange = (e) => { 
    setFilteredText(e.target.value.toLowerCase()); //a function that updates the filteredText state based on the user input. It also lowercase it.
  };

  const handleFilter = () => {
    movieData(filteredText); //an arrow function that triggers a movie search based on filteredText
  };

  const handleRandomSuggestionClick = () => {// a function that grabs all info of the stored variable suggestions and applied a math random function to suggest when clicked. 
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    movieData(suggestions[randomIndex]); //randomIndex has built in math to run its function for suggestion variable
  };

  const handleSuggestionClick = (suggestion) => {
    movieData(suggestion); // a function that fetches movie data based on the specific suggestion
  };

  const handlePosterClick = (imdbID) => {
    fetchMovieInfo(imdbID);// a function that fetches the detailed movie information when the poster is clicked
  };

  useEffect(() => {
    movieData('one-piece');
  }, []); //initialize the page with jurassic-world. 

  return ( 
    <div>
      <h1>
        {/* {Movie.TV title when click is going to run the onClick event listener that then runs the function handleRandomSuggestionClick*/}
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
          // {when the user submits their input, the onChange event listener will run that handleChange function -- basically lowercasing it and updating the info to filteredText}
          onChange={handleChange} 
          placeholder="Search For a Movie.."
        />
        {/* after clicking on the button, the onClick event listener will run the function handleFilter -- basically updating the variable filteredText */}
        <button className='search-button' onClick={handleFilter}>
          Search
        </button>
      </div>
      <ul className='list-container'>
      {filteredArray.length > 0 ? ( // if filteredArray is greater than 0; run this built in if statement/condition.
  filteredArray.map((movie, index) => ( // it is iterating over an array and applying a function to each item
    <div className='movie-item' key={index}>
      {/* when you use function like map, react needs a way to efficiently update components so thats why the key propety comes into play. It is a special attribute that react uses to identify individual componenets in the list. It is a unique identifier for each item in the list basically */}
      <li>
        <h2 style={{ color: 'yellow', fontFamily: 'Poppins' }}>
          {movie.Title}
        </h2>
        {/* when a movie poster is clicked: it called the handlePosterClick function with the imdbID of the clicked movie */}
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
) : ( //if the filteredArray is empty or less than 0: return this below statement/condition
  <div className="no-movie-found">
    Can't find any movies matching your search. 
    <div className='no-movie-icon'>
      <img src='https://www.iconpacks.net/icons/2/free-sad-face-icon-2691-thumb.png' alt="Sad face" />
    </div>
  </div>
)}
      </ul>
      <div className='suggestions-container'>
        <h3 className='second-header'>Popular Movie Suggestions:</h3>
        <div className='suggestions-list'>
          {suggestions.map((suggestion, index) => ( 
            <div className="suggestion" key={index} onClick={() => handleSuggestionClick(suggestion)}> 
            {/* when you click a suggestion, the onClick event listener will run this function called handleSuggestionClick */}
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