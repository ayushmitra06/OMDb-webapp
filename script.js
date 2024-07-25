document.addEventListener("DOMContentLoaded", function() {
    const movieList = document.getElementById('movie-list');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const errorMessage = document.getElementById('error-message');
    const movieDetails = document.getElementById('movie-details');
  
    const API_KEY = '1b398dbb'; 
    const API_URL = 'http://www.omdbapi.com/';
  
    // Fetch movie
    async function fetchMovieData(title) {
      try {
        const response = await fetch(`${API_URL}?s=${title}&apikey=${API_KEY}`);
        const movies = await response.json();
        return movies;
      } catch (error) {
        console.error('Error fetching movie data:', error);
        return null;
      }
    }
  
    // Fetch details
    async function fetchMovieDetails(imdbID) {
      try {
        const response = await fetch(`${API_URL}?i=${imdbID}&apikey=${API_KEY}`);
        const movie = await response.json();
        console.log(movie);
        return movie;
      } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
      }
    }
  
    // Render movies
    function renderMovies(movies) {
      movieList.innerHTML = '';
      if (movies && movies.Search) {
        errorMessage.textContent = '';
        movies.Search.forEach(movie => {
          const movieElement = document.createElement('div');
          movieElement.classList.add('movie');
          movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie-info">
              <h2>${movie.Title}</h2>
              <p>Year: ${movie.Year}</p>
            </div>
          `;
          movieElement.addEventListener('click', () => showMovieDetails(movie.imdbID));
          movieList.appendChild(movieElement);
        });
      } else {
        errorMessage.textContent = 'No movies found.';
      }
    }
  
    // Modal for movie details
    async function showMovieDetails(imdbID) {
      const movie = await fetchMovieDetails(imdbID);
      if (movie) {
        movieDetails.innerHTML = `
          <h2>${movie.Title}</h2>
          <img src="${movie.Poster}" alt="${movie.Title}" class="img-fluid">
          <p><strong>Release Date:</strong> ${movie.Released}</p>
          <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
          <p><strong>Director:</strong> ${movie.Director}</p>
          <p><strong>Cast:</strong> ${movie.Actors}</p>
          <p><strong>Plot:</strong> ${movie.Plot}</p>
        `;
        $('#movieModal').modal('show');
      }
    }
  
    // Event listener for search button
    searchButton.addEventListener('click', async () => {
      const title = searchInput.value.trim();
      if (title) {
        const movies = await fetchMovieData(title);
        renderMovies(movies);
      } else {
        errorMessage.textContent = 'Please enter a movie title.';
      }
    });
  });
  