import { useState, useEffect, Key } from "react";
import axios from "axios";

interface Movie {
  _id: Key | null | undefined; 
  id: number;
  title: string;
  genre: string;
  language: string;
  
}

interface UseFetchMoviesReturn {
  movies: Movie[] | null;
  loading: boolean;
  error: string | null;
}

const useFetchMovies = (): UseFetchMoviesReturn => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Fetching movies...");
        const response = await axios.post("https://hoblist.com/api/movieList", {
          category: "movies",
          language: "kannada",
          genre: "all",
          sort: "voting",
        });
        setMovies(response.data.result);
        setLoading(false);
      } catch (error: any) {
        setError("Error fetching movie list");
        setLoading(false);
        console.error("Error fetching movie list:", error);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useFetchMovies;
