import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/")
    .then(res => res.json())
    .then(data => setMovies(data));
  }, []);

    const addMovie = () => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        genre: "Action",
        rating: 8,
        is_recommended: true
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    };

    const deleteMovie = (id) => {
    fetch(`http://127.0.0.1:8000/api/movies/${id}/`, {
        method: "DELETE"
    })
    .then(() => {
        setMovies(movies.filter(movie => movie.id !== id));
    });
    };

    const recommendedMovies = movies.filter(
    movie => movie.is_recommended === true
    );

    return (
      <>
      <h2> Recommended Movies</h2>

        {recommendedMovies.length === 0 ? (
            <p>No recommended movies yet.</p>
        ) : (
            recommendedMovies.map(movie => (
                <div key={movie.id}>
                    <h4>{movie.title}</h4>
                    <p>{movie.genre} | {movie.rating}</p>
                </div>
            ))
        )}
        <hr />
        <div>
          <h1>Movie App</h1>

          {movies.map(movie => (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.genre} - {movie.rating}</p>

              <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              </div>
            ))}
        </div>
        <div className='addMovie'>
             <input 
            type="text"
            placeholder="Enter movie title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />

            <button onClick={addMovie}>Add Movie</button>
        </div>
      </>
        
    );
}

export default App;
