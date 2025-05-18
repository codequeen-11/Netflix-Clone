import React, { useEffect, useState } from 'react';
import axios from '../../Utils/axios';
import requests from '../../Utils/requests';
import '../Banner/banner.css'

function Banner() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        const results = response.data.results;
        const randomMovie = results[Math.floor(Math.random() * results.length)];
        setMovie(randomMovie);
      } catch (err) {
        console.error("Failed to fetch banner movie:", err);
        setError("Failed to load banner.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (loading) {
    return <div className="banner loading">Loading...</div>;
  }

  if (error) {
    return <div className="banner error">{error}</div>;
  }

  const backgroundImage = movie?.backdrop_path
    ? `url("${base_url}${movie.backdrop_path}")`
    : 'linear-gradient(90deg, #000000 0%, #434343 100%)'; // fallback background

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: backgroundImage,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name || "Untitled"}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <p className="banner_description">
          {truncate(movie?.overview, 150) || "No description available."}
        </p>
      </div>

      <div className="banner_fadeBottom" />
    </div>
  );
}

export default Banner;


 






 
