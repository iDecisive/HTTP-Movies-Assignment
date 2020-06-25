import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {

  //State

  const [movie, setMovie] = useState(null);

  //Functions

  const params = useParams();

  let history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = () => {

    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(response => {
      
      console.log(response)
    
      getMovieList()

      history.push('/');

    })
    .catch(error => console.log(error))

  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <Link to={`/update-movie/${movie.id}`}>
        <div className='update-button'>
          Update
        </div>
      </Link>

      <div className='remove-button' onClick={deleteMovie}>
          Remove
        </div>

    </div>
  );
}

export default Movie;
